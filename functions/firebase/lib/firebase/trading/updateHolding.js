"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHolding = void 0;
/*
 * Called when an Alpaca order has been confirmed. That can occur:
 *
 *
 * - Immediately in tradeConfirmation
 * - After the TBC[checkOrderStatus] funciton indicates the trade is complete
 *
 *
 * @param data
 * @param context
 * @returns tradeUpdateData if needed
 */
const index_js_1 = require("../firestore/index.js");
const index_js_2 = require("../index.js");
const updateHolding = async (data, context) => {
    const { groupName, tradeData, messageId, executionStatus } = data;
    // - Data to update the state of the trade on completion of function
    // - Should also stop infinite loops
    // - can be set to success, pending, failed
    let tradeUpdateData = { executionStatus: executionStatus, pnlPercentage: {} };
    const balanceChange = tradeData.side == "sell" ? 1 : -1;
    const qty = parseFloat(data.qty);
    const latestPrice = tradeData.stockPrice;
    const ISIN = tradeData.assetRef.split("/").pop();
    const groupRef = index_js_2.firestore.collection("groups").doc(groupName);
    let { cashBalance, investorCount, privacyOption } = (await groupRef.get()).data();
    // 1. Batch update holdings
    const holdingDocRef = index_js_2.firestore.collection(`groups/${groupName}/holdings`).doc(ISIN);
    const { type, holdingData, pnlPercentage } = await upsertHolding({
        holdingDocRef,
        tradeData,
        messageId,
        privacyOption,
        qty,
    });
    // TODO - potentially await and check response here?
    switch (type) {
        case "update":
            holdingDocRef.update(holdingData);
            if (tradeData.side == "sell")
                groupRef.update({
                    cashBalance: cashBalance + balanceChange * qty * latestPrice,
                });
            if (pnlPercentage)
                tradeUpdateData.pnlPercentage = pnlPercentage;
            return tradeUpdateData;
            break;
        case "set":
            holdingDocRef.set(holdingData);
            return tradeUpdateData;
            break;
        default:
            // - Secondary execution check (this time on the holding doc) ... do nothing
            return;
    }
};
exports.updateHolding = updateHolding;
const upsertHolding = async ({ holdingDocRef, tradeData, messageId, qty, privacyOption, }) => {
    const { side, notional, assetRef, symbol, shortName, stockPrice } = tradeData;
    const negativeEquityMultiplier = side.toLowerCase().includes("buy") ? 1 : -1;
    // - Assumptions:
    // 1. We keep zero share holdings to easily identify all previous holdings.
    // ? Could this be imposed in the firestore rules.
    // 2: On selling shares the cost basis is not affected & so only the shares is changed
    const sharesIncrement = negativeEquityMultiplier * qty;
    // * Check if the holding already exists
    const holding = await holdingDocRef.get();
    const outputData = { type: "", holdingData: {}, pnlPercentage: {}, privacyOption };
    if (holding.exists) {
        // - Trade already exists in holding ... do nothing
        if (holding.trades?.includes(messageId))
            return outputData;
        const currentShares = holding.get("qty");
        const currentAvgPrice = holding.get("avgPrice");
        var newAvgPrice = negativeEquityMultiplier + 1
            ? (currentAvgPrice * currentShares + stockPrice * qty) / (currentShares + qty)
            : currentAvgPrice;
        // * Add profit to a sell trade on a current holding
        if (!(negativeEquityMultiplier + 1)) {
            outputData.pnlPercentage =
                (100 * (stockPrice - currentAvgPrice)) / currentAvgPrice;
        }
        outputData.type = "update";
        outputData.holdingData = {
            avgPrice: newAvgPrice,
            qty: index_js_1.increment(sharesIncrement),
            lastUpdated: index_js_1.serverTimestamp(),
            trades: index_js_1.arrayUnion(messageId),
        };
    }
    else {
        outputData.type = "set";
        outputData.holdingData = {
            assetRef,
            symbol,
            shortName,
            trades: [messageId],
            avgPrice: String(stockPrice),
            qty: index_js_1.increment(sharesIncrement),
            lastUpdated: index_js_1.serverTimestamp(),
        };
    }
    return outputData;
};
//# sourceMappingURL=updateHolding.js.map