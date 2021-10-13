import { useEffect, useState } from "react"
import { getTickerDocs } from "../lib/firebase/client/db/getTickerDocs"
import { getYahooPrice, YahooPriceData } from "../utils/getYahooPrice"
import { getYahooRecommendations } from "../utils/getYahooRecommendations"
import { pnlTextColor } from "../utils/pnlTextColor"
import { usePrevious } from "./usePrevious"

export interface AlpacaData {
  symbol: string
}
export interface RecommendationData extends YahooPriceData {
  logoColor: string
  pnlColor: string
  ISIN: string
  alpaca: AlpacaData
}

interface Recommendations {
  [recommendation: string]: RecommendationData
}

// TODO: add loading state
export const useRecommendations = (symbol: string) => {
  const [recommendationList, setRecommendationList] = useState<string[]>([])
  const [recommendationData, setRecommendationData] = useState<any>()

  const previousSymbol = usePrevious(symbol)

  useEffect(() => {
    if (symbol) {
      previousSymbol !== symbol && setRecommendationList([])

      getYahooRecommendations({ tickers: [symbol] }).then((data) => {
        setRecommendationList(Array.from(new Set(data)))
      })
    }
  }, [previousSymbol, symbol])

  useEffect(() => {
    if (recommendationList.length > 0) {
      const getTickerData = async () => {
        const price = await getYahooPrice(recommendationList, [
          "regularMarketChangePercent",
        ])
        const data = (await getTickerDocs(recommendationList))?.map((doc) => doc.data())

        setRecommendationData(
          data.reduce((acc, datum) => {
            const symbol = datum.tickerSymbol.split(".")[0]
            const pnlColor = pnlTextColor(price?.[symbol]?.regularMarketChangePercent)

            if (acc)
              return {
                ...acc,
                [symbol]: {
                  ...datum,
                  ...price[symbol],
                  pnlColor,
                },
              }
            else return { [symbol]: datum }
          }, {})
        )
      }
      getTickerData()
    }
  }, [recommendationList])

  return { recommendations: recommendationData as Recommendations }
}
