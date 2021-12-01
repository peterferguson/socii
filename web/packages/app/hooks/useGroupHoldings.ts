import { getHoldingData } from "app/lib/firebase/db/getHoldingData"
import { QueryDocumentSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCustomCompareEffect } from "./useCustomCompareEffect"
import { useIexPrice } from "./useIexPrice"

export interface HoldingInfo {
  ISIN: string
  symbol: string
  shortName: string
  logoColor: string
}

export interface HoldingPrice {
  symbol: string
  avgPrice: number
  qty: number
  currentPrice: number
}

export const useGroupHoldings = (groupName: string) => {
  const [holdingsDocs, setHoldingsDocs] = useState<QueryDocumentSnapshot[]>(undefined)
  const [holdingsInfo, setHoldingsInfo] = useState<HoldingInfo[]>([])
  const [holdingPriceData, setHoldingPriceData] = useState<HoldingPrice[]>([])

  useEffect(() => {
    let unsubscribe
    if (groupName) unsubscribe = getHoldingData(groupName, setHoldingsDocs)
    return () => unsubscribe?.()
  }, [groupName])

  // TODO: Add a filter to allow the hook users to only get the data they need
  useEffect(
    () =>
      setHoldingsInfo(
        holdingsDocs?.map((doc): HoldingInfo => {
          const { symbol, assetRef, shortName, logoColor } = doc.data()
          return {
            ISIN: assetRef?.id || assetRef.split("/").pop(),
            symbol,
            shortName,
            logoColor,
          }
        })
      ),
    [holdingsDocs]
  )

  // ? Doing this here since I am not sure if there will be a situation where we dont
  // ? want to know the price, gain & portfolioValue when we get the groups holdings
  const { prices: currentPrices, isLoading: loadingPrices } = useIexPrice(
    holdingsInfo?.map(h => h.symbol)
  )

  // - Rerender only when there are new holdings docs or when the current prices change
  useCustomCompareEffect(
    () => {
      return (
        Object.keys(currentPrices).length > 0 &&
        !loadingPrices &&
        setHoldingPriceData(
          holdingsInfo.map(({ symbol }, i): HoldingPrice => {
            const { avgPrice, qty } = holdingsDocs[i].data()

            return {
              symbol,
              avgPrice,
              qty,
              currentPrice:
                currentPrices[symbol]?.latestPrice ||
                currentPrices[symbol]?.iexRealtimePrice,
            }
          })
        )
      )
    },
    [currentPrices],
    (a, b) => {
      //   holdingsInfo?.length > 0 &&
      //   Object.keys(a).every(key => holdingsInfo.map(h => h.symbol).includes(key)) &&
      return JSON.stringify(a) === JSON.stringify(b)
    }
  )

  return { data: holdingsInfo, prices: holdingPriceData, error: undefined }
}
