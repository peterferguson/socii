import { logger } from "firebase-functions"
import { serverTimestamp } from "../firestore/index.js"
import { firestore } from "../index.js"
import { getAlpacaBuyPower } from "../utils/getAlpacaBuyPower.js"
import { notEnoughBuyingPowerMessage } from "../utils/notEnoughBuyingPowerMessage.js"
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

  // - Create trade document
  const investorsRef = firestore.collection(
    `groups/${verifiedData.groupName}/investors`
  )
  const investors = (await investorsRef.get()).docs
  const investorCount = investors.length

  // - Ensure each investor has enough cash to make the trade
  const canAffordTrade = await Promise.all(
    investors.map(async (investor) => {
      const data = investor.data()
      logger.log(`Getting buying power for ${data.username}`)
      const { cash } = await getAlpacaBuyPower(data.alpacaAccountId)
      return {
        id: data.alpacaAccountId,
        cash,
        isAffordable: cash >= (verifiedData.notional / investorCount) * 1.05,
        // - Add 5% buffer
      }
    })
  )

  logger.log(`investors: ${investors.map((investor) => investor.data().uid)}`)
  logger.log(`canAffordTrade: ${JSON.stringify(canAffordTrade)}`)

  if (!canAffordTrade.every(({ isAffordable }) => isAffordable))
    return submittedFromCallable
      ? { error: "Some group members don't have enough cash" }
      : await streamClient
          .channel("group", verifiedData.groupName)
          .sendMessage(notEnoughBuyingPowerMessage(verifiedData.username))

  // - Create trade document
  const tradeRef = firestore
    .collection(`groups/${verifiedData.groupName}/trades`)
    .doc(messageId)

  // - Store initial trade data
  tradeRef.set({
    ...verifiedData,
    agreesToTrade: [verifiedData.executorRef],
    timestamp: serverTimestamp(),
  })

  logger.log(verifiedData)

  if (investorCount > 1) {
    // - Send confirmation message into chat
    const message = confirmInvestmentMML({
      username: verifiedData.username,
      side: verifiedData.side,
      symbol: verifiedData.symbol,
      notional: verifiedData.notional,
      messageId,
    })

    // ! Reverting back to sending new messages each time since message completion is happening on the client-side
    // return submittedFromCallable
    return await streamClient
      .channel("group", verifiedData.groupName)
      .sendMessage(message)
    // : await streamClient.updateMessage(message)
  }
}
