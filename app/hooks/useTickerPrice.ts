import { fetchWithToken } from "@utils/fetchWithToken"
import dayjs from "dayjs"
import useSWR from "swr"
import { useAuth } from "./useAuth"
import { Price } from "@models/Price"

export function useTickerPrice(
  tickerSymbol: string,
  expirationTime?: number, // - swr uses milliseconds (3 minutes default)
  initialData?: Price
): { price: Price; isLoading: boolean; isError: boolean } {
  const { user } = useAuth()
  const token = user?.token
  const filters = "latestPrice,changePercent,iexRealtimePrice,latestUpdate,currency"

  const { data, error } = useSWR(
    [`/api/iex/quote/${tickerSymbol}?filter=${filters}`, token],
    fetchWithToken,
    {
      refreshInterval: expirationTime ? expirationTime : 3 * 60 * 1000,
      refreshWhenOffline: false,
      initialData,
    }
  )
  return {
    price: {
      ...data,
      latestUpdate: dayjs(data?.latestUpdate),
    },
    isLoading: !error && !data,
    isError: error,
  }
}
