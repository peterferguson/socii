import { iexQuote } from "./iexQuote"
import { CurrentPrices } from "../hooks/useIexPrice"
import { Price } from "app/models/Price"

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
      prices[asset] = quote as undefined as Price
    } catch (error) {
      console.error("Failed to fetch iex price for", { asset, error })
      prices[asset] = null
    }
  }

  return prices
}
