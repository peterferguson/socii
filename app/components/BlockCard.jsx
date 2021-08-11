import { logoUrl } from "@utils/logoUrl"
import React from "react"

export const BlockCard = ({ ticker, timeseries }) => (
  <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white rounded shadow-lg xl:mb-0">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative flex-1 flex-grow w-full max-w-full pr-4">
            <h5 className="text-xs font-bold uppercase text-blueGray-400">
              {ticker?.tickerSymbol}
            </h5>
            <span className="text-xl font-semibold text-blueGray-700">
              ${timeseries[timeseries.length - 1].close}
            </span>
          </div>
          <div className="relative flex-initial w-auto pl-4">
            <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-red-500 rounded-full shadow-lg">
              <img
                className="flex-none w-12 rounded"
                src={logoUrl(ticker.ISIN)}
                alt={`${ticker?.tickerSymbol} logo`}
              />
              <p className="p-2 truncate">{ticker.shortName}</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-blueGray-400">
          <span className="mr-2 text-emerald-500">
            <i className="fas fa-arrow-up"></i> 3.48%
          </span>
          <span className="whitespace-nowrap">Since last month</span>
        </p>
      </div>
    </div>
  </div>
)
