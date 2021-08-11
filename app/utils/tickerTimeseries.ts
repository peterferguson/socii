import { tickerToISIN } from "@lib/firebase/client/db/tickerToISIN"
import { getTickerTimeseriesDocs } from "@lib/firebase/client/db/getTickerTimeseriesDocs"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { fetcher } from "./fetcher"
import { newerThanLastMarketDay } from "./newerThanLastMarketDay"

export const tickerTimeseries = async (
  tickerSymbol: string = "",
  limit: number = 30,
  isin: string = ""
): Promise<OHLCTimeseries> => {
  const ISIN = isin ? isin : await tickerToISIN(tickerSymbol)
  const timeseriesDocs = (await getTickerTimeseriesDocs(ISIN, limit)).docs

  // - Query if the latest doc is the last market day
  const latestTimestamp = timeseriesDocs[timeseriesDocs.length - 1]?.id
  const isUpdateToDate = await newerThanLastMarketDay(latestTimestamp)

  if (isUpdateToDate) {
    return timeseriesDocs
      .map((doc) => {
        const { open, high, low, close, volume } = doc.data()
        const timestamp = parseInt(doc.id)

        return {
          open,
          high,
          low,
          close,
          volume,
          timestamp: timestamp / 1e10 < 1 ? timestamp * 1000 : timestamp,
        }
      })
      .sort((a, b) => a.timestamp - b.timestamp)
  } else {
    // * Get timeseries data from api

    const functionsBaseUrl = "https://europe-west2-sociiinvest.cloudfunctions.net"
    //   process.env.NODE_ENV === "production"
    //     ? "https://europe-west2-sociiinvest.cloudfunctions.net"
    //     : "http://localhost:5001/sociiinvest/europe-west2"
    // }
    const timeseriesBaseUrl = `${functionsBaseUrl}/get_historical_prices`
    const storeTimeseriesBaseUrl = `${functionsBaseUrl}/storeTimeseries`

    try {
      // TODO: Convert this to run for all the popular tickers at once!
      const timeseries = await fetcher(timeseriesBaseUrl, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ tickerSymbol }),
        headers: { "Content-Type": "application/json" },
      })

      // TODO: take this out of the client side call for new stocks to be displayed
      // - store timeseries data in firebase
      fetcher(storeTimeseriesBaseUrl, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ isin: ISIN, timeseries }),
        headers: { "Content-Type": "application/json" },
      })
      return JSON.parse(JSON.stringify(timeseries))
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
