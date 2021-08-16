import {
  firestore,
  streamClient
} from "../index.js"
import { updateHolding } from "./updateHolding.js"
import { journalShares } from "./journalShares.js"
import { investmentFailedMML } from "./mml/investmentFailedMML"
import { investmentReceiptMML } from "./mml/investmentReceiptMML"

export const checkTradeStatus = async (change , context) => {

  // get document info
  const eventDetails = await change.after.data()
  const event = eventDetails.event
  const qty = eventDetails.order.filled_qty

  // find trade corrosponding to message id
  const ClientOrderId = eventDetails.order.client_order_id
  const groupName = ClientOrderId.split("|")[0]
  const messageId = ClientOrderId.split("|")[1]
  const tradeRef = firestore.collection(`groups/${groupName}/trades`).doc(messageId)
  const tradeData = (await tradeRef.get()).data()

  const channel = streamClient.channel("messaging", groupName.split(" ").join("-"))

  if (event == "fill"){

    // update holding, send message to group and journal shares
    const updateInformation = await updateHolding({groupName, messageId , tradeData, executionStatus: "success", qty})
    await channel.sendMessage(investmentReceiptMML(tradeData))
    if (tradeData.side=="buy") { 
      journalShares({
      agreesToTrade: tradeData.agreesToTrade, 
      qty, 
      symbol: tradeData.symbol, 
      direction: "toAccounts"})
    }
  // TODO Create a journal for the cash from a sale. Currently it will be held in firm account
  tradeRef.update(updateInformation)
  }

  else if (["cancelled" , "expired" , "rejected" ,"suspended"].includes(event)){

    if (tradeData.side == "buy" ){ 
      // return money to group
      const groupRef = firestore.collection("groups").doc(groupName)
      let {cashBalance} = (await groupRef.get()).data()
      groupRef.update({ cashBalance: cashBalance + tradeData.notional})
    }
    tradeRef.update({executionStatus: "failed"})
    await channel.sendMessage(investmentFailedMML(tradeData))
  }
}
