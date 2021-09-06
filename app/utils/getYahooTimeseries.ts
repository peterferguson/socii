import { DateStr } from "@models/DateStr"
import { OHLC } from "@models/OHLC"

export enum PeriodEnum {
  "1D" = "1d",
  "5D" = "5d",
  "7D" = "7d",
  "60D" = "60d",
  "1M" = "1mo",
  "3M" = "3mo",
  "6M" = "6mo",
  "1Y" = "1y",
  "2Y" = "2y",
  "5Y" = "5y",
  "10Y" = "10y",
  "YTD" = "ytd",
  "MAX" = "max",
}

export enum IntervalEnum {
  "1m" = "1m",
  "2m" = "2m",
  "5m" = "5m",
  "15m" = "15m",
  "30m" = "30m",
  "60m" = "60m",
  "90m" = "90m",
  "1h" = "1h",
  "1d" = "1d",
  "5d" = "5d",
  "1wk" = "1wk",
  "1mo" = "1mo",
  "3mo" = "3mo",
}

export interface YahooTimeseries {
  [tickerSymbol: string]: OHLC[]
}

interface getYahooTimeseriesProps {
  tickers: string[]
  startDateStr?: DateStr
  endDateStr?: DateStr
  period?: PeriodEnum
  interval?: IntervalEnum
}

export const getYahooTimeseries = async ({
  tickers,
  startDateStr,
  endDateStr,
  period,
  interval,
}: getYahooTimeseriesProps): Promise<YahooTimeseries> => {
  const functionUrl = `https://europe-west2-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/get_historical_prices`

  const yahooData = await (
    await fetch(functionUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        period,
        interval,
        tickerSymbol: tickers.join(" "),
        start: startDateStr,
        end: endDateStr,
      }),
    })
  ).json()

  return yahooData?.reduce((data, tick) => {
    const { symbol, timestamp, ...ohlcv } = tick
    if (symbol in data) data[symbol].push({ ...ohlcv, timestamp: new Date(timestamp) })
    else
      Object.assign(data, { [symbol]: [{ ...ohlcv, timestamp: new Date(timestamp) }] })
    return data
  }, {})
}
