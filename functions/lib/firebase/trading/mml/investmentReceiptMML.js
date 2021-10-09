"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investmentReceiptMML = void 0;
const singleLineTemplateString_1 = require("../../utils/singleLineTemplateString");
const currencySymbols_1 = require("../../utils/currencySymbols");
const isSell_1 = require("../../utils/isSell");
/*
 * Helper Functions
 */
const investmentReceiptMML = (tradeData) => {
    const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`;
    const mmlmessage = {
        user_id: "socii",
        text: (0, singleLineTemplateString_1.singleLineTemplateString) `
        $${tradeData.notional} of ${tradeData.symbol} ${(0, isSell_1.isSell)(tradeData.type) ? "sold" : "purchased"} for ${currencySymbols_1.currencySymbols[tradeData.assetCurrency]}${tradeData.stockPrice} per share.
        
        `,
        attachments: [
            {
                type: "receipt",
                mml: mmlstring,
                tickerSymbol: tradeData.symbol,
            },
        ],
    };
    return mmlmessage;
};
exports.investmentReceiptMML = investmentReceiptMML;
//# sourceMappingURL=investmentReceiptMML.js.map