import { useTickerPriceSWR } from "@hooks/useTickerPrice"
import { pnlTextColor } from "@utils/pnlTextColor"
import React from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"

export default function PriceCard({
  logoUrl,
  tickerSymbol,
  shortName,
  currencySymbol = "$",
  movingMonthlyPctChange,
  initialPrice = undefined,
}) {
  const { price, isLoading, isError } = useTickerPriceSWR(
    tickerSymbol,
    3 * 60 * 1000,
    initialPrice
  )

  return (
    <div className="p-4 m-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div className="flex items-center">
        <img
          className="w-16 h-auto mx-auto rounded-full shadow-lg"
          src={logoUrl}
          alt={`${tickerSymbol} logo`}
        />
        <div className="flex flex-col">
          <span className="ml-2 text-base font-bold tracking-wider text-gray-700 uppercase dark:text-white">
            {tickerSymbol}
          </span>
          <br />
          <span className="ml-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-white">
            {shortName}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-start">
        {isLoading ? (
          <p className="w-32 h-12 my-4 text-4xl font-bold text-left text-gray-700 animate-pulse dark:text-gray-100" />
        ) : (
          <p className="my-4 text-4xl font-bold text-left text-gray-700 dark:text-gray-100">
            {price.realtimePrice}
            <span className="text-sm">{currencySymbol}</span>
          </p>
        )}
        <div
          className={`flex items-center text-sm ${pnlTextColor(price?.percentChange)}`}
        >
          {movingMonthlyPctChange > 0 ? <FaCaretUp /> : <FaCaretDown />}
          <span>{movingMonthlyPctChange.toFixed(2)}%</span>
          <span className="text-gray-400 align-bottom text-tiny"> vs last month</span>
        </div>
      </div>
    </div>
  )
}
