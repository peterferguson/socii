import { logger } from "firebase-functions"
import { firestore, serverTimestamp, HttpsError } from "../index.js"
import { allKeysContainedIn } from "../utils/allKeysContainedIn"
import { streamClient } from "../utils/streamClient"
import { confirmInvestmentMML } from "./mml/confirmInvestmentMML"
import { verifyUser } from "../utils/verifyUser"

/*
- tradeSubmission
1. Verify that the data has been sent with all the correct keys
2. Add the trade to the trade collection in firestore properties include all of the above
2. and also a agreement list for each investor
*/

export const tradeSubmission = async (
  data: { groupName?: string; messageId?: string },
  context: any
) => {
  verifyUser(context)
  const verifiedData = await verifyContent(data, context)
  const { messageId } = data

  // * Create trade document
  const groupRef = firestore.collection("groups").doc(verifiedData.groupName)

  const { investorCount } = (await groupRef.get()).data()

  const tradeRef = firestore
    .collection(`groups/${verifiedData.groupName}/trades`)
    .doc(messageId)

  // * Store initial trade data
  tradeRef.set({
    ...verifiedData,
    agreesToTrade: [verifiedData.executorRef],
    timestamp: serverTimestamp(),

    // TODO //
    ////////// REMOVE - for testing until correct data is sent
    timeInForce: "gtc",
    type: "market",
    executionStatus: "pending",
    limitPrice: "",
    qty: verifiedData.shares,
    ////////// REMOVE - for testing until correct data is sent
  })

  if (investorCount > 1) {
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
    return await channel.sendMessage(message)
  }
}

const verifyContent = async (
  data: { [key: string]: any },
  context: { auth: { uid: string } }
) => {
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

  const assetRef = firestore.doc(data?.assetRef)
  const assetData = await assetRef.get()

  requiredArgs.assetRef = assetRef
  optionalArgs.assetType = assetData.get("assetType")
  optionalArgs.shortName = assetData.get("shortName")
  optionalArgs.tickerSymbol = assetData.get("tickerSymbol")

  // * Inject data into requiredArgs
  Object.keys(requiredArgs).map((key) => (requiredArgs[key] = data[key]))

  return { ...requiredArgs, ...optionalArgs }
}
