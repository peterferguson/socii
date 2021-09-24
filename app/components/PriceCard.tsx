import { Price } from "@models/Price"
import { pnlTextColor } from "@utils/pnlTextColor"
import React from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import TickerLogo from "./TickerLogo"

const PriceCard: React.FC<{
  tickerSymbol: string
  shortName: string
  price: Price
  isPriceLoading: boolean
}> = ({ tickerSymbol, shortName, price, isPriceLoading }) => (
  <div className="p-4 mt-4 mb-2 bg-white shadow-lg sm:mt-2 rounded-2xl dark:bg-gray-800">
    <div className="flex items-center">
      <TickerLogo tickerSymbol={tickerSymbol} height="64px" width="64px" />
      <div className="flex flex-col">
        <span className="mb-2 ml-2 text-base font-semibold tracking-wider text-gray-700 uppercase dark:text-white">
          {tickerSymbol}
        </span>
        <span className="ml-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-white">
          {shortName}
        </span>
      </div>
    </div>
    <div className="flex flex-col justify-start">
      {isPriceLoading ? (
        <p className="w-32 h-12 my-4 text-4xl font-semibold text-left text-gray-700 animate-pulse dark:text-gray-100" />
      ) : (
        <p className="my-4 text-4xl font-semibold text-left text-gray-700 dark:text-gray-100">
          <span className="text-sm">$</span>
          {(price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2)}
        </p>
      )}
      <div
        className={`flex items-center text-sm pb-0.5 ${pnlTextColor(
          price?.changePercent
        )}`}
      >
        {price?.changePercent > 0 ? <FaCaretUp /> : <FaCaretDown />}
        <span className="pr-1">{(price?.changePercent * 100)?.toFixed(2)}%</span>
        <span className="text-gray-400  text-tiny -pb-0.5 ">on the day</span>
      </div>
    </div>
  </div>
)

export default PriceCard
