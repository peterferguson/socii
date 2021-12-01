import useSWRNative from "@nandorojo/swr-react-native"
import { Price } from "app/models/Price"
import { SWRConfiguration } from "swr"
import { getIexPrices } from "../utils/getIexPrices"
import { useAuth } from "./useAuth"

export interface CurrentPrices {
  [assetSymbol: string]: Price
}

export const useIexPrice = (
  assets: string[],
  config?: SWRConfiguration
): {
  prices: CurrentPrices
  isLoading: boolean
  error: Error
} => {
  const { user } = useAuth()
  const { data: currentPrices, error } = useSWRNative<CurrentPrices, Error>(
    user?.token && assets?.length > 0 ? [assets.join("-"), user?.token] : null,
    (assets, token) => getIexPrices({ assets: assets.split("-"), token }),
    config
  )

  return {
    prices: currentPrices || ({} as CurrentPrices),
    isLoading: !currentPrices && !error,
    error: error,
  }
}
