import { useAuth } from "../hooks/useAuth"
import { IEXQuoteResponse } from "../models/iex/IEXQuoteResponse"
import { fetcher } from "../utils/fetcher"
import useSWR from "swr"

export const useMarketData = (marketAsset: string = "SPY", filter: string = "") => {
  const { user } = useAuth()

  const queryUrl = filter
    ? `/api/iex/quote/${marketAsset}?filter=${filter}`
    : `/api/iex/quote/${marketAsset}`

  const { data: market, error } = useSWR<IEXQuoteResponse>(
    user?.token ? [queryUrl, user?.token] : null,
    (url, token) => {
      const res = fetcher(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res
    },
    { refreshInterval: 3600 * 1000, refreshWhenOffline: false }
  )

  return { market, error }
}
