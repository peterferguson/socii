import { useTickerPriceSWR } from "@hooks/useTickerPrice"
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
    price: { realtimePrice, percentChange },
    isLoading,
  } = useTickerPriceSWR(tickerSymbol, 3 * 1000)

  const pnlColor = pnlTextColor(percentChange)

  // - Tailwind jit compiler needs this string as it is not used anywhere: text-red-300
  return (
    <span className={`text-lg font-primary p-1 ${className}`}>
      {currencyFormatter(realtimePrice, currency)} &bull;
      <span className={`p-1 ${pnlColor}`}>{percentChange?.toFixed(3)}%</span>
    </span>
  )
}

export default PriceHeading
