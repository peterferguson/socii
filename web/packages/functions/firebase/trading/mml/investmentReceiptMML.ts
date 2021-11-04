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
        $${tradeData.notional} of ${tradeData.symbol} ${isSell(tradeData.type) ? "sold" : "purchased"} for ${currencySymbols[tradeData.assetCurrency]}${tradeData.stockPrice} per share.
        
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
