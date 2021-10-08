import { fetcher } from "@utils/fetcher"
import useSWR from "swr"
// import { MarketClock } from "@socii/shared/alpaca/utils/getRealtimeQuotes"

// interface CamelCaseMarketClock {
//   timestamp: string
//   isOpen: boolean
//   nextOpen: string
//   nextClose: string
// }

export const useMarketClock = () => {
  const { data, error } = useSWR(["/api/alpaca/clock"], fetcher, {
    refreshInterval: 3 * 60 * 1000,
    refreshWhenOffline: false,
  })

  // FIXME: this is ugly should be handled upstream ensuring consistency in convention at
  // FIXME: the api level rather than the hook level
  // TODO: Once the above is fixed convert back to ts file
  let marketClock = {
    timestamp: "",
    isOpen: undefined,
    nextOpen: "",
    nextClose: "",
  }
  if (data) {
    if (Object.keys(data).includes("is_open")) {
      marketClock = {
        timestamp: data?.timestamp,
        isOpen: data?.is_open,
        nextOpen: data?.next_open,
        nextClose: data?.next_close,
      }
    } else {
      marketClock = {
        timestamp: data?.timestamp,
        isOpen: data?.isOpen,
        nextOpen: data?.nextOpen,
        nextClose: data?.nextClose,
      }
    }
  }

  return {
    marketClock,
    isLoading: !error && !data,
    isError: error,
  }
}
