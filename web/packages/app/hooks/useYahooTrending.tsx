import React, { useMemo, useEffect } from "react"
import { Asset } from "../models/Asset"
import { AssetsObject, useAssetData } from "./useAssetData"
import { useYahoo } from "./useYahoo"

export const useYahooTrending = (): {
  trending: AssetsObject
  isLoading: boolean
  isError: Error | null
} => {
  const { data, isLoading, isError } = useYahoo([], "get_trending")

  const symbols = useMemo(
    () => data?.quotes?.length && data.quotes.map(({ symbol }) => symbol),
    [data?.quotes]
  )

  const trending = useAssetData(symbols)

  return {
    trending: trending ? trending : ({} as AssetsObject),
    isLoading,
    isError,
  }
}
