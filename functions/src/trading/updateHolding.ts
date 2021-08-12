/*
 * Called when an Alpaca order has been confirmed. That can occur:
 *
 *
 * - Immediately in tradeConfirmation
 * - After the TBC[checkOrderStatus] funciton indicates the trade is complete
 *
 *
 * @param data
 * @param context
 * @returns tradeUpdateData if needed
 */
import { logger } from "firebase-functions"
import { firestore, serverTimestamp, increment, arrayUnion } from "../index.js"

export const updateHolding = async (
  data: {
    groupName?: string
    messageId?: string
    tradeData?: any
    executionStatus?: string
  },
  context?: any
) => {
  const { groupName, tradeData, messageId, executionStatus } = data

  // - Data to update the state of the trade on completion of function
  // - Should also stop infinite loops
  // - can be set to success, pending, failed
  let tradeUpdateData = { executionStatus: executionStatus, pnlPercentage: {} }

  const latestPrice = tradeData.latestPrice
  const ISIN = tradeData.assetRef.split("/").pop()
  tradeData.assetRef = firestore.doc(tradeData.assetRef)

  const groupRef = await firestore.collection("groups").doc(groupName)
  let { cashBalance, investorCount } = (await groupRef.get()).data()

  // 1. Batch update holdings
  const holdingDocRef = firestore.collection(`groups/${groupName}/holdings`).doc(ISIN)
  const { type, holdingData, pnlPercentage } = await upsertHolding({
    holdingDocRef,
    tradeData,
    messageId,
  })
  logger.log("type of change: ", type)
  logger.log("holding data: ", holdingData)
  // TODO - potentially await and check response here?
  switch (type) {
    case "update":
      holdingDocRef.update(holdingData)
      groupRef.update({ cashBalance: cashBalance - tradeData.shares * latestPrice })
      if (pnlPercentage) tradeUpdateData.pnlPercentage = pnlPercentage
      return tradeUpdateData
      break
    case "set":
      holdingDocRef.set(holdingData)
      groupRef.update({ cashBalance: cashBalance - tradeData.shares * latestPrice })
      break
    default:
      // - Secondary execution check (this time on the holding doc) ... do nothing
      return
  }
}

const upsertHolding = async ({ holdingDocRef, tradeData, messageId }) => {
  const { orderType, shares, price, assetRef, tickerSymbol, shortName } = tradeData
  const negativeEquityMultiplier = orderType.toLowerCase().includes("buy") ? 1 : -1

  // - Assumptions:
  // 1. We keep zero share holdings to easily identify all previous holdings.
  // ? Could this be imposed in the firestore rules.
  // 2: On selling shares the cost basis is not affected & so only the shares is changed

  const sharesIncrement = negativeEquityMultiplier * shares

  // * Check if the holding already exists
  const holding = await holdingDocRef.get()
  const outputData = { type: "", holdingData: {}, pnlPercentage: {} }

  if (holding.exists) {
    // - Trade already exists in holding ... do nothing
    if (holding.trades?.includes(messageId)) return outputData

    const currentShares = holding.get("shares")
    const currentAvgPrice = holding.get("avgPrice")
    const newAvgPrice =
      negativeEquityMultiplier + 1
        ? (currentAvgPrice * currentShares + price * shares) / (currentShares + shares)
        : currentAvgPrice

    // * Add profit to a sell trade on a current holding
    if (!(negativeEquityMultiplier + 1)) {
      outputData.pnlPercentage = (100 * (price - currentAvgPrice)) / currentAvgPrice
    }

    outputData.type = "update"
    outputData.holdingData = {
      avgPrice: newAvgPrice,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
      trades: arrayUnion(messageId),
    }
  } else {
    outputData.type = "set"

    outputData.holdingData = {
      assetRef,
      tickerSymbol,
      shortName,
      trades: [messageId],
      avgPrice: price,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
    }
  }
  return outputData
}
