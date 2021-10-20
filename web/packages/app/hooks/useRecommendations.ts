import { useEffect, useState } from "react"
import { getAssetDocs } from "../lib/firebase/client/db/getAssetDocs"
import { getYahooPrice, YahooPriceData } from "../utils/getYahooPrice"
import { getYahooRecommendations } from "../utils/getYahooRecommendations"
import { pnlTextColor } from "../utils/pnlTextColor"
import { usePrevious } from "./usePrevious"

export interface AlpacaData {
  asset: string
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
export const useRecommendations = (asset: string) => {
  const [recommendationList, setRecommendationList] = useState<string[]>([])
  const [recommendationData, setRecommendationData] = useState<any>()

  const previousAsset = usePrevious(asset)

  useEffect(() => {
    if (asset) {
      previousAsset !== asset && setRecommendationList([])

      getYahooRecommendations({ assets: [asset] }).then((data) => {
        setRecommendationList(Array.from(new Set(data)))
      })
    }
  }, [previousAsset, asset])

  useEffect(() => {
    if (recommendationList.length > 0) {
      const getAssetData = async () => {
        const price = await getYahooPrice(recommendationList, [
          "regularMarketChangePercent",
        ])
        const data = (await getAssetDocs(recommendationList))?.map((doc) => doc.data())

        setRecommendationData(
          data.reduce((acc, datum) => {
            const asset = datum.assetAsset.split(".")[0]
            const pnlColor = pnlTextColor(price?.[asset]?.regularMarketChangePercent)

            if (acc)
              return {
                ...acc,
                [asset]: {
                  ...datum,
                  ...price[asset],
                  pnlColor,
                },
              }
            else return { [asset]: datum }
          }, {})
        )
      }
      getAssetData()
    }
  }, [recommendationList])

  return { recommendations: recommendationData as Recommendations }
}
