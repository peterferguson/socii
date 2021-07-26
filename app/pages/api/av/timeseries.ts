import { OHLC } from "@models/OHLC"
import { cors } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"
import { firestore, fromDate } from "@lib/firebase-admin"
// const bent = require("bent"))
const alpha = require("alphavantage")({
  key: process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  if (req.method !== "GET") return res.status(405).end()

  const { tickerSymbol, ISIN } = req.query as { tickerSymbol: string; ISIN: string }

  if (!tickerSymbol) return res.status(422).end()

  const data = await alpha.data.daily(tickerSymbol)

  if ("Note" in data) return {}

  const timeseries = data["Time Series (Daily)"]

  if (!timeseries) res.end()

  const dates = Object.keys(timeseries)

  const timeseriesData = dates.map((date) => {
    const ohlc = {} as OHLC
    ohlc["timestamp"] = new Date(date)
    const ohlcKeys = Object.keys(timeseries[date])
    ohlcKeys.map((key) => {
      const newKey = key.replace(/[0-9]. /, "")
      ohlc[newKey] = parseFloat(timeseries[date][key])
    })
    return ohlc
  })

  // * update firestore with the timeseries data
  // TODO: Remove this from here so the user doesn't have to wait on storing the data
  const batch = firestore.batch()
  for (let ohlc of timeseriesData) {
    const { timestamp, ...data } = ohlc

    const timestampNumber =
      typeof timestamp !== "number" ? timestamp.getTime() : timestamp

    const timestampFirestoreDate = fromDate(
      typeof timestamp !== "number" ? timestamp : new Date(timestamp)
    )

    const outputRef = firestore
      .collection(`tickers/${ISIN}/timeseries`)
      .doc(`${timestampNumber}`)

    batch.set(outputRef, {
      ...data,
      timestamp: timestampFirestoreDate,
    })
  }
  await batch.commit()

  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(timeseriesData))
}

interface ExchangeRate {
  rate?: number
  lastRefresh?: string
  timezone?: string
}

export function currencyConversionDataCleaning(data: {
  [x: string]: { [x: string]: string }
}): ExchangeRate | null {
  /*
   *   Alpha Vantage Query Return Type
   *   {
   *      "Realtime Currency Exchange Rate": {
   *          "1. From_Currency Code": "USD",
   *          "2. From_Currency Name": "United States Dollar",
   *          "3. To_Currency Code": "JPY",
   *          "4. To_Currency Name": "Japanese Yen",
   *          "5. Exchange Rate": "108.91000000",
   *          "6. Last Refreshed": "2021-05-19 13:34:30",
   *          "7. Time Zone": "UTC",
   *          "8. Bid Price": "108.90800000",
   *          "9. Ask Price": "108.91200000"
   *      }
   *   }
   */
  if ("Realtime Currency Exchange Rate" in data) {
    const exchangeRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
    const lastUpdated = data["Realtime Currency Exchange Rate"]["6. Last Refreshed"]
    const timezone = data["Realtime Currency Exchange Rate"]["7. Time Zone"]
    return { rate: parseFloat(exchangeRate), lastRefresh: lastUpdated, timezone }
  }

  return null
}
