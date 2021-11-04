import useSWRNative from "@nandorojo/swr-react-native"
import { iexQuote } from "../utils/iexQuote"
import { useAuth } from "./useAuth"
import { SWRConfiguration } from "swr"

interface CurrentPrices {
  [assetSymbol: string]: number | null
}

export const useIexPrices = (
  assets: string[],
  config?: SWRConfiguration
): {
  prices: CurrentPrices
  isLoading: boolean
  error: Error
} => {
  const { user } = useAuth()
  const { data: currentPrices, error } = useSWRNative<CurrentPrices, Error>(
    user?.token && assets ? [assets.join("-"), user?.token] : null,
    (assets, token) => getIexPrices({ assets: assets.split("-"), token }),
    config
  )

  return {
    prices: currentPrices || ({} as CurrentPrices),
    isLoading: !currentPrices && !error,
    error: error,
  }
}

const getIexPrices = async ({
  assets,
  token,
}: {
  assets: string[]
  token: string
}): Promise<CurrentPrices> => {
  const prices: CurrentPrices = {}

  assets?.forEach(async symbol => {
    try {
      const quote = await iexQuote(symbol, token)
      const price = quote?.iexRealtimePrice || quote?.latestPrice
      prices[symbol] = price
    } catch (e) {
      console.error(e)
      prices[symbol] = null
    }
  })

  return prices
}
