import { logger } from "firebase-functions"
import { CreateOrder, OrderObject } from "../../shared/alpaca/index.js"
import { getRealtimeQuotes } from "../../shared/alpaca/utils/getRealtimeQuotes"
import { firestore, tradeClient } from "../index.js"
import { determineTradeStatus } from "../utils/determineTradeStatus"
import { isSell } from "../utils/isSell"
import { streamClient } from "../utils/streamClient"
import { warnPriceVariationOnMarketClose } from "../utils/warnPriceVariationOnMarketClose"
import { investmentPendingMML } from "./mml/investmentPendingMML"

/*
- tradeConfirmation
1. Add the uid/username/alpacaID of the agreesToTrade array
2. Once trade is agreed (agreesToTrade.len() === investors.len()) then we can update 
2. holdings and send confirmation message with the price at which the asset was purchased 
*/

// - Doc listener for documents:
// - groups/{groupName}/trades/{tradeId}
export const tradeConfirmation = async (change, context) => {
  const { groupName, tradeId } = context.params
  const tradeData = await change.after.data()
  const latestAgreesId = tradeData.agreesToTrade.slice(-1)[0].split("/")[1]

  const symbol = tradeData.symbol as string

  if (tradeData.executionStatus) return // - do nothing

  const groupRef = firestore.collection("groups").doc(groupName)
  let { cashBalance, investorCount } = (await groupRef.get()).data()

  // ! alpaca quote is failing in some instances, for now we will use iex as a fallback
  let alpacaQuote, iexPrice
  try {
    alpacaQuote = await getAlpacaPrice(symbol, tradeData.type)
  } catch (e) {
    console.log(e)
    console.log("Using iex as a fallback")
    iexPrice = await getIexPrice(symbol)
  }
  const { latestPrice, isUSMarketOpen, primaryExchange } = alpacaQuote
    ? alpacaQuote
    : iexPrice

  logger.log("IEX latestPrice", latestPrice, "& execution price:", tradeData.stockPrice)

  await warnPriceVariationOnMarketClose(
    isUSMarketOpen,
    primaryExchange,
    latestPrice,
    symbol,
    groupName,
    latestAgreesId
  )

  // - Adjust notional amount based on the latest price & account buying power
  // - Accept a smaller share amount if the cashBalance gets us close to the original share amount
  // TODO: Implement a client-side check on the cost vs cashBalance.
  // - A small variation should be somewhat enforced on the client-side.
  // - Assuming no massive jump in stock price.
  // TODO: Need to distinguish shares bought by cost & those by share amount
  // - drop share amount to within 2.5% of total cashBalance.
  // ! This is arbitrary & maybe be another threshold decided upon by the group.
  // TODO: Create a group settings page which lists the thresholds that can be tinkered

  if (tradeData.notional >= cashBalance && !isSell(tradeData.type))
    tradeData.notional = cashBalance * 0.95

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
  ) {
    logger.log(`The price has risen more than 2.5% since the price was agreed`)
    return
  } else tradeData.stockPrice = latestPrice

  if (tradeData.agreesToTrade.length === investorCount) {
    let postOrder: OrderObject
    logger.log(`Sending order: ${JSON.stringify(tradeData)}`)
    const investorRef = firestore.collection(`groups/${groupName}/investors`)
    const investors = (await investorRef.get()).docs

    try {
      for (const investor of investors) {
        const username = investor.id
        const { alpacaAccountId } = investor.data()
        logger.log(
          `Sending ${tradeData.side} order for $${
            tradeData.notional / investorCount
          } of ${symbol} for user ${username} with alpaca id ${alpacaAccountId}`
        )
        postOrder = await tradeClient.postOrders(
          alpacaAccountId,
          CreateOrder.from({
            symbol: symbol,
            side: tradeData.side,
            time_in_force: tradeData.timeInForce,
            type: tradeData.type,
            notional: String(tradeData.notional / investorCount),
            //qty: tradeData.qty, // remove and replace with notional
            //limitPrice: tradeData.limitPrice ? tradeData.limitPrice : null , // remove
            client_order_id: `${tradeData.groupName}|${tradeData.messageId}`,
          })
        )
        logger.log(`Order sent for user ${username} with status ${postOrder.status}`)
        logger.log("Order: ", postOrder)
      }
    } catch (err) {
      logger.error(err)
    }

    // - Complete ephemeral message
    const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"))
    await streamClient.partialUpdateMessage(
      tradeData.messageId,
      { set: { status: "complete" } },
      tradeData.username
    )

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
        await channel.sendMessage(
          investmentPendingMML({ ...tradeData, tradeId, alpacaOrderId: postOrder?.id })
        )
        return

      case "failed":
        logger.log("order failed. Id:", postOrder?.id)
        change.after.ref.update({ executionStatus: "failed" })
        return
    }
  }
}

const getIexPrice = async (symbol: string) => {
  const iexClient = require("../index.js").iexClient
  const { latestPrice, isUSMarketOpen, primaryExchange } = await iexClient.quote(
    symbol,
    { filter: "latestPrice,isUSMarketOpen,primaryExchange" }
  )
  return { latestPrice, isUSMarketOpen, primaryExchange }
}

const getAlpacaPrice = async (symbol: string, tradeType) => {
  const {
    meta,
    quotes: {
      [symbol]: { quote },
    },
  } = await getRealtimeQuotes([symbol])

  const latestPrice = isSell(tradeType) ? quote.bp : quote.ap
  const primaryExchange = isSell(tradeType) ? quote.bx : quote.ax

  const isUSMarketOpen = meta.is_open
  return { latestPrice, isUSMarketOpen, primaryExchange }
}
