"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmInvestmentMML = void 0;
const singleLineTemplateString_1 = require("../../utils/singleLineTemplateString");
const confirmInvestmentMML = ({ username, side, symbol, notional, messageId, parentId, showInChannel, }) => {
    const mmlstring = `<mml><investmentConfirmation></investmentConfirmation></mml>`;
    const mmlmessage = {
        id: messageId || null,
        message_id: messageId || null,
        user_id: username,
        text: (0, singleLineTemplateString_1.singleLineTemplateString) `
      Hey ${username} wants the group to ${side} ${notional} worth of shares of ${symbol} 
      . Do you agree that the group should execute this trade?
      `,
        // text: singleLineTemplateString`
        //   Hey ${username} wants the group to ${side} ${qty} shares of ${symbol}
        //   for ${cost}. Do you agree that the group should execute this trade?
        //   `,
        command: side,
        parent_id: parentId || null,
        show_in_channel: showInChannel || null,
        attachments: [
            {
                tickerSymbol: symbol,
                type: "investmentConfirmation",
                mml: mmlstring,
                actions: [
                    {
                        name: "action",
                        text: "Yes",
                        type: "button",
                        value: "yes",
                    },
                    {
                        name: "action",
                        text: "No",
                        type: "button",
                        value: "no",
                    },
                ],
            },
        ],
    };
    return mmlmessage;
};
exports.confirmInvestmentMML = confirmInvestmentMML;
//# sourceMappingURL=confirmInvestmentMML.js.map