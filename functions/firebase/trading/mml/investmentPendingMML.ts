import { singleLineTemplateString } from "../../utils/singleLineTemplateString";
import { currencySymbols } from "../../utils/currencySymbols";
import { isSell } from "../../utils/isSell";

export const investmentPendingMML = (tradeData) => {
  const mmlstring = `<mml><investmentReceipt></investmentReceipt></mml>`;
  const mmlmessage = {
    user_id: "socii",
    text: singleLineTemplateString`
        $${tradeData.notional} of ${tradeData.symbol} ${isSell(tradeData.type) ? "sale" : "purchase"} for ${currencySymbols[tradeData.assetCurrency]}${tradeData.stockPrice} per share.
         IS PENDING
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
