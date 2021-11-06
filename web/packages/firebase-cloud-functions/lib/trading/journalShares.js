"use strict";
/*
 * Called after trade is filled and holding is updated:
 *  Transfers the shares to the individual alpaca accounts
 *
 * @param data
 * @returns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.journalShares = void 0;
const firebase_functions_1 = require("firebase-functions");
const index_js_1 = require("../shared/alpaca/index.js");
const index_js_2 = require("../index.js");
const journalShares = async (data) => {
    const journals = new index_js_1.JournalsApi((0, index_js_1.config)(index_js_2.functionConfig.alpaca.key, index_js_2.functionConfig.alpaca.secret));
    firebase_functions_1.logger.log("journal data", data);
    const { agreesToTrade, qty, direction, symbol } = data;
    const journalQty = qty / agreesToTrade.length;
    const ALPACA_FIRM_ACCOUNT = index_js_2.functionConfig.alpaca.firm_account;
    // default values to journal from firm to accounts (in case of BUY)
    let alpacaId = "";
    let fromAccount = ALPACA_FIRM_ACCOUNT;
    let toAccount = alpacaId;
    // if shares should be moved from accounts to firm (in case of SELL)
    if (direction == "toFirm") {
        fromAccount = alpacaId;
        toAccount = ALPACA_FIRM_ACCOUNT;
    }
    for (let item of agreesToTrade) {
        let alpacaId = String(item).split("/")[2];
        const journal = await index_js_1.JournalData.from({
            entry_type: "JNLS",
            from_account: fromAccount,
            to_account: alpacaId,
            qty: journalQty,
            symbol: symbol,
        });
        journals.postJournals(journal).then(console.log);
    }
    return;
};
exports.journalShares = journalShares;
//# sourceMappingURL=journalShares.js.map