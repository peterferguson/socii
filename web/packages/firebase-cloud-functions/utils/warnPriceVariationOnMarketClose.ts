import { marketClosedMessage } from "./marketClosedMessage"
import { streamClient } from "./streamClient"

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
