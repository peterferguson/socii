import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import React, { useState } from "react"

// TODO: Convert this to run for all the popular tickers at once!
export const SmallAssetCard = ({
  logoUrl,
  tickerSymbol,
  currentPrice,
  monthlyPctChange,
  shortName,
}) => {
  const [logoNotFound, setLogoNotFound] = useState(false)
  // TODO: Market state with some nice symbols like sun & moon for open & closed plus info on last updated
  return (
    <div className="flex-none pt-4 pl-4 sm:pl-8">
      <div className="w-40 h-full p-4 bg-white rounded-lg shadow-lg sm:h-36 sm:w-52">
        <div className="items-center justify-center sm:flex">
          {!logoNotFound ? (
            <img
              className="mx-auto rounded-full shadow-lg h-14 w-14"
              src={logoUrl}
              alt={`${tickerSymbol} logo`}
              onError={() => setLogoNotFound(true)}
            />
          ) : (
            <div className="flex items-center justify-center mx-auto font-semibold text-gray-500 bg-gray-50 rounded-full shadow-lg h-14 w-14 text-tiny">
              {tickerSymbol}
            </div>
          )}
          <div className="w-auto h-auto p-1 text-center">
            <div
              className={
                "text-2xl px-2 mx-1 rounded-full font-semibold w-full text-center inline-block"
              }
            >
              ${currentPrice?.toFixed(2)}
            </div>
            <div
              className={`${pnlBackgroundColor(
                monthlyPctChange
              )} text-black text-tiny sm:text-xs px-2 mx-1 mt-0 sm:mt-2 rounded-full font-semibold \
                w-full text-center`}
            >
              M: {monthlyPctChange?.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="inline-block w-full mt-2 ml-2 text-xs font-semibold tracking-wider text-gray-600 uppercase sm:mt-4 overflow-ellipsis">
          {tickerSymbol} &bull; {shortName}
        </div>
      </div>
    </div>
  )
}
