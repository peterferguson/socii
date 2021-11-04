import { singleLineTemplateString } from "./singleLineTemplateString";

/*
 * Helper Functions
 */
export const marketClosedMessage = async (exchange, latestPrice, symbol, latestAgreesId) => ({
  user_id: "socii",
  text: singleLineTemplateString`
    The ${exchange} is not currently open, so the execution price ($${latestPrice}) of ${symbol} may change.
    `,
  onlyForMe: latestAgreesId,
});
