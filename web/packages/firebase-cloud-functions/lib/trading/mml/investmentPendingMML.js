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
        text: (0, singleLineTemplateString_1.singleLineTemplateString) `
        $${tradeData.notional} of ${tradeData.symbol} ${(0, isSell_1.isSell)(tradeData.type) ? "sale" : "purchase"} for ${currencySymbols_1.currencySymbols[tradeData.assetCurrency]}${tradeData.stockPrice} per share.
         IS PENDING
        `,
        attachments: [
            {
                type: "receipt",
                mml: mmlstring,
                tickerSymbol: tradeData.symbol,
                tradeId: tradeData.tradeId,
                alpacaOrderId: tradeData.alpacaOrderId,
                orderStatus: tradeData.orderStatus,
                side: tradeData.type,
                cost: tradeData.notional,
                price: tradeData.stockPrice,
            },
        ],
    };
    return mmlmessage;
};
exports.investmentPendingMML = investmentPendingMML;
//# sourceMappingURL=investmentPendingMML.js.map