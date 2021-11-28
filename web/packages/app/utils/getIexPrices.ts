import { iexQuote } from "./iexQuote"
import { CurrentPrices } from "../hooks/useIexPrice"

export const getIexPrices = async ({
  assets,
  token,
}: {
  assets: string[]
  token: string
}): Promise<CurrentPrices> => {
  const prices: CurrentPrices = {}

  for (const asset of assets) {
    try {
      const quote = await iexQuote(asset, token)
      const price = quote?.iexRealtimePrice || quote?.latestPrice
      prices[asset] = price
    } catch (error) {
      console.error("Failed to fetch iex price for", { asset, error })
      prices[asset] = null
    }
  }

  return prices
}
