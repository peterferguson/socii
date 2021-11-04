"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTradeStatus = void 0;
const firebase_functions_1 = require("firebase-functions");
const index_js_1 = require("../index.js");
const determineTradeStatus_js_1 = require("../utils/determineTradeStatus.js");
const updateHolding_js_1 = require("../firestore/db/updateHolding.js");
const checkTradeStatus = async (change, context) => {
    // - get document info
    const eventDetails = await change.data();
    firebase_functions_1.logger.log("Event Details: ", eventDetails);
    const { event, order: { filled_qty: qty, client_order_id: clientOrderId, status, filled_at: filledAt, filled_avg_price: avgPrice, at: eventTimestamp, }, } = eventDetails;
    const [groupName, messageId] = clientOrderId.split("|");
    const tradeRef = index_js_1.firestore.collection(`groups/${groupName}/trades`).doc(messageId);
    const tradeData = (await tradeRef.get()).data();
    firebase_functions_1.logger.log("trade data", tradeData);
    if (event == "fill") {
        const updateInformation = await (0, updateHolding_js_1.updateHolding)({
            groupName,
            messageId,
            tradeData,
            executionStatus: status,
            qty,
        });
        tradeRef.update({
            ...updateInformation,
            executionQty: qty,
            executionTimestamp: new Date(filledAt),
            executionPrice: avgPrice,
            executionUpdateTimestamp: new Date(),
        });
    }
    else if (determineTradeStatus_js_1.failedStatuses.includes(event)) {
        firebase_functions_1.logger.log("not filled");
        // TODO: update trade status from failed to match alpacas status
        if (tradeData.side == "buy") {
            // - return held money to group
            const groupRef = index_js_1.firestore.collection("groups").doc(groupName);
            let { cashBalance } = (await groupRef.get()).data();
            firebase_functions_1.logger.log("cash balance: ", cashBalance);
            groupRef.update({ cashBalance: cashBalance + tradeData.notional });
        }
        tradeRef.update({
            executionStatus: "failed",
            executionTimestamp: new Date(eventTimestamp),
            executionUpdateTimestamp: new Date(),
        });
    }
};
exports.checkTradeStatus = checkTradeStatus;
//# sourceMappingURL=checkTradeStatus.js.map