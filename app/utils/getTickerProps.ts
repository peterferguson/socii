import { getAlphaVantageData } from "@lib/firebase/client/db/getAlphaVantageData"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { DocumentData } from "firebase/firestore"
import { tickerTimeseries } from "./tickerTimeseries"

export const getTickerProps = async (
  tickerDoc: DocumentData,
  timeseriesLimit: number,
  subQueryField: string
): Promise<{ ticker: any; timeseries: OHLCTimeseries; dataQuery: any }> => {
  // * Get ticker company data
  const ticker = tickerDoc.data()
  let dataQuery = null

  const timeseries = ((await tickerTimeseries(
    ticker.tickerSymbol,
    timeseriesLimit,
    ticker.ISIN
  )) || {}) as OHLCTimeseries

  // * serialize the dates broke due to nesting of the ticker data
  // * therefore just going to stringify the ticker data then parse it
  if (subQueryField)
    dataQuery = await getAlphaVantageData(ticker.tickerSymbol, subQueryField)

  return { ticker, timeseries, dataQuery }
}
