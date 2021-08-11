import { singleLineTemplateString } from "../../utils/singleLineTemplateString";
import { isSell } from "../../utils/isSell";

export const investmentFailedMML = (tradeData) => {
  const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`;
  const mmlmessage = {
    user_id: "socii",
    text: singleLineTemplateString`
        ${tradeData.shares} shares of $${tradeData.tickerSymbol} ${isSell(tradeData.orderType) ? "sale" : "purchase"} has failed and will not be executed
        `,
    attachments: [
      {
        type: "receipt",
        mml: mmlstring,
        tickerSymbol: tradeData.tickerSymbol,
      },
    ],
  };
  return mmlmessage;
};
