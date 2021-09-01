import { logger } from "firebase-functions"
import { firestore, functionConfig } from "../index.js"
import { serverTimestamp } from "../lib/firestore/index.js"
import { streamClient } from "../utils/streamClient.js"
import { verifyTradeSubmissionContent } from "../utils/verifyTradeSubmissionContent"
import { verifyUser } from "../utils/verifyUser"
import { confirmInvestmentMML } from "./mml/confirmInvestmentMML"

/*
- tradeSubmission
1. Verify that the data has been sent with all the correct keys
2. Add the trade to the trade collection in firestore properties include all of the above
2. and also a agreement list for each investor
*/

export const tradeSubmission = async (
  data: { groupName?: string; messageId?: string; submittedFromCallable?: boolean },
  context: any
) => {
  verifyUser(context)
  const verifiedData = await verifyTradeSubmissionContent(data, context)
  const { messageId, submittedFromCallable } = data

  const groupRef = firestore.collection("groups").doc(verifiedData.groupName)

  const { investorCount } = (await groupRef.get()).data()
  
  // * Create trade document
  const tradeRef = firestore
    .collection(`groups/${verifiedData.groupName}/trades`)
    .doc(messageId)

  // * Store initial trade data
  tradeRef.set({
    ...verifiedData,
    agreesToTrade: [verifiedData.executorRef],
    timestamp: serverTimestamp(),
  })

  logger.log(verifiedData)

  if (investorCount > 1) {
    // * Send confirmation message into chat
    const message = confirmInvestmentMML({
      username: verifiedData.username,
      side: verifiedData.side,
      symbol: verifiedData.symbol,
      notional: verifiedData.notional,
      messageId,
    })

    return submittedFromCallable
      ? await streamClient.channel("group", verifiedData.groupName).sendMessage(message)
      : await streamClient.updateMessage(message)
  }
}
