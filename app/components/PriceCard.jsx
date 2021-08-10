import { useTickerPrice } from "@hooks/useTickerPrice"
import { pnlTextColor } from "@utils/pnlTextColor"
import React from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { TickerLogo } from "./TickerLogo"

export default function PriceCard({ isin, tickerSymbol, shortName, price, isPriceLoading}) {
  return (
    <div className="p-4 m-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div className="flex items-center">
        <TickerLogo
          tickerSymbol={tickerSymbol}
          isin={isin}
          height="64px"
          width="64px"
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
        {isPriceLoading ? (
          <p className="w-32 h-12 my-4 text-4xl font-bold text-left text-gray-700 animate-pulse dark:text-gray-100" />
        ) : (
          <p className="my-4 text-4xl font-bold text-left text-gray-700 dark:text-gray-100">
            <span className="text-sm">$</span>
            {price?.iexRealtimePrice || price?.latestPrice}
          </p>
        )}
        <div
          className={`flex items-center text-sm ${pnlTextColor(price?.changePercent)}`}
        >
          {price?.changePercent > 0 ? <FaCaretUp /> : <FaCaretDown />}
          <span>{(price?.changePercent * 100).toFixed(2)}%</span>
          <span className="text-gray-400 align-bottom text-tiny"> vs last month</span>
        </div>
      </div>
    </div>
  )
}
