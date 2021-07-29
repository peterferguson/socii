import { fetchWithToken } from "./fetchWithToken"

export const iexQuote = async (tickerSymbol: string, filter: string, token: string) => {
  return await fetchWithToken(
    `/api/iex/quote/${tickerSymbol}?filter=${filter}`,
    token,
    null
  )
}
