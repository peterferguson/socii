"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradeConfirmation = void 0;
const firebase_functions_1 = require("firebase-functions");
const index_js_1 = require("../../shared/alpaca/index.js");
const getRealtimeQuotes_1 = require("../../shared/alpaca/utils/getRealtimeQuotes");
const index_js_2 = require("../index.js");
const determineTradeStatus_1 = require("../utils/determineTradeStatus");
const isSell_1 = require("../utils/isSell");
const streamClient_1 = require("../utils/streamClient");
const warnPriceVariationOnMarketClose_1 = require("../utils/warnPriceVariationOnMarketClose");
const investmentPendingMML_1 = require("./mml/investmentPendingMML");
/*
- tradeConfirmation
1. Add the uid/username/alpacaID of the agreesToTrade array
2. Once trade is agreed (agreesToTrade.len() === investors.len()) then we can update
2. holdings and send confirmation message with the price at which the asset was purchased
*/
// - Doc listener for documents:
// - groups/{groupName}/trades/{tradeId}
const tradeConfirmation = async (change, context) => {
    const { groupName, tradeId } = context.params;
    const tradeData = await change.after.data();
    const latestAgreesId = tradeData.agreesToTrade.slice(-1)[0].split("/")[1];
    const symbol = tradeData.symbol;
    if (tradeData.executionStatus)
        return; // - do nothing
    const groupRef = index_js_2.firestore.collection("groups").doc(groupName);
    let { cashBalance, investorCount } = (await groupRef.get()).data();
    // ! alpaca quote is failing in some instances, for now we will use iex as a fallback
    let alpacaQuote, iexPrice;
    try {
        alpacaQuote = await getAlpacaPrice(symbol, tradeData.type);
    }
    catch (e) {
        console.log(e);
        console.log("Using iex as a fallback");
        iexPrice = await getIexPrice(symbol);
    }
    const { latestPrice, isUSMarketOpen, primaryExchange } = alpacaQuote
        ? alpacaQuote
        : iexPrice;
    firebase_functions_1.logger.log("IEX latestPrice", latestPrice, "& execution price:", tradeData.stockPrice);
    await warnPriceVariationOnMarketClose_1.warnPriceVariationOnMarketClose(isUSMarketOpen, primaryExchange, latestPrice, symbol, groupName, latestAgreesId);
    // - Adjust notional amount based on the latest price & account buying power
    // - Accept a smaller share amount if the cashBalance gets us close to the original share amount
    // TODO: Implement a client-side check on the cost vs cashBalance.
    // - A small variation should be somewhat enforced on the client-side.
    // - Assuming no massive jump in stock price.
    // TODO: Need to distinguish shares bought by cost & those by share amount
    // - drop share amount to within 2.5% of total cashBalance.
    // ! This is arbitrary & maybe be another threshold decided upon by the group.
    // TODO: Create a group settings page which lists the thresholds that can be tinkered
    if (tradeData.notional >= cashBalance && !isSell_1.isSell(tradeData.type))
        tradeData.notional = cashBalance * 0.95;
    /*
     ! Add user setting to allow for an acceptable price variation between latestPrice and
     ! agreed price (tradeData.price).
     *
     *
     * Possible failure mechanisms/things to think aboout if this fails
     1. If this fails we may need to send a new message warning the group of the new price.
     ?. This may be too slow for a highly beta stock. Imagine GME or any squeeze
     2. Allowing a user an option to set a new threshold on each purchase if it is high beta
     */
    if ((latestPrice - tradeData.stockPrice) / tradeData.stockPrice > 0.025 &&
        !isSell_1.isSell(tradeData.type)) {
        firebase_functions_1.logger.log(`The price has risen more than 2.5% since the price was agreed`);
        return;
    }
    else
        tradeData.stockPrice = latestPrice;
    if (tradeData.agreesToTrade.length === investorCount) {
        let postOrder;
        firebase_functions_1.logger.log(`Sending order: ${JSON.stringify(tradeData)}`);
        const investorRef = index_js_2.firestore.collection(`groups/${groupName}/investors`);
        const investors = (await investorRef.get()).docs;
        try {
            for (const investor of investors) {
                const username = investor.id;
                const { alpacaAccountId } = investor.data();
                firebase_functions_1.logger.log(`Sending ${tradeData.side} order for $${tradeData.notional / investorCount} of ${symbol} for user ${username} with alpaca id ${alpacaAccountId}`);
                postOrder = await index_js_2.tradeClient.postOrders(alpacaAccountId, index_js_1.CreateOrder.from({
                    symbol: symbol,
                    side: tradeData.side,
                    time_in_force: tradeData.timeInForce,
                    type: tradeData.type,
                    notional: String(tradeData.notional / investorCount),
                    //qty: tradeData.qty, // remove and replace with notional
                    //limitPrice: tradeData.limitPrice ? tradeData.limitPrice : null , // remove
                    client_order_id: `${tradeData.groupName}|${tradeData.messageId}`,
                }));
                firebase_functions_1.logger.log(`Order sent for user ${username} with status ${postOrder.status}`);
                firebase_functions_1.logger.log("Order: ", postOrder);
            }
        }
        catch (err) {
            firebase_functions_1.logger.error(err);
        }
        // - Complete ephemeral message
        const channel = streamClient_1.streamClient.channel("group", groupName.replace(/\s/g, "-"));
        await streamClient_1.streamClient.partialUpdateMessage(tradeData.messageId, { set: { status: "complete" } }, tradeData.username);
        switch (determineTradeStatus_1.determineTradeStatus(postOrder.status) ?? "failed") {
            case "success":
                // 1. Deduct balance immediately
                if (tradeData.side == "buy")
                    groupRef.update({ cashBalance: cashBalance - tradeData.notional });
                firebase_functions_1.logger.log("order successful. Id:", postOrder?.id);
                return;
            case "pending":
                // 1. Withold balance until pending order is resolved
                if (tradeData.side == "buy")
                    groupRef.update({ cashBalance: cashBalance - tradeData.notional });
                // 3. send a message to inform about pending order
                await channel.sendMessage(investmentPendingMML_1.investmentPendingMML({ ...tradeData, tradeId, alpacaOrderId: postOrder?.id }));
                return;
            case "failed":
                firebase_functions_1.logger.log("order failed. Id:", postOrder?.id);
                change.after.ref.update({ executionStatus: "failed" });
                return;
        }
    }
};
exports.tradeConfirmation = tradeConfirmation;
const getIexPrice = async (symbol) => {
    const iexClient = require("../index.js").iexClient;
    const { latestPrice, isUSMarketOpen, primaryExchange } = await iexClient.quote(symbol, { filter: "latestPrice,isUSMarketOpen,primaryExchange" });
    return { latestPrice, isUSMarketOpen, primaryExchange };
};
const getAlpacaPrice = async (symbol, tradeType) => {
    const { meta, quotes: { [symbol]: { quote }, }, } = await getRealtimeQuotes_1.getRealtimeQuotes([symbol]);
    const latestPrice = isSell_1.isSell(tradeType) ? quote.bp : quote.ap;
    const primaryExchange = isSell_1.isSell(tradeType) ? quote.bx : quote.ax;
    const isUSMarketOpen = meta.is_open;
    return { latestPrice, isUSMarketOpen, primaryExchange };
};
//# sourceMappingURL=tradeConfirmation.js.map