import { getAlphaVantageData } from "@lib/firebase/client/db/getAlphaVantageData"
import { OHLCTimeseries } from "@models/OHLCTimseries"
import { DocumentData } from "firebase/firestore"
import { getYahooTimeseries } from "./getYahooTimeseries"

export const getTickerProps = async (
  tickerDoc: DocumentData,
  subQueryField: string
): Promise<{ ticker: any; timeseries: OHLCTimeseries; dataQuery: any }> => {
  // * Get ticker company data
  const ticker = tickerDoc.data()
  let dataQuery

  console.log(`Getting ${ticker?.tickerSymbol} timeseries`)
  const data = await getYahooTimeseries({ tickers: [ticker?.tickerSymbol] })

  const timeseries = data[ticker?.tickerSymbol] || ({} as OHLCTimeseries)
  // * serialize the dates broke due to nesting of the ticker data
  // * therefore just going to stringify the ticker data then parse it
  if (subQueryField)
    dataQuery = await getAlphaVantageData(ticker.tickerSymbol, subQueryField)

  return { ticker, timeseries, dataQuery }
}
