import { logger } from "firebase-functions"
import { CreateOrder, OrderObject } from "../alpaca/broker/client/ts/index"
import { firestore, iexClient, tradeClient, functionConfig } from "../index.js"
import { isSell } from "../utils/isSell"
import { investmentPendingMML } from "./mml/investmentPendingMML"
import { streamClient } from "../utils/streamClient"
import { determineTradeStatus } from "../utils/determineTradeStatus"
import { warnPriceVariationOnMarketClose } from "../utils/warnPriceVariationOnMarketClose"

/*
- tradeConfirmation
1. Add the uid/username/alpacaID of the agreesToTrade array
2. Once trade is agreed (agreesToTrade.len() === investors.len()) then we can update 
2. holdings and send confirmation message with the price at which the asset was purchased 
*/

export const tradeConfirmation = async (change, context) => {
  // - document at groups/{groupName}/trades/{tradeId}
  const { groupName, tradeId } = context.params
  const tradeData = await change.after.data()
  const latestAgreesId = tradeData.agreesToTrade.slice(-1)[0].split("/")[1]

  // can be: success, pending, failed

  if (tradeData.executionStatus) return // - do nothing

  const groupRef = firestore.collection("groups").doc(groupName)
  let { cashBalance, investorCount } = (await groupRef.get()).data()

  const { latestPrice, isUSMarketOpen, primaryExchange } = await iexClient.quote(
    tradeData.symbol,
    { filter: "latestPrice,isUSMarketOpen,primaryExchange" }
  )

  logger.log("IEX latestPrice", latestPrice, "& execution price:", tradeData.stockPrice)

  await warnPriceVariationOnMarketClose(
    isUSMarketOpen,
    primaryExchange,
    latestPrice,
    tradeData.symbol,
    groupName,
    latestAgreesId
  )

  if (tradeData.notional >= cashBalance && !isSell(tradeData.type)) {
    // - Accept a smaller share amount if the cashBalance gets us close to the original share amount
    // - A small variation should be somewhat enforced on the client-side.
    // - Assuming no massive jump in stock price.
    // TODO: Implement a client-side check on the cost vs cashBalance.
    // TODO: Need to distinguish shares bought by cost & those by share amount

    tradeData.notional = cashBalance * 0.95

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
    (latestPrice - tradeData.stockPrice) / tradeData.stockPrice > 0.025 &&
    !isSell(tradeData.type)
  )
    logger.log(`The price has risen more than 2.5% since the price was agreed`)
  else tradeData.stockPrice = latestPrice

  if (tradeData.agreesToTrade.length === investorCount) {
    // ! Execute Trade
    logger.log(`Sending order: ${JSON.stringify(tradeData)}`)
    let postOrder: OrderObject
    try {
      // - breakdown message into alpaca form and send to broker
      postOrder = await tradeClient.postOrders(
        functionConfig.alpaca.firm_account,
        CreateOrder.from({
          symbol: tradeData.symbol,
          side: tradeData.side,
          time_in_force: tradeData.timeInForce,
          type: tradeData.type,
          notional: String(tradeData.notional),
          //qty: tradeData.qty, // remove and replace with notional
          //limitPrice: tradeData.limitPrice ? tradeData.limitPrice : null , // remove
          client_order_id: `${tradeData.groupName}|${tradeData.messageId}`,
        })
      )
    } catch (err) {
      logger.error(err)
    }

    const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"))

    await streamClient.partialUpdateMessage(
      tradeData.messageId,
      { set: { status: "complete" } },
      tradeData.username
    )

    // TODO
    // - maybe the below is heavy on wirtes?
    // writing to the holding ref when pending then updating a field when executed
    // could be reduced by just writing when success, but may lose info

    switch (determineTradeStatus(postOrder.status) ?? "failed") {
      case "success":
        // 1. Deduct balance immediately
        if (tradeData.side == "buy")
          groupRef.update({ cashBalance: cashBalance - tradeData.notional })
        logger.log("order successful. Id:", postOrder?.id)
        return

      case "pending":
        // 1. Withold balance until pending order is resolved
        if (tradeData.side == "buy")
          groupRef.update({ cashBalance: cashBalance - tradeData.notional })
        // 3. send a message to inform about pending order
        await channel.sendMessage(investmentPendingMML(tradeData))
        return

      case "failed":
        logger.log("order failed. Id:", postOrder?.id)
        change.after.ref.update({ executionStatus: "failed" })
        return
    }
  }
}
