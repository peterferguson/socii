"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeSubmission = void 0;
const firebase_functions_1 = require("firebase-functions");
const index_js_1 = require("../firestore/index.js");
const index_js_2 = require("../index.js");
const getAlpacaBuyPower_js_1 = require("../utils/getAlpacaBuyPower.js");
const notEnoughBuyingPowerMessage_js_1 = require("../utils/notEnoughBuyingPowerMessage.js");
const streamClient_js_1 = require("../utils/streamClient.js");
const verifyTradeSubmissionContent_1 = require("../utils/verifyTradeSubmissionContent");
const verifyUser_1 = require("../utils/verifyUser");
const confirmInvestmentMML_1 = require("./mml/confirmInvestmentMML");
/*
- tradeSubmission
1. Verify that the data has been sent with all the correct keys
2. Add the trade to the trade collection in firestore properties include all of the above
2. and also a agreement list for each investor
*/
const tradeSubmission = async (data, context) => {
    verifyUser_1.verifyUser(context);
    const verifiedData = await verifyTradeSubmissionContent_1.verifyTradeSubmissionContent(data, context);
    const { messageId, submittedFromCallable } = data;
    // - Create trade document
    const investorsRef = index_js_2.firestore.collection(`groups/${verifiedData.groupName}/investors`);
    const investors = (await investorsRef.get()).docs;
    const investorCount = investors.length;
    // - Ensure each investor has enough cash to make the trade
    const canAffordTrade = await Promise.all(investors.map(async (investor) => {
        const data = investor.data();
        firebase_functions_1.logger.log(`Getting buying power for ${data.username}`);
        const { cash } = await getAlpacaBuyPower_js_1.getAlpacaBuyPower(data.alpacaAccountId);
        return {
            id: data.alpacaAccountId,
            cash,
            isAffordable: cash >= (verifiedData.notional / investorCount) * 1.05,
            // - Add 5% buffer
        };
    }));
    firebase_functions_1.logger.log(`investors: ${investors.map((investor) => investor.data().uid)}`);
    firebase_functions_1.logger.log(`canAffordTrade: ${JSON.stringify(canAffordTrade)}`);
    if (!canAffordTrade.every(({ isAffordable }) => isAffordable))
        return submittedFromCallable
            ? { error: "Some group members don't have enough cash" }
            : await streamClient_js_1.streamClient
                .channel("group", verifiedData.groupName)
                .sendMessage(notEnoughBuyingPowerMessage_js_1.notEnoughBuyingPowerMessage(verifiedData.username));
    // - Create trade document
    const tradeRef = index_js_2.firestore
        .collection(`groups/${verifiedData.groupName}/trades`)
        .doc(messageId);
    // - Store initial trade data
    tradeRef.set({
        ...verifiedData,
        agreesToTrade: [verifiedData.executorRef],
        timestamp: index_js_1.serverTimestamp(),
    });
    firebase_functions_1.logger.log(verifiedData);
    if (investorCount > 1) {
        // - Send confirmation message into chat
        const message = confirmInvestmentMML_1.confirmInvestmentMML({
            username: verifiedData.username,
            side: verifiedData.side,
            symbol: verifiedData.symbol,
            notional: verifiedData.notional,
            messageId,
        });
        return submittedFromCallable
            ? await streamClient_js_1.streamClient.channel("group", verifiedData.groupName).sendMessage(message)
            : await streamClient_js_1.streamClient.updateMessage(message);
    }
};
exports.tradeSubmission = tradeSubmission;
//# sourceMappingURL=tradeSubmission.js.map