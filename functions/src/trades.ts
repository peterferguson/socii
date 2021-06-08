const logger = require("firebase-functions").logger

import { firestore, serverTimestamp, HttpsError } from "./index.js"
import { singleLineTemplateString, StreamChatClient } from "./utils/helper.js"

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
  const { cost, ...verifiedData } = await verifyContent(data, context)
  const price = cost
  const { messageId } = data

  // * Create trade document
  const tradeRef = await firestore
    .collection(`groups/${verifiedData.groupName}/trades`)
    .doc(messageId)

  // * Store initial trade data
  tradeRef.set({
    ...verifiedData,
    price,
    agreesToTrade: [verifiedData.executorRef],
    timestamp: serverTimestamp(),
  })

  // * Send confirmation message into chat
  const message = confirmInvestmentMML({
    ...verifiedData,
    cost,
    parent_id: messageId,
    show_in_channel: false,
  })

  const streamClient = StreamChatClient()
  const channel = streamClient.channel("messaging", data.groupName.split(" ").join("-"))
  return await channel.sendMessage(message)
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
    username: "",
    groupName: "",
    assetRef: "",
    orderType: "",
    cost: 0,
    shares: 0,
    action: "",
    // - This will allow us to track whether the trade has already been submitted
    // - (until epheremal messages work). Also we can use a collectionGroup query
    // - to find the particular trade in question for each message.
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
    command: "buy",
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

module.exports = { tradeSubmission }
