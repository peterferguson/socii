import React, { useRef } from "react"
import { Asset } from "../models/Asset"
import { useAssetData } from "./useAssetData"
import { useYahoo } from "./useYahoo"

interface ITrendingAsset {
  [symbol: string]: Asset
}
export const useYahooTrending = (): {
  trending: ITrendingAsset[]
  isLoading: boolean
  isError: Error | null
} => {
  const { data, isLoading, isError } = useYahoo([], "get_trending")
  const symbols = useRef([] as string[])

  if (!symbols.current?.length)
    symbols.current = data?.quotes?.map(({ symbol }) => symbol)

  const trending = useAssetData(symbols.current)

  return {
    trending: trending.length !== 0 ? trending : [],
    isLoading,
    isError,
  }
}
