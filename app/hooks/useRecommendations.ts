import { usePrevious } from "@hooks/usePrevious"
import { getTickerDocs } from "@lib/firebase/client/db/getTickerDocs"
import { getYahooPrice, YahooPriceData } from "@utils/getYahooPrice"
import { getYahooRecommendations } from "@utils/getYahooRecommendations"
import { pnlTextColor } from "@utils/pnlTextColor"
import { useEffect, useState } from "react"

interface RecommendationData extends YahooPriceData {
  logoColor: string
  pnlColor: string
}

interface Recommendations {
  [recommendation: string]: RecommendationData
}

// TODO: add loading state
// TODO: Create cancellable query (using swr?)... moving quickly between screens can cause this to run multiple times & lag
export const useRecommendations = (symbol: string) => {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [data, setData] = useState<any>()

  const previousSymbol = usePrevious(symbol)

  useEffect(() => {
    if (symbol) {
      if (previousSymbol !== symbol) setRecommendations([])
      getYahooRecommendations({ tickers: [symbol] }).then((data) => {
        setRecommendations(Array.from(new Set(data)))
      })
    }
  }, [previousSymbol, symbol])

  useEffect(() => {
    if (recommendations.length > 0) {
      const getTickerData = async () => {
        const data = (await getTickerDocs(recommendations))?.map((doc) => doc.data())
        const price = await getYahooPrice(recommendations, [
          "regularMarketChangePercent",
        ])
        setData(
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
  }, [recommendations])

  return { recommendations: data as Recommendations }
}
