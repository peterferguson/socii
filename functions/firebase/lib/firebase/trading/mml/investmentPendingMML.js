"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investmentPendingMML = void 0;
const singleLineTemplateString_1 = require("../../utils/singleLineTemplateString");
const currencySymbols_1 = require("../../utils/currencySymbols");
const isSell_1 = require("../../utils/isSell");
const investmentPendingMML = (tradeData) => {
    const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`;
    const mmlmessage = {
        user_id: "socii",
        text: singleLineTemplateString_1.singleLineTemplateString `
        $${tradeData.notional} of ${tradeData.symbol} ${isSell_1.isSell(tradeData.type) ? "sale" : "purchase"} for ${currencySymbols_1.currencySymbols[tradeData.assetCurrency]}${tradeData.stockPrice} per share.
         IS PENDING
        `,
        attachments: [
            {
                type: "receipt",
                mml: mmlstring,
                tickerSymbol: tradeData.symbol,
                tradeId: tradeData.tradeId,
                alpacaOrderId: tradeData.alpacaOrderId,
            },
        ],
    };
    return mmlmessage;
};
exports.investmentPendingMML = investmentPendingMML;
//# sourceMappingURL=investmentPendingMML.js.map