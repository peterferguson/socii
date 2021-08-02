import { iexQuote } from "@utils/iexQuote"
import { useEffect, useState } from "react"
import { usePersistentState } from "./usePersistentState"
import { useAuth } from "./useAuth"
import dayjs from "dayjs"
import useSWR from "swr"
import { fetchWithToken } from "@utils/fetchWithToken"

interface Price {
  price: number
  percentChange: number
  realtimePrice: number
}

interface PriceData extends Price {
  lastUpdated: string
}

export const useTickerPrice = (
  tickerSymbol: string,
  expirationTime = 3 * 60
): PriceData => {
  const { user } = useAuth()
  const token = user?.token
  const [price, setPrice] = usePersistentState(
    {
      price: 0,
      percentChange: 0,
      iexRealtimePrice: 0,
      lastUpdated: new Date(0).toISOString(),
    },
    `${tickerSymbol}-price`
  )

  // TODO: Implement cache clearing logic
  // TODO: Implement different price/chart collection policies for more popular stocks
  // ? We could do different pricing strategies based on data availibilty to the user
  // ? For example if a user agrees to decreased data availability we could offered reduced
  // ? price services. Alternatively we could offer to match so part of the cost of a share
  // ? or maybe even offer free shares for opting in.
  // - Check if the lastUpdated is expired using expirationTime (3 minutes default)

  useEffect(() => {
    if (!price || dayjs().diff(dayjs(price.lastUpdated), "second") > expirationTime) {
      iexQuote(tickerSymbol, "latestPrice,changePercent,iexRealtimePrice", token).then(
        ({ latestPrice, changePercent, iexRealtimePrice }) => {
          // - write to firebase

          setPrice({
            price: latestPrice || 0.0,
            realtimePrice: iexRealtimePrice || 0.0,
            percentChange: changePercent || 0.0,
            lastUpdated: new Date().toISOString(),
          })
        }
      )
    }
  }, [expirationTime, price, setPrice, tickerSymbol, token])

  return price
}

export const useTickerPriceSWR = (
  tickerSymbol: string,
  expirationTime: number = 3 * 60 * 1000, // - swr uses milliseconds (3 minutes default)
  initialData: PriceData
): { price: Price; isLoading: boolean; isError: boolean } => {
  const { user } = useAuth()
  const token = user?.token
  const { data, error } = useSWR(
    [
      `/api/iex/quote/${tickerSymbol}?filter=latestPrice,changePercent,iexRealtimePrice`,
      token,
    ],
    fetchWithToken,
    { refreshInterval: expirationTime, refreshWhenOffline: false, initialData }
  )
  return {
    price: {
      price: data?.latestPrice,
      realtimePrice: data?.iexRealtimePrice,
      percentChange: data?.changePercent,
    },
    isLoading: !error && !data,
    isError: error,
  }
}
