const logger = require("firebase-functions").logger

import {
  firestore,
  serverTimestamp,
  increment,
  HttpsError,
  arrayUnion,
} from "./index.js"
import {
  singleLineTemplateString,
  iexStockPrice,
  StreamChatClient,
} from "./utils/helper.js"

/*
- tradeSubmission
1. Verify that the data has been sent with all the correct keys
2. Add the trade to the trade collection in firestore properties include all of the above
2. and also a agreement list for each investor

- tradeConfirmation
1. Add the uid/username of the agreesToTrade array
2. Once trade is agreed (agreesToTrade.len() === investors.len()) then we can update 
2. holdings and send confirmation message with the price at which the asset was purchased
*/
const tradeSubmission = async (data, context) => {
  verifyUser(context)
  const args = await verifyContent(data, context)
  const { messageId } = data

  // * Create trade document
  const tradeRef = await firestore
    .collection(`groups/${args.groupName}/trades`)
    .doc(messageId)

  // * Store initial trade data
  tradeRef.set({
    ...args,
    agreesToTrade: [args.executorRef],
    timestamp: serverTimestamp(),
  })

  // * Send confirmation message into chat
  const message = confirmInvestmentMML({
    ...data,
    parent_id: messageId,
    show_in_channel: false,
  })
}

// TODO: Convert to doc listener
const tradeConfirmation = async (data, context) => {
  verifyUser(context)

  const { groupName, messageId } = data

  const groupRef = await firestore.collection(`groups/${groupName}`)
  const tradesRef = await firestore.collection(`groups/${groupName}/trades`).doc(messageId)

  const { cashBalance, investorCount } = await groupRef.get()
  const tradeData = await tradesRef.get()

  const ISIN = tradeData.assetRef.split("/")[-1]

  const latestPrice = await iexStockPrice(tradeData.tickerSymbol)

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

  if (tradeData.agreesToTrade.length === investorCount - 1) {
    // ! Execute Trade

    // 1. Batch update holdings
    const holdingDocRef = firestore.collection(`${groupRef}/holdings`).doc(ISIN)
    const batch = firestore.batch()
    const { type, holdingData, updateTradeData } = await upsertHolding({
      holdingDocRef,
      tradeData,
    })

    switch (type) {
      case "update": {
        batch.update(holdingDocRef, holdingData)
      }
      case "set": {
        batch.set(holdingDocRef, holdingData)
      }
    }

    batch.update(tradesRef, {
      agreesToTrade: arrayUnion(context.auth.uid),
      ...updateTradeData,
    })

    await batch.commit()

    // 2. send a message with the finalised price
    const streamClient = StreamChatClient()
    const channel = streamClient.channel("messaging", groupName)
    await channel.sendMessage(investmentReceiptMML(tradeData))
  } else {
    tradesRef.update({ agreesToTrade: arrayUnion(context.auth.uid) })
  }
}

/*
 * Helper Functions
 */

const upsertHolding = async ({ holdingDocRef, tradeData }) => {
  const { orderType, shares, price, assetRef, tickerSymbol, shortName } = tradeData
  const negativeEquityMultiplier = orderType.toLowerCase().includes("buy") ? 1 : -1

  // - Assumptions:
  // 1. We keep zero share holdings to easily identify all previous holdings.
  // ? Could this be imposed in the firestore rules.
  // 2: On selling shares the cost basis is not affected & so only the shares is changed

  const sharesIncrement = negativeEquityMultiplier * shares

  // * Check if the holding already exists
  const holding = await holdingDocRef.get()
  const outputData = { type: "", holdingData: {}, updateTradeData: {} }

  if (holding.exists) {
    const currentShares = holding.get("shares")
    const currentAvgPrice = holding.get("avgPrice")
    const newAvgPrice =
      negativeEquityMultiplier + 1
        ? (currentAvgPrice * currentShares + price * shares) / (currentShares + shares)
        : currentAvgPrice

    // * Add profit to a sell trade on a current holding
    if (!(negativeEquityMultiplier + 1)) {
      outputData.updateTradeData = {
        pnlPercentage: (100 * (price - currentAvgPrice)) / currentAvgPrice,
      }
    }

    outputData.type = "update"
    outputData.holdingData = {
      avgPrice: newAvgPrice,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
    }
  } else {
    outputData.type = "set"

    outputData.holdingData = {
      assetRef,
      tickerSymbol,
      shortName,
      avgPrice: price / shares,
      shares: increment(sharesIncrement),
      lastUpdated: serverTimestamp(),
    }
  }
  return outputData
}

const verifyUser = (context) => {
  // * Checking that the user is authenticated.
  if (!context.auth) {
    throw new HttpsError(
      "failed-precondition",
      "This function must be called while authenticated."
    )
  }
}

const verifyContent = async (data, context) => {
  const requiredArgs = {
    groupName: "",
    assetRef: "",
    orderType: "",
    price: 0,
    shares: 0,
    // This will allow us to track whether the trade has already been submitted
    // (until epheremal messages work). Also we can use a collectionGroup query
    // to find the particular trade in question for each message.
    messageId: "",
  }

  const optionalArgs = {
    assetType: "",
    shortName: "",
    tickerSymbol: "",
    executionCurrency: "GBP",
    executorRef: `users/${context.auth.uid}`,
  }

  // * Check for default args and assign them if they exist
  if (!allKeysContainedIn(requiredArgs, data)) {
    throw new HttpsError(
      "invalid-argument",
      `Please ensure request has all of the following keys: ${JSON.stringify(
        Object.keys(requiredArgs)
      )}`
    )
  }

  const assetRef = firestore.doc(data.assetRef)
  const assetData = await assetRef.get()

  requiredArgs.assetRef = assetRef
  optionalArgs.assetType = assetData.get("assetType")
  optionalArgs.shortName = assetData.get("shortName")
  optionalArgs.tickerSymbol = assetData.get("tickerSymbol")

  // * Inject data into requiredArgs
  Object.keys(requiredArgs).map((key) => (requiredArgs[key] = data[key]))

  return { ...requiredArgs, ...optionalArgs }
}

const allKeysContainedIn = (object, other) => {
  let keys = null

  switch (typeof object) {
    case "object":
      if (Array.isArray(object)) {
        keys = object
      } else {
        keys = Object.keys(object)
      }
      break
  }

  // Ensure that the object has all of the keys in `other`
  return keys.every((key) => key in other)
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

export const confirmInvestmentMML = ({
  username,
  action,
  tickerSymbol,
  cost,
  shares,
  parent_id,
  show_in_channel,
}) => {
  const mmlstring = `<mml><tradeConfirmation></tradeConfirmation></mml>`
  const mmlmessage = {
    user_id: username,
    text: singleLineTemplateString`
    Hey ${username} wants the group to ${action} ${shares} shares of ${tickerSymbol} 
    for ${cost}. Do you agree that the group should execute this trade?
    `,
    command: "buy",
    parent_id: parent_id || null,
    show_in_channel: show_in_channel || null,
    attachments: [
      {
        tickerSymbol,
        type: "buy",
        mml: mmlstring,
        actions: [
          {
            name: "action",
            text: "Yes",
            type: "button",
            value: "yes",
          },
          {
            name: "action",
            text: "No",
            type: "button",
            value: "no",
          },
        ],
      },
    ],
  }
  return mmlmessage
}

module.exports = {
  tradeToFirestore,
  tradeSubmission,
  tradeConfirmation,
}
