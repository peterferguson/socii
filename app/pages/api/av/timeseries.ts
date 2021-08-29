import { OHLC } from "@models/OHLC"
import { withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"
import { fetcher } from "@utils/fetcher"

import alphaAPI from "alphavantage"

const alpha = alphaAPI({
  key: process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY,
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  const { tickerSymbol, ISIN } = req.query as { tickerSymbol: string; ISIN: string }

  if (!tickerSymbol) return res.status(422).end()

  const data = await alpha.data.daily_adjusted(tickerSymbol)

  if ("Note" in data) return res.end({})

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

  // TODO: Add the function to store the dat
  const firestoreStoreTimeseriesUrl = `https://europe-west2-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/storeTimeseries`

  await fetcher(firestoreStoreTimeseriesUrl, {
    method: "POST",
    body: JSON.stringify({ isin: ISIN, timeseries: timeseriesData }),
  })

  res.setHeader("Content-Type", "application/json")
  res.status(200).json(JSON.stringify(timeseriesData))
}

export default withCORS(handler)
