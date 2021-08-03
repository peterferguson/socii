import { fetchWithToken } from "@utils/fetchWithToken"
import dayjs from "dayjs"
import useSWR from "swr"
import { useAuth } from "./useAuth"

interface Price {
  price: number
  percentChange: number
  realtimePrice: number
  latestUpdate: dayjs.Dayjs | string
  currency: string
}

export const useTickerPrice = (
  tickerSymbol: string,
  expirationTime: number = 3 * 60 * 1000, // - swr uses milliseconds (3 minutes default)
  initialData: Price
): { price: Price; isLoading: boolean; isError: boolean } => {
  const { user } = useAuth()
  const token = user?.token
  const filters = "latestPrice,changePercent,iexRealtimePrice,latestUpdate,currency"
  const { data, error } = useSWR(
    [`/api/iex/quote/${tickerSymbol}?filter=${filters}`, token],
    fetchWithToken,
    { refreshInterval: expirationTime, refreshWhenOffline: false, initialData }
  )
  return {
    price: {
      price: data?.latestPrice,
      realtimePrice: data?.iexRealtimePrice,
      percentChange: data?.changePercent,
      latestUpdate: dayjs(data?.latestUpdate),
      currency: data?.currency,
    },
    isLoading: !error && !data,
    isError: error,
  }
}
