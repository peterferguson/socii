import { marketClosedMessage } from "../utils/marketClosedMessage"
import { streamClient } from "../utils/streamClient"

export const warnPriceVariationOnMarketClose = async (
  isUSMarketOpen: boolean,
  primaryExchange: string,
  latestPrice: number,
  symbol: string,
  groupName: string,
  latestAgreesId
) => {
  !isUSMarketOpen &&
    (await streamClient
      .channel("group", groupName)
      .sendMessage(
        await marketClosedMessage(primaryExchange, latestPrice, symbol, latestAgreesId)
      ))
}
