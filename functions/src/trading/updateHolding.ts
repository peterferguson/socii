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
import { firestore } from "../index.js"
import { serverTimestamp, increment, arrayUnion } from "../lib/firestore/index.js"

export const updateHolding = async (
  data: {
    groupName?: string
    messageId?: string
    tradeData?: any
    executionStatus?: string
    qty?: string
  },
  context?: any
) => {
  const { groupName, tradeData, messageId, executionStatus } = data

  // - Data to update the state of the trade on completion of function
  // - Should also stop infinite loops
  // - can be set to success, pending, failed
  let tradeUpdateData = { executionStatus: executionStatus, pnlPercentage: {} }

  const balanceChange = tradeData.side=="sell"? 1: -1
  const qty = parseFloat(data.qty)
  const latestPrice = tradeData.stockPrice
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
    qty
  })
  logger.log("type of change: ", type)
  logger.log("holding data: ", holdingData)
  // TODO - potentially await and check response here?
  switch (type) {
    case "update":
      holdingDocRef.update(holdingData)
      if (tradeData.side=="sell") groupRef.update({ cashBalance: cashBalance + balanceChange * qty * latestPrice })
      if (pnlPercentage) tradeUpdateData.pnlPercentage = pnlPercentage
      return tradeUpdateData
      break
    case "set":
      holdingDocRef.set(holdingData)
      groupRef.update({ cashBalance: cashBalance + balanceChange * qty * latestPrice })
      return tradeUpdateData
      break
    default:
      // - Secondary execution check (this time on the holding doc) ... do nothing
      return
  }
}

const upsertHolding = async ({ holdingDocRef, tradeData, messageId, qty }) => {
  const { side, notional, assetRef, symbol, shortName, stockPrice } = tradeData
  const negativeEquityMultiplier = side.toLowerCase().includes("buy") ? 1 : -1

  // - Assumptions:
  // 1. We keep zero share holdings to easily identify all previous holdings.
  // ? Could this be imposed in the firestore rules.
  // 2: On selling shares the cost basis is not affected & so only the shares is changed

  const sharesIncrement = negativeEquityMultiplier * qty

  // * Check if the holding already exists
  const holding = await holdingDocRef.get()
  const outputData = { type: "", holdingData: {}, pnlPercentage: {} }

  if (holding.exists) {
    // - Trade already exists in holding ... do nothing
    if (holding.trades?.includes(messageId)) return outputData

    const currentShares = holding.get("shares")
    const currentAvgPrice = holding.get("avgPrice")
    var newAvgPrice =
      negativeEquityMultiplier + 1
        ? (currentAvgPrice * currentShares + stockPrice * qty) / (currentShares + qty)
        : currentAvgPrice

    // * Add profit to a sell trade on a current holding
    if (!(negativeEquityMultiplier + 1)) {
      outputData.pnlPercentage = (100 * (stockPrice - currentAvgPrice)) / currentAvgPrice
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
      symbol,
      shortName,
      trades: [messageId],
      avgPrice: newAvgPrice,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
    }
  }
  return outputData
}
