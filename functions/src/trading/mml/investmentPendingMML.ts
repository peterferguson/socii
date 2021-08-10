import { singleLineTemplateString } from "../../utils/singleLineTemplateString";
import { currencySymbols } from "../../utils/currencySymbols";
import { isSell } from "../../utils/isSell";

export const investmentPendingMML = (tradeData) => {
  const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`;
  const mmlmessage = {
    user_id: "socii",
    text: singleLineTemplateString`
        ${tradeData.shares} shares of $${tradeData.tickerSymbol} ${isSell(tradeData.orderType) ? "sale" : "purchase"} for ${currencySymbols[tradeData.assetCurrency]}${tradeData.price} per share.
        For a cost of ${currencySymbols[tradeData.executionCurrency]}${tradeData.cost} IS PENDING
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
