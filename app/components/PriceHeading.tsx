import { useTickerPrice } from "@hooks/useTickerPrice"
import { Price } from "@models/Price"
import { pnlTextColor } from "@utils/pnlTextColor"
import React from "react"

interface IPriceHeading {
  tickerSymbol: string
  expirationTime?: number
  initialPrice?: Price
  className?: string
}

const PriceHeading = ({
  tickerSymbol,
  className = "",
  expirationTime = 3 * 1000,
  initialPrice = null,
}) => {
  // - update price every three seconds on the order screen
  const { price, isLoading } = useTickerPrice(
    tickerSymbol,
    expirationTime,
    initialPrice
  )

  const pnlColor = pnlTextColor(price?.changePercent)

  // - Tailwind jit compiler needs this string as it is not used anywhere: text-red-300
  return price && !isLoading ? (
    <span className={`text-lg font-primary p-1 ${className}`}>
      ${(price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2)} &bull;
      <span className={`p-1 ${pnlColor}`}>
        {(price?.changePercent * 100)?.toFixed(3)}%
      </span>
    </span>
  ) : null
}

export default PriceHeading
