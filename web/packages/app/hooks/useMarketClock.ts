import { cameliseKeys } from "../utils/cameliseKeys"
import { fetcher } from "../utils/fetcher"
import { default as useSWR } from "@nandorojo/swr-react-native"

interface MarketClock {
  timestamp: string
  isMarketOpen: boolean
  nextMarketOpen: string
  nextMarketClose: string
  isLoading: boolean
  isError: Error
}

export const useMarketClock = () => {
  let { data, error } = useSWR<MarketClock, Error>(["/api/alpaca/clock"], fetcher, {
    refreshInterval: 3 * 60 * 1000,
    refreshWhenOffline: false,
  })

  // FIXME: this is ugly should be handled upstream ensuring consistency in convention at
  // FIXME: the api level rather than the hook level
  const marketClock = cameliseKeys(data)

  return {
    timestamp: marketClock?.timestamp || "",
    isMarketOpen: marketClock?.isOpen ?? undefined,
    nextMarketOpen: marketClock?.nextOpen || "",
    nextMarketClose: marketClock?.nextClose || "",
    isLoading: !error && !marketClock,
    isError: error,
  }
}
