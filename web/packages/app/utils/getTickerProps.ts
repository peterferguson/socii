import { getAlphaVantageData } from "../lib/firebase/db/getAlphaVantageData"
import { OHLCTimeseries } from "../models/OHLCTimseries"
import { DocumentData } from "firebase/firestore"
import { getYahooTimeseries, IntervalEnum, PeriodEnum } from "./getYahooTimeseries"

export const getTickerProps = async (
  tickerDoc: DocumentData,
  period: PeriodEnum,
  interval: IntervalEnum,
  subQueryField: string = ""
): Promise<{ ticker: any; timeseries: OHLCTimeseries; dataQuery: any }> => {
  // * Get ticker company data
  const ticker = tickerDoc?.data?.()
  let dataQuery, data, timeseries

  if (period && interval) {
    console.log(`Getting ${ticker?.tickerSymbol} timeseries`)
    data = await getYahooTimeseries({
      assets: [ticker?.tickerSymbol],
      period,
      interval,
    })

    timeseries = data[ticker?.tickerSymbol] || ({} as OHLCTimeseries)
  }
  if (subQueryField)
    dataQuery = await getAlphaVantageData(ticker.tickerSymbol, subQueryField)

  return { ticker, timeseries, dataQuery }
}
