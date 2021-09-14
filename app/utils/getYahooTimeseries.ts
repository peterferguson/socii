import { DateStr } from "@models/DateStr"
import { OHLC } from "@models/OHLC"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)
dayjs.extend(utc)

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
  "1H" = "1h",
  "1D" = "1d",
  "5D" = "5d",
  "1W" = "1wk",
  "1M" = "1mo",
  "3M" = "3mo",
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
      mode: "cors",
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
    // - timestamp is in milliseconds & yahoo send nix timestamp wrt to US timezone
    // - we need to convert it to UTC since we are using UTC timezone with IEX data
    const timezoneDifference = dayjs().tz("America/New_York").utcOffset()
    // console.log(dayjs(timestamp).subtract(timezoneDifference, "minute").local().format())

    if (symbol in data)
      data[symbol].push({
        ...ohlcv,
        timestamp: dayjs(timestamp)
          .subtract(timezoneDifference, "minute")
          .local()
          .format(),
      })
    else
      Object.assign(data, {
        [symbol]: [
          {
            ...ohlcv,
            timestamp: dayjs(timestamp)
              .subtract(timezoneDifference, "minute")
              .local()
              .format(),
          },
        ],
      })
    return data
  }, {})
}
