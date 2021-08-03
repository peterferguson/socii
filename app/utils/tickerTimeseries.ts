import { DocumentReference } from "@lib/firebase/client/firebase"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { fetcher } from "./fetcher"

export const tickerTimeseries = async (
  tickerRef: DocumentReference,
  limit: number = 30,
  tickerSymbol: string
): Promise<OHLCTimeseries> => {
  // * Get timeseries data
  const timeseriesRef = tickerRef
    .collection("timeseries")
    .orderBy("timestamp", "desc")
    .limit(limit)

  let timeseriesDocs = (await timeseriesRef.get()).docs

  let timeseries: OHLCTimeseries

  if (timeseriesDocs.length === 0) {
    // * Get timeseries data from api
    const isin = tickerRef.path.split("/").pop()

    // let baseUrl = "https://www.quandl.com/api/v3/datasets/WIKI/{}/data.json"
    let baseUrl = "https://socii.app"
    if (process.env.NODE_ENV !== "production") baseUrl = "http://localhost:3000"

    timeseries = await fetcher(
      `${baseUrl}/api/av/timeseries?tickerSymbol=${tickerSymbol}&ISIN=${isin}`
    )
  } else {
    timeseries = timeseriesDocs.map((doc) => {
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
