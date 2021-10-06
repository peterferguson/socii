import { fetchWithToken } from "./fetchWithToken"

export const iexQuote = async (
  tickerSymbol: string,
  token: string,
  filter: string = "latestPrice,changePercent,iexRealtimePrice,latestUpdate,currency"
) =>
  tickerSymbol
    ? await fetchWithToken(
        `/api/iex/quote/${tickerSymbol}?filter=${filter}`,
        token,
        null
      )
    : null
