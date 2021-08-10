import { logger } from "firebase-functions"
import { error } from "firebase-functions/lib/logger"
import { config, CreateOrder, TradingApi } from "../alpaca/broker/client/ts/index"
import { firestore, iexClient } from "../index.js"
import { determineAlpacaStatus } from "../utils/determineAlpacaStatus"
import { isSell } from "../utils/isSell"
import { streamClient } from "../utils/streamClient"
import { journalShares } from "./journalShares.js"
import { investmentFailedMML } from "./mml/investmentFailedMML"
import { investmentPendingMML } from "./mml/investmentPendingMML"
import { investmentReceiptMML } from "./mml/investmentReceiptMML"
import { updateHolding } from "./updateHolding.js"

/*
- tradeConfirmation
1. Add the uid/username of the agreesToTrade array
2. Once trade is agreed (agreesToTrade.len() === investors.len()) then we can update 
2. holdings and send confirmation message with the price at which the asset was purchased 
*/

export const tradeConfirmation = async (change, context) => {
  // - document at groups/{groupName}/trades/{messageId}
  const { groupName, messageId } = context.params
  const tradeData = await change.after.data()

  // TODO add executed = pending to all orders as they are sent..
  // can be: success, pending, failed
  if (tradeData.executionStatus !== "pending") return // - do nothing

  const tradeClient = new TradingApi(config)
  const ALPACA_FIRM_ACCOUNT = "83af97bb-aa1b-37cd-9807-f76eec49fd1c"

  const groupRef = await firestore.collection("groups").doc(groupName)
  let { cashBalance, investorCount } = (await groupRef.get()).data()

  logger.log("cash bal______", cashBalance, "investors______", investorCount)

  const ISIN = tradeData.assetRef.split("/").pop()
  tradeData.assetRef = firestore.doc(tradeData.assetRef)

  const { latestPrice, isUSMarketOpen } = await iexClient.quote(
    tradeData.tickerSymbol,
    {
      filter: "latestPrice,isUSMarketOpen",
    }
  )
  //   // // // - do nothing if market is closed
  //   // if (!isUSMarketOpen) {
  //   //   // 2. send a message with the finalised price
  //   //   const channel = streamClient.channel("messaging", groupName)
  //   //   await channel.sendMessage(await marketClosedMessage(tradeData.assetRef))
  //   //   return
  //   // }

  // TODO: Fix price checking
  // ! Now asset price & currency is available along with cost & execution currency this should be simple
  // ! As stated below I think this should be a client-side check though

  if (tradeData.shares * latestPrice > cashBalance && !isSell(tradeData.orderType)) {
    // - Accept a smaller share amount if the cashBalance gets us close to the original share amount
    // - A small variation should be somewhat enforced on the client-side.
    // - Assuming no massive jump in stock price.
    // TODO: Implement a client-side check on the cost vs cashBalance.
    // TODO: Need to distinguish shares bought by cost & those by share amount

    tradeData.shares = (cashBalance / latestPrice) * 0.975

    // - drop share amount to within 2.5% of total cashBalance.
    // ! This is arbitrary & maybe be another threshold decided upon by the group.
    // TODO: Create a group settings page which lists the thresholds that can be tinkered
  }

  /* 
  ! Add user setting to allow for an acceptable price variation between latestPrice and 
  ! agreed price (tradeData.price).
  *
  *
  * Possible failure mechanisms/things to think aboout if this fails
  1. If this fails we may need to send a new message warning the group of the new price.
  ?. This may be too slow for a highly beta stock. Imagine GME or any squeeze
  2. Allowing a user an option to set a new threshold on each purchase if it is high beta
  */
  if (
    (latestPrice - tradeData.price) / tradeData.price > 0.025 &&
    !isSell(tradeData.orderType)
  ) {
    logger.log(`The price has risen more than 2.5% since the price was agreed`)
  } else {
    tradeData.price = latestPrice
  }

  if (investorCount == 1 || tradeData.agreesToTrade.length === investorCount - 1) {
    // ! Execute Trade

    logger.log(
      ALPACA_FIRM_ACCOUNT,
      tradeData.tickerSymbol,
      tradeData.action,
      tradeData.timeInForce,
      tradeData.shares,
      tradeData.type,
      tradeData.price,
      tradeData.executionStatus
    )

    let postOrder
    let executionStatus

    try {
      //breakdown message into alpaca form and send to broker
      postOrder = await tradeClient.postOrders(
        ALPACA_FIRM_ACCOUNT,
        CreateOrder.from({
          symbol: tradeData.tickerSymbol,
          side: tradeData.action,
          timeInForce: tradeData.timeInForce,
          qty: tradeData.shares,
          type: tradeData.type,
          limitPrice: tradeData.limitPrice,
        })
      )
      executionStatus = determineAlpacaStatus(postOrder.status)
    } catch (err) {
      logger.log(error(err))
      executionStatus = "failed"
    }

    const channel = streamClient.channel("messaging", groupName)

    // TODO
    // - maybe the below is heavy on wirtes?
    // writing to the holding ref when pending then updating a field when executed
    // could be reduced by just writing when success, but may lose info

    switch (executionStatus) {
      case "success":
        // 1. Batch update holdings.
        // if profit was set for a sell, update the document with the returned value
        const updateInformation = await updateHolding({
          groupName,
          messageId,
          tradeData,
          executionStatus,
        })
        const tradeUpdateInfo = updateInformation.pnlPercentage
          ? updateInformation
          : { executionStatus: "failed" }

        // 2. Send a message with the finalised price
        await channel.sendMessage(investmentReceiptMML(tradeData))

        // 3. Journal funds to individual alpaca accounts for holding
        journalShares(tradeData.agreesToTrade, tradeData.qty)

        return change.after.ref.update(tradeUpdateInfo)
      case "pending":
        // 1. Reduce the group balance to avoid missunderstandings of available balance
        // TODO - handle the return of this balance if order fails
        groupRef.update({ cashBalance: cashBalance - tradeData.shares * latestPrice })
        // 2. TODO create function to listen to events monitoring status

        // 3. send a message to inform about pending order
        // TODO display more useful message
        await channel.sendMessage(investmentPendingMML(tradeData))
        break

      case "failed":
        await channel.sendMessage(investmentFailedMML(tradeData))
        return change.after.ref.update({ executionStatus: "failed" })
      // - Catch all commands sent by user not by action
      default:
      // - Error on missing command args
    }
  }
}
