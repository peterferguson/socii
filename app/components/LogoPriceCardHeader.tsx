import { useTickerPrice } from "@hooks"
import React from "react"
import PctChangeTag from "./PctChangeTag"
import TickerLogo from "./TickerLogo"

interface ILogoHeader {
  tickerSymbol: string
  cost?: number
  purchasePrice?: number
  className?: string
  showChange?: boolean
}

// - show the logo and the price of the ticker.
// - if the ticker has a purchase price, show the % change since purchase.
// - if the ticker has a cost, show the cost as the main `price`.
export default function LogoPriceCardHeader({
  tickerSymbol,
  cost,
  purchasePrice,
  className = "",
  showChange = true,
}: ILogoHeader) {
  const { price: priceData } = useTickerPrice(tickerSymbol)

  const currentPrice = priceData?.iexRealtimePrice || priceData?.latestPrice
  const price = cost ? cost : currentPrice

  const priceChange = purchasePrice
    ? (currentPrice - purchasePrice) / purchasePrice
    : priceData?.changePercent

  return (
    <>
      <TickerLogo tickerSymbol={tickerSymbol} />
      <a className={className}>
        <div className="w-auto h-auto p-1 text-center">
          <div
            className={
              "text-base lg:text-xl px-2 mx-1 rounded-full font-semibold w-full text-center \
               inline-block font-primary mt-1 text-gray-500"
            }
          >
            {tickerSymbol} &bull; ${price}
          </div>
          {showChange && priceChange !== null && (
            <PctChangeTag pctChange={priceChange} />
          )}
        </div>
      </a>
    </>
  )
}
