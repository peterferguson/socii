import { IEXQuoteResponse } from "@models/iex/IEXQuoteResponse"
import { fetchWithToken } from "./fetchWithToken"

export const iexQuote = async (
  symbol: string,
  token: string,
  filter: string = "latestPrice,changePercent,iexRealtimePrice,latestUpdate,currency,isUSMarketOpen"
): Promise<Partial<IEXQuoteResponse> | null> =>
  symbol
    ? await fetchWithToken(`/api/iex/quote/${symbol}?filter=${filter}`, token, null)
    : null
