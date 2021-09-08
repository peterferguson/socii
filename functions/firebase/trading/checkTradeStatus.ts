import { firestore, functionConfig } from "../index.js"
import { updateHolding } from "./updateHolding.js"
import { journalShares } from "./journalShares.js"
import { investmentFailedMML } from "./mml/investmentFailedMML"
import { investmentReceiptMML } from "./mml/investmentReceiptMML"
import { logger } from "firebase-functions"
import { StreamChat } from "stream-chat"
import { failedStatuses } from "../utils/determineTradeStatus.js"

export const checkTradeStatus = async (change, context) => {
  // - get document info
  const eventDetails = await change.data()
  logger.log("Event Details: ", eventDetails)

  const {
    stream: { api_key, secret },
  } = functionConfig

  const {
    event,
    order: { filled_qty: qty, client_order_id: clientOrderId },
  } = eventDetails

  const [groupName, messageId] = clientOrderId.split("|")

  const tradeRef = firestore.collection(`groups/${groupName}/trades`).doc(messageId)
  const tradeData = (await tradeRef.get()).data()

  logger.log("trade data", tradeData)

  const streamClient = new StreamChat(api_key, secret)
  const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"))

  if (event == "fill") {
    logger.log("fill")
    // update holding, send message to group and journal shares
    const updateInformation = await updateHolding({
      groupName,
      messageId,
      tradeData,
      executionStatus: "success",
      qty,
    })
    await channel.sendMessage(investmentReceiptMML(tradeData))
    if (tradeData.side == "buy") {
      journalShares({
        agreesToTrade: tradeData.agreesToTrade,
        qty,
        symbol: tradeData.symbol,
        direction: "toAccounts",
      })
    }
    // TODO Create a journal for the cash from a sale. Currently it will be held in firm account
    tradeRef.update(updateInformation)
  } else if (failedStatuses.includes(event)) {

    logger.log("not filled")
    
    if (tradeData.side == "buy") {
      // - return money to group
      const groupRef = firestore.collection("groups").doc(groupName)
      let { cashBalance } = (await groupRef.get()).data()
      logger.log("cash balance: ", cashBalance)
      groupRef.update({ cashBalance: cashBalance + tradeData.notional })
    }
    tradeRef.update({ executionStatus: "failed" })
    await channel.sendMessage(investmentFailedMML(tradeData))
  }
}
