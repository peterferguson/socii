import { logger } from "firebase-functions"
import { firestore } from "../index.js"
import { failedStatuses } from "../utils/determineTradeStatus.js"
import { updateHolding } from "../firestore/db/updateHolding.js"

export const checkTradeStatus = async (change, context) => {
  // - get document info
  const eventDetails = await change.data()
  logger.log("Event Details: ", eventDetails)

  const {
    event,
    order: {
      filled_qty: qty,
      client_order_id: clientOrderId,
      status,
      filled_at: filledAt,
      filled_avg_price: avgPrice,
      at: eventTimestamp,
    },
  } = eventDetails

  const [groupName, messageId] = clientOrderId.split("|")

  const tradeRef = firestore.collection(`groups/${groupName}/trades`).doc(messageId)
  const tradeData = (await tradeRef.get()).data()

  logger.log("trade data", tradeData)

  if (event == "fill") {
    const updateInformation = await updateHolding({
      groupName,
      messageId,
      tradeData,
      executionStatus: status,
      qty,
    })
    tradeRef.update({
      ...updateInformation,
      executionQty: qty,
      executionTimestamp: new Date(filledAt),
      executionPrice: avgPrice,
      executionUpdateTimestamp: new Date(),
    })
  } else if (failedStatuses.includes(event)) {
    logger.log("not filled")

    // TODO: update trade status from failed to match alpacas status

    if (tradeData.side == "buy") {
      // - return held money to group
      const groupRef = firestore.collection("groups").doc(groupName)
      let { cashBalance } = (await groupRef.get()).data()
      logger.log("cash balance: ", cashBalance)
      groupRef.update({ cashBalance: cashBalance + tradeData.notional })
    }
    tradeRef.update({
      executionStatus: "failed",
      executionTimestamp: new Date(eventTimestamp),
      executionUpdateTimestamp: new Date(),
    })
  }
}
