import { useTickerPrice } from "@hooks/useTickerPrice"
import { pnlTextColor } from "@utils/pnlTextColor"
import { currencyFormatter } from "@utils/currencyFormatter"
import React from "react"

const PriceHeading = ({
  tickerSymbol,
  className = "",
  currency = "USD",
  expirationTime = 3,
}) => {
  // - update price every three seconds on the order screen
  const {
    price: { iexRealtimePrice, changePercent },
    isLoading,
  } = useTickerPrice(tickerSymbol, 3 * 1000)

  const pnlColor = pnlTextColor(changePercent)

  // - Tailwind jit compiler needs this string as it is not used anywhere: text-red-300
  return (
    <span className={`text-lg font-primary p-1 ${className}`}>
      {currencyFormatter(iexRealtimePrice, currency)} &bull;
      <span className={`p-1 ${pnlColor}`}>{changePercent?.toFixed(3)}%</span>
    </span>
  )
}

export default PriceHeading
