import dayjs from "dayjs"
import useSWR from "swr"
import { useAuth } from "./useAuth"
import { Price } from "@models/Price"
import { useEffect, useRef } from "react"
import { iexQuote } from "@utils/iexQuote"

// TODO: Allow this to handle multiple tickers
export function useTickerPrice(
  tickerSymbol: string,
  expirationTime?: number, // - swr uses milliseconds (3 minutes default)
  initialData?: Price
): { price: Price; isLoading: boolean; isError: boolean } {
  const { user } = useAuth()
  const token = user?.token
  const marketOpen = useRef<boolean>(true)

  // TODO: change conditional once pre/post-markets are implemented
  const { data, error } = useSWR(
    marketOpen.current // - Stop polling if market is closed
      ? [tickerSymbol, token]
      : null,
    iexQuote,
    {
      refreshInterval: expirationTime ? expirationTime : 3 * 60 * 1000,
      refreshWhenOffline: false,
      initialData,
    }
  )

  useEffect(() => {
    if (data?.isUSMarketOpen) marketOpen.current = data?.isUSMarketOpen
    if (error?.statusCode === 402) marketOpen.current = false
  }, [error?.statusCode, data?.isUSMarketOpen])

  return {
    price: {
      ...data,
      latestUpdate: dayjs(data?.latestUpdate),
    },
    isLoading: !error && !data,
    isError: error,
  }
}
