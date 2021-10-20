import { Asset } from "../models/Asset"
import { useAssetData } from "./useAssetData"
import { useYahoo } from "./useYahoo"

export const useYahooTrending = (): {
  trending: {
    [symbol: string]: Asset
  }[]
  isLoading: boolean
  isError: Error | null
} => {
  const { data, isLoading, isError } = useYahoo([], "get_trending")

  const symbols = data?.quotes || []

  const trending = useAssetData(symbols)

  return {
    trending: trending.length !== 0 ? trending : [],
    isLoading,
    isError,
  }
}
