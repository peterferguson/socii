import { DateStr } from "@models/DateStr"
import { OHLC } from "@models/OHLC"

export enum PeriodEnum {
  "1d",
  "5d",
  "7d",
  "60d",
  "1mo",
  "3mo",
  "6mo",
  "1y",
  "2y",
  "5y",
  "10y",
  "ytd",
  "max",
}

export enum IntervalEnum {
  "1m",
  "2m",
  "5m",
  "15m",
  "30m",
  "60m",
  "90m",
  "1h",
  "1d",
  "5d",
  "1wk",
  "1mo",
  "3mo",
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
  const functionUrl =
    `https://europe-west2-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/get_historical_prices`

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
