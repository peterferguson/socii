"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTradeStatus = void 0;
const index_js_1 = require("../index.js");
const updateHolding_js_1 = require("./updateHolding.js");
const journalShares_js_1 = require("./journalShares.js");
const investmentFailedMML_1 = require("./mml/investmentFailedMML");
const investmentReceiptMML_1 = require("./mml/investmentReceiptMML");
const firebase_functions_1 = require("firebase-functions");
const stream_chat_1 = require("stream-chat");
const determineTradeStatus_js_1 = require("../utils/determineTradeStatus.js");
const checkTradeStatus = async (change, context) => {
    // - get document info
    const eventDetails = await change.data();
    firebase_functions_1.logger.log("Event Details: ", eventDetails);
    const { stream: { api_key, secret }, } = index_js_1.functionConfig;
    const { event, order: { filled_qty: qty, client_order_id: clientOrderId }, } = eventDetails;
    const [groupName, messageId] = clientOrderId.split("|");
    const tradeRef = index_js_1.firestore.collection(`groups/${groupName}/trades`).doc(messageId);
    const tradeData = (await tradeRef.get()).data();
    firebase_functions_1.logger.log("trade data", tradeData);
    const streamClient = new stream_chat_1.StreamChat(api_key, secret);
    const channel = streamClient.channel("group", groupName.replace(/\s/g, "-"));
    if (event == "fill") {
        firebase_functions_1.logger.log("fill");
        // update holding, send message to group and journal shares
        const updateInformation = await updateHolding_js_1.updateHolding({
            groupName,
            messageId,
            tradeData,
            executionStatus: "success",
            qty,
        });
        await channel.sendMessage(investmentReceiptMML_1.investmentReceiptMML(tradeData));
        if (tradeData.side == "buy") {
            journalShares_js_1.journalShares({
                agreesToTrade: tradeData.agreesToTrade,
                qty,
                symbol: tradeData.symbol,
                direction: "toAccounts",
            });
        }
        // TODO Create a journal for the cash from a sale. Currently it will be held in firm account
        tradeRef.update(updateInformation);
    }
    else if (determineTradeStatus_js_1.failedStatuses.includes(event)) {
        firebase_functions_1.logger.log("not filled");
        if (tradeData.side == "buy") {
            // - return money to group
            const groupRef = index_js_1.firestore.collection("groups").doc(groupName);
            let { cashBalance } = (await groupRef.get()).data();
            firebase_functions_1.logger.log("cash balance: ", cashBalance);
            groupRef.update({ cashBalance: cashBalance + tradeData.notional });
        }
        tradeRef.update({ executionStatus: "failed" });
        await channel.sendMessage(investmentFailedMML_1.investmentFailedMML(tradeData));
    }
};
exports.checkTradeStatus = checkTradeStatus;
//# sourceMappingURL=checkTradeStatus.js.map