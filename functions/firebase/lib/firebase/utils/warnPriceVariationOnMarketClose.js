"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnPriceVariationOnMarketClose = void 0;
const marketClosedMessage_1 = require("../utils/marketClosedMessage");
const streamClient_1 = require("../utils/streamClient");
const warnPriceVariationOnMarketClose = async (isUSMarketOpen, primaryExchange, latestPrice, symbol, groupName, latestAgreesId) => {
    !isUSMarketOpen &&
        (await streamClient_1.streamClient
            .channel("group", groupName)
            .sendMessage(await marketClosedMessage_1.marketClosedMessage(primaryExchange, latestPrice, symbol, latestAgreesId)));
};
exports.warnPriceVariationOnMarketClose = warnPriceVariationOnMarketClose;
//# sourceMappingURL=warnPriceVariationOnMarketClose.js.map