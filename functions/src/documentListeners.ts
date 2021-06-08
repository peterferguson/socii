const logger = require("firebase-functions").logger

import { firestore, serverTimestamp, increment, arrayUnion } from "./index.js"
import { singleLineTemplateString, iexClient, streamClient } from "./utils/helper.js"

// ! This is going to be an incrementing function factory where we can increase/decrease
// ! a count in firestore. Returns a funtion that can be used in conjunction with a
// ! document triggered cloud function.

// TODO: Update the function to gather the document ref of the document listener

/**
 * Increment the investorCount value on a group when a new investor is added to the investors collection
 * Usage as follows:
 *
 * functions.firestore.document('groups/{groupName}/investors/{investorUsername}')
 * .onWrite(incrementInvestors)
 *
 * @param change
 * @param context
 * @returns
 */
const incrementInvestors = async (change, context) => {
  const { groupName } = context.params

  if (!change.before.exists) {
    // New document Created : add one to count
    firestore.doc(`groups/${groupName}`).update({ investorCount: increment(1) })
  } else if (change.before.exists && change.after.exists) {
    // Updating existing document : Do nothing
  } else if (!change.after.exists) {
    // Deleting document : subtract one from count
    firestore.doc(`groups/${groupName}`).update({ investorCount: increment(-1) })
  }
  return
}

const tradeConfirmation = async (change, context) => {
  // - document at groups/{groupName}/trades/{messageId}
  const { groupName, messageId } = context.params
  const tradeData = change.after.data()

  if (tradeData.executed) return // - do nothing

  // - Data to update the state of the trade on completion of function
  // - Should also stop infinite loops
  const tradeUpdateData = { executed: true }

  const groupRef = await firestore.collection("groups").doc(groupName)
  let { cashBalance, investorCount } = (await groupRef.get()).data()

  // ! TESTING
  investorCount = investorCount || 1

  const ISIN = tradeData.assetRef.split("/").pop()
  tradeData.assetRef = firestore.doc(tradeData.assetRef)

  const { latestPrice } = await iexClient.quote(tradeData.tickerSymbol, {
    filter: "latestPrice",
  })

  // TODO: Fix price checking
  // ? The exchange rate will not be accounted for this way
  // 1 Could use the assetRef/data/alphaVantage to get the currency then call another fx api
  // 2 This would all need refactoring as there is some many apis called and in different places
  // 2 We could just put this all in the same firestore collection i.e. it is info we need so put it in the trade doc
  // 2 i.e. both execution and assetCurrency should be there so we can call the fx api simply.

  if (tradeData.shares * latestPrice > cashBalance) {
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

  if ((latestPrice - tradeData.price) / tradeData.price > 0.025) {
    logger.log(`The price has risen more than 2.5% since the price was agreed`)
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
  } else {
    tradeData.price = latestPrice
  }

  if (investorCount == 1 || tradeData.agreesToTrade.length === investorCount - 1) {
    // ! Execute Trade

    // 1. Batch update holdings
    const holdingDocRef = firestore.collection(`groups/${groupName}/holdings`).doc(ISIN)

    const { type, holdingData, pnlPercentage } = await upsertHolding({
      holdingDocRef,
      tradeData,
      messageId,
    })

    switch (type) {
      case "update":
        holdingDocRef.update(holdingData)
        if (pnlPercentage) tradeUpdateData["pnlPercentage"] = pnlPercentage
        break
      case "set":
        holdingDocRef.set(holdingData)
        break
      default:
        // - Secondary execution check (this time on the holding doc) ... do nothing
        return
    }

    // 2. send a message with the finalised price
    const channel = streamClient.channel("messaging", groupName)
    await channel.sendMessage(investmentReceiptMML(tradeData))
  }

  return change.after.ref.update(tradeUpdateData)
}

/*
 * Helper Functions
 */

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
    if (holding.trades.includes(messageId)) return outputData
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
      avgPrice: price / shares,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
    }
  }
  return outputData
}

const investmentReceiptMML = (tradeData) => {
  const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`
  const mmlmessage = {
    user_id: "socii",
    text: singleLineTemplateString`
    ${tradeData.shares} shares of $${tradeData.tickerSymbol} purchased for ${tradeData.price} per share.
    `,
    attachments: [
      {
        type: "receipt",
        mml: mmlstring,
        tickerSymbol: tradeData.tickerSymbol,
      },
    ],
  }
  return mmlmessage
}

module.exports = { incrementInvestors, tradeConfirmation }
