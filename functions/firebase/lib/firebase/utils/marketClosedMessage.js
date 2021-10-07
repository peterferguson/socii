"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketClosedMessage = void 0;
const singleLineTemplateString_1 = require("./singleLineTemplateString");
/*
 * Helper Functions
 */
const marketClosedMessage = async (exchange, latestPrice, symbol, latestAgreesId) => ({
    user_id: "socii",
    text: singleLineTemplateString_1.singleLineTemplateString `
    The ${exchange} is not currently open, so the execution price ($${latestPrice}) of ${symbol} may change.
    `,
    onlyForMe: latestAgreesId,
});
exports.marketClosedMessage = marketClosedMessage;
//# sourceMappingURL=marketClosedMessage.js.map