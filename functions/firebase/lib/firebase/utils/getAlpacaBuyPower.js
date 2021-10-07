"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlpacaBuyPower = void 0;
const firebase_functions_1 = require("firebase-functions");
const index_js_1 = require("../../shared/alpaca/index.js");
const getAlpacaBuyPower = async (accountId) => {
    // * Ensure all investors have can afford the trade in their alpaca account
    const client = new index_js_1.AccountsApi(index_js_1.config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET));
    firebase_functions_1.logger.log(`Getting trade account data for ${accountId}`);
    const { buyingPower, cash, cashWithdrawable, daytradeCount, daytradingBuyingPower } = await client.getTradingAccount(accountId);
    return {
        buyingPower: parseFloat(buyingPower),
        cash: parseFloat(cash),
        cashWithdrawable: parseFloat(cashWithdrawable),
        daytradeCount,
        daytradingBuyingPower: parseFloat(daytradingBuyingPower),
    };
};
exports.getAlpacaBuyPower = getAlpacaBuyPower;
//# sourceMappingURL=getAlpacaBuyPower.js.map