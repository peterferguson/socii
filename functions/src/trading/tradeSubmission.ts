import { logger } from "firebase-functions"
import { firestore, HttpsError, streamClient } from "../index.js"
import { serverTimestamp } from "../lib/firestore/index.js"
import { allKeysContainedIn } from "../utils/allKeysContainedIn"
import { verifyUser } from "../utils/verifyUser"
import { confirmInvestmentMML } from "./mml/confirmInvestmentMML"

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
    executionStatus: "pending",
  })

  if (investorCount > 1) {
    // * Send confirmation message into chat
    const message = confirmInvestmentMML({
      username: verifiedData.username,
      side: verifiedData.side,
      symbol: verifiedData.symbol,
      notional: verifiedData.notional,
      messageId,
    })
    logger.log(verifiedData)

    return await streamClient.updateMessage(message)
  }
}

const verifyContent = async (data, context) => {
  const requiredArgs = {
    username: "",
    groupName: "",
    assetRef: null,
    type: "",
    stockPrice: 0,
    //qty: 0,
    notional: 0,
    side: "",
    messageId: "",
    timeInForce: "",
    symbol: "",
    // - messageId will allow us to track whether the trade has already been submitted
    // - (until epheremal messages work). Also we can use a collectionGroup query
    // - to find the particular trade in question for each message.
  }

  const optionalArgs = {
    assetType: "",
    shortName: "",
    //tickerSymbol: "",
    executionCurrency: "GBP",
    assetCurrency: "USD",
    executorRef: `users/${context.auth.uid}`,
    limitPrice: "",
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
  requiredArgs.symbol = assetData.get("tickerSymbol")
  optionalArgs.assetType = assetData.get("assetType")
  optionalArgs.shortName = assetData.get("shortName")

  // * Inject data into requiredArgs
  Object.keys(requiredArgs).map((key) => (requiredArgs[key] = data[key]))

  return { ...requiredArgs, ...optionalArgs }
}
