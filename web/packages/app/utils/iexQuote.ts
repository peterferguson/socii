import { fetchWithToken } from "./fetchWithToken"

export const iexQuote = async (
  assetAsset: string,
  token: string,
  filter: string = "latestPrice,changePercent,iexRealtimePrice,latestUpdate,currency,isUSMarketOpen"
) =>
  assetAsset
    ? await fetchWithToken(`/api/iex/quote/${assetAsset}?filter=${filter}`, token, null)
    : null
