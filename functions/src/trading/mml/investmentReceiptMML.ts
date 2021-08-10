import { singleLineTemplateString } from "../../utils/singleLineTemplateString";
import { currencySymbols } from "../../utils/currencySymbols";
import { isSell } from "../../utils/isSell";

/*
 * Helper Functions
 */
export const investmentReceiptMML = (tradeData) => {
  const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`;
  const mmlmessage = {
    user_id: "socii",
    text: singleLineTemplateString`
        ${tradeData.shares} shares of $${tradeData.tickerSymbol} ${isSell(tradeData.orderType) ? "sold" : "purchased"} for ${currencySymbols[tradeData.assetCurrency]}${tradeData.price} per share.
        For a cost of ${currencySymbols[tradeData.executionCurrency]}${tradeData.cost}
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
