import { useEffect, useState } from "react"
import { DonutSector } from "../components/DonutChart"
import { useDeepCompareEffect } from "./useDeepCompareEffect"
import { HoldingInfo, HoldingPrice } from "./useGroupHoldings"

export const useDonutSectors = (
  holdingsInfo: HoldingInfo[],
  prices: HoldingPrice[]
) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const [donutSectors, setDonutSectors] = useState<DonutSector[]>([])

  useDeepCompareEffect(() => {
    // - update donutSectors when a new price is available
    const updateDonutSectors = newPriceKeys => {
      const sectors = holdingsInfo
        .filter(({ symbol }) => newPriceKeys.includes(symbol))
        ?.map(({ symbol, logoColor }) => {
          const priceData = prices.filter(
            ({ symbol: assetSymbol }) => assetSymbol === symbol
          )[0]

          return {
            symbol,
            color: logoColor,
            value: priceData.currentPrice * priceData.qty,
          }
        })
      setDonutSectors(s => [...s, ...sectors])
    }

    if (!prices) return

    const currentPriceKeysNotInDonutSectors = prices
      .filter(({ symbol }) => !donutSectors.some(s => s.symbol === symbol))
      .map(({ symbol }) => symbol)

    currentPriceKeysNotInDonutSectors.length &&
      updateDonutSectors(currentPriceKeysNotInDonutSectors)
  }, [prices])

  return donutSectors
}
