import { singleLineTemplateString } from "./singleLineTemplateString";

/*
 * Helper Functions
 */
export const priceChangedMessage = async (latestPrice, symbol, latestAgreesId) => ({
  user_id: "socii",
  text: singleLineTemplateString`
    The price has changed more than 2.5% since your order was submitted. $${latestPrice} is the latest price of ${symbol}. Place another order if you'd like to buy.
    `,
  onlyForMe: latestAgreesId,
});
