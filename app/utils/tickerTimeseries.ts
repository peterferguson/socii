import { getTickerTimeseriesDocs, tickerToISIN } from "@lib/firebase/client/db"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { fetcher } from "./fetcher"

export const tickerTimeseries = async (
  tickerSymbol: string = "",
  limit: number = 30,
  isin: string = ""
): Promise<OHLCTimeseries> => {
  const ISIN = isin ? isin : await tickerToISIN(tickerSymbol)
  const timeseriesDocs = await getTickerTimeseriesDocs(ISIN, limit)

  let timeseries: OHLCTimeseries

  if (timeseriesDocs.docs.length === 0) {
    // * Get timeseries data from api
    // let baseUrl = "https://www.quandl.com/api/v3/datasets/WIKI/{}/data.json"
    let baseUrl = "https://socii.app"
    if (process.env.NODE_ENV !== "production") baseUrl = "http://localhost:3000"

    timeseries = await fetcher(
      `${baseUrl}/api/av/timeseries?tickerSymbol=${tickerSymbol}&ISIN=${isin}`
    )
  } else {
    timeseries = timeseriesDocs.docs.map((doc) => {
      const { open, high, low, close, volume } = doc.data()

      return {
        open,
        high,
        low,
        close,
        volume,
        timestamp: parseInt(doc.id) * 1000,
      }
    })
  }

  return timeseries
}
