"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investmentFailedMML = void 0;
const singleLineTemplateString_1 = require("../../utils/singleLineTemplateString");
const isSell_1 = require("../../utils/isSell");
const investmentFailedMML = (tradeData) => {
    const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`;
    const mmlmessage = {
        user_id: "socii",
        text: (0, singleLineTemplateString_1.singleLineTemplateString) `
        $${tradeData.notional} of ${tradeData.symbol} ${(0, isSell_1.isSell)(tradeData.type) ? "sale" : "purchase"} has failed and will not be executed
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
exports.investmentFailedMML = investmentFailedMML;
//# sourceMappingURL=investmentFailedMML.js.map