import { fetcher } from "@utils/fetcher"
import useSWR from "swr"
import { MarketClock } from "@socii/shared/alpaca/utils/getRealtimeQuotes"

export const useMarketClock = () => {
  const { data, error } = useSWR<MarketClock, Error>(["/api/alpaca/clock"], fetcher, {
    refreshInterval: 3 * 60 * 1000,
    refreshWhenOffline: false,
  })
  return {
    marketClock: {
      timestamp: data?.timestamp,
      isOpen: data?.is_open,
      nextOpen: data?.next_open,
      nextClose: data?.next_close,
    },
    isLoading: !error && !data,
    isError: error as Error,
  }
}
