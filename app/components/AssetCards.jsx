import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import React from "react"

export default function SmallAssetPctChangeCard({
  logoUrl,
  tickerSymbol,
  dailyPctChange,
  monthlyPctChange,
  shortName,
}) {
  // TODO: Market state with some nice symbols like sun & moon for open & closed plus info on last updated
  return (
    <div className="flex-none pt-4 pl-4 sm:pl-8">
      <div className="w-40 p-4 bg-white rounded-lg shadow-lg sm:w-52">
        <div className="items-center justify-center sm:flex">
          <img
            className="w-16 h-auto mx-auto rounded-full shadow-lg"
            src={logoUrl}
            alt={`${tickerSymbol} logo`}
          />
          <div className="w-auto h-auto p-2 text-center">
            <div
              className={`${pnlBackgroundColor(
                dailyPctChange
              )} text-black text-tiny sm:text-xs px-2 mx-1 rounded-full font-semibold \
              w-full text-center inline-block`}
            >
              D: {dailyPctChange?.toFixed(2)}%
            </div>
            <div
              className={`${pnlBackgroundColor(
                monthlyPctChange
              )} text-black text-tiny sm:text-xs px-2 mx-1 rounded-full font-semibold \
                w-full text-center hidden sm:inline-block`}
            >
              M: {monthlyPctChange?.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="inline-block w-full ml-2 text-xs font-semibold tracking-wider text-gray-600 uppercase overflow-ellipsis">
          {tickerSymbol} &bull; {shortName}
        </div>
      </div>
    </div>
  )
}
