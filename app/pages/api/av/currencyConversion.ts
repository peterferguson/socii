// const bent = require("bent"))
const alpha = require("alphavantage")({
  key: process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY,
})
import { cors } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  if (req.method !== "GET") return res.status(405).end()

  const { fromCurrency, toCurrency } = req.query as {
    fromCurrency: string
    toCurrency: string
  }

  if (!fromCurrency || !toCurrency) return res.status(422).end()

  res.setHeader("Content-Type", "application/json")
  res.end(
    JSON.stringify(
      currencyConversionDataCleaning(await alpha.forex.rate(fromCurrency, toCurrency))
    )
  )
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
