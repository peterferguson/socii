import { logger } from "firebase-functions"
import {
  firestore,
  serverTimestamp,
  increment,
  arrayUnion,
  HttpsError,
} from "./index.js"
import {
  singleLineTemplateString,
  iexClient,
  streamClient,
  currencySymbols,
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
export const tradeSubmission = async (
  data: { groupName?: string; messageId?: string },
  context: any
) => {
  console.log(data)
  console.log(context)

  verifyUser(context)
  const verifiedData = await verifyContent(data, context)
  const { messageId } = data
  console.log(verifiedData)

  // * Create trade document
  const groupRef = await firestore.collection("groups").doc(verifiedData.groupName)
  console.log("groupRef")

  const { investorCount } = (await groupRef.get()).data()
  console.log("count")

  const tradeRef = await firestore
    .collection(`groups/${verifiedData.groupName}/trades`)
    .doc(messageId)
  console.log("tradeRef")

  // * Store initial trade data
  tradeRef.set({
    ...verifiedData,
    agreesToTrade: [verifiedData.executorRef],
    timestamp: serverTimestamp(),
  })
  console.log("update Trade")

  if (investorCount > 1) {
    console.log("sending msg")
    // * Send confirmation message into chat
    const message = confirmInvestmentMML({
      ...verifiedData,
      cost: verifiedData.price, //TODO: Review the usage of cost and price here
      parent_id: messageId,
      show_in_channel: false,
    })
    const channel = streamClient.channel(
      "messaging",
      data.groupName.split(" ").join("-")
    )
    console.log("sent msg")
    return await channel.sendMessage(message)
  }
}

export const tradeConfirmation = async (change, context) => {
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
  // ! TESTING

  const ISIN = tradeData.assetRef.split("/").pop()
  tradeData.assetRef = firestore.doc(tradeData.assetRef)

  const { latestPrice, isUSMarketOpen } = await iexClient.quote(
    tradeData.tickerSymbol,
    {
      filter: "latestPrice,isUSMarketOpen",
    }
  )

  // - do nothing if market is closed
  if (!isUSMarketOpen) {
    // 2. send a message with the finalised price
    const channel = streamClient.channel("messaging", groupName)
    await channel.sendMessage(await marketClosedMessage(tradeData.assetRef))
    return
  }

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

  if (
    (latestPrice - tradeData.price) / tradeData.price > 0.025 &&
    !isSell(tradeData.orderType)
  ) {
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
        groupRef.update({ cashBalance: cashBalance - tradeData.shares * latestPrice })
        if (pnlPercentage) tradeUpdateData["pnlPercentage"] = pnlPercentage
        break
      case "set":
        holdingDocRef.set(holdingData)
        groupRef.update({ cashBalance: cashBalance - tradeData.shares * latestPrice })
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

const investmentReceiptMML = (tradeData) => {
  const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`
  const mmlmessage = {
    user_id: "socii",
    text: singleLineTemplateString`
    ${tradeData.shares} shares of $${tradeData.tickerSymbol} ${
      isSell(tradeData.orderType) ? "sold" : "purchased"
    } for ${currencySymbols[tradeData.assetCurrency]}${tradeData.price} per share.
    For a cost of ${currencySymbols[tradeData.executionCurrency]}${tradeData.cost}
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

const marketClosedMessage = async (assetRef) => {
  const assetData = await (await assetRef.get()).data()
  return {
    user_id: "socii",
    text: singleLineTemplateString`
    Sorry the ${assetData.exchange} is not currently open!
    `,
  }
}

const isSell = (orderType) => !orderType.toLowerCase().includes("sell")

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
    username: "",
    groupName: "",
    assetRef: null,
    orderType: "",
    cost: 0,
    price: 0,
    shares: 0,
    action: "",
    messageId: "",
    // - messageId will allow us to track whether the trade has already been submitted
    // - (until epheremal messages work). Also we can use a collectionGroup query
    // - to find the particular trade in question for each message.
  }

  const optionalArgs = {
    assetType: "",
    shortName: "",
    tickerSymbol: "",
    executionCurrency: "GBP",
    assetCurrency: "USD",
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

const confirmInvestmentMML = ({
  username,
  action,
  tickerSymbol,
  cost,
  shares,
  parent_id,
  show_in_channel,
}) => {
  const mmlstring = `<mml><investmentConfirmation></investmentConfirmation></mml>`
  const mmlmessage = {
    user_id: username,
    text: singleLineTemplateString`
    Hey ${username} wants the group to ${action} ${shares} shares of ${tickerSymbol} 
    for ${cost}. Do you agree that the group should execute this trade?
    `,
    command: action,
    parent_id: parent_id || null,
    show_in_channel: show_in_channel || null,
    attachments: [
      {
        tickerSymbol: tickerSymbol,
        type: "investmentConfirmation",
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
