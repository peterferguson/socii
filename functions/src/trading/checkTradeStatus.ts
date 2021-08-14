import { firestore } from "../index.js"
import { journalShares } from "./journalShares.js"
import { updateHolding } from "./updateHolding.js"

export const checkTradeStatus = async (change, context) => {
  // get document info
  const eventDetails = await change.after.data()
  const event = eventDetails.event
  // find trade corrosponding to message id
  const ClientOrderId = eventDetails.order.client_order_id
  const groupName = ClientOrderId.split("|")[0]
  const messageId = ClientOrderId.split("|")[1]
  const qty = eventDetails.order.filled_qty

  const tradeRef = firestore.collection(`groups/${groupName}/trades`).doc(messageId)
  const tradeData = (await tradeRef.get()).data()
  // TODO add sell functi
  if (event == "fill") {
    // update holding
    const updateInformation = await updateHolding({
      groupName,
      messageId,
      tradeData,
      executionStatus: "success",
      qty,
    })
    const tradeUpdateInfo = updateInformation.pnlPercentage
      ? updateInformation
      : { executionStatus: "failed" }
    //TODO Push notification to user
    //

    // journal shares and update trade doc
    journalShares(tradeData.agreesToTrade, qty)
    tradeRef.update({ executionStatus: "success" })
  } else if (["cancelled", "expired", "rejected", "suspended"].includes(event)) {
    // return money to group
    const groupRef = firestore.collection("groups").doc(groupName)
    let cashBalance = (await groupRef.get()).data()
    groupRef.update({ cashBalance: cashBalance + tradeData.notional })
    tradeRef.update({ executionStatus: "failed" })
    // TODO Push notification to group
  }
}
