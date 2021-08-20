import Link from "next/link"
import React from "react"
import TickerLogo from "./TickerLogo"

interface IStockCard {
  holding: any
  latestPrice: number
  index: number
}

export default function StockCard({ holding, latestPrice, index }: IStockCard) {
  const tickerSymbol = holding.tickerSymbol
  const pnl = (100 * (latestPrice - holding.avgPrice)) / latestPrice

  return (
    <li
      className={`relative h-auto m-1 ${
        index !== 0 ? "border-t border-gray-200 mt-2" : ""
      } `}
    >
      <div className="flex p-2 bg-white">
        <Link href={`/stocks/${tickerSymbol}`}>
          <div className="flex items-center justify-center flex-none flex-grow-0 mr-3 rounded-full cursor-pointer">
            <TickerLogo tickerSymbol={tickerSymbol} height="40" width="40" />
          </div>
        </Link>
        <div className="items-center flex-grow-0 pt-1 pr-4 min-w-[70px]">
          <div className="text-base font-extrabold tracking-wider uppercase text-brand-shade-darkest font-primary">
            {tickerSymbol}
          </div>
          <div className="overflow-hidden font-thin tracking-wider uppercase text-brand-shade-darkest text-tiny">
            {holding.shortName}
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="flex flex-col items-center justify-center flex-grow-0 w-20 mr-4">
          {/* <div className="overflow-hidden font-semibold text-gray-600 text-tiny overflow-ellipsis">
            {latestPrice ? (
              `${round(holding.qty, 4)} Shares`
            ) : (
              <div className="w-12 bg-gray-200 animate-pulse"></div>
            )}
          </div> */}
          <div className="overflow-hidden text-base font-semibold tracking-wider text-black uppercase overflow-ellipsis">
            {latestPrice ? (
              `$${(latestPrice * holding.qty).toFixed(2)}`
            ) : (
              <div className="w-12 bg-gray-200 animate-pulse"></div>
            )}
          </div>
          <div
            className={`${
              pnl > 0 ? "bg-teal-200" : pnl < 0 ? "bg-red-200" : "bg-brand"
            } text-gray-700 text-tiny sm:text-xs px-2 rounded-full font-semibold w-full text-center inline-block`}
          >
            {pnl.toFixed(2)}%
          </div>
        </div>
      </div>
    </li>
  )
}

export function StockCardSkeleton() {
  return (
    <div className="flex h-auto m-1">
      <div className="flex h-20 p-2 bg-white rounded-lg shadow-2xl w-88 sm:w-96">
        <div className="justify-center flex-none w-20 mx-auto rounded-full">
          <div className="w-10 h-10 mx-auto bg-gray-200 rounded-full shadow-lg animate-pulse" />
          <div className="w-8 h-3 mx-auto my-2 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex-grow w-80"></div>
        <div className="flex flex-col items-center justify-center w-20">
          <div className="w-12 h-3 px-2 mx-auto my-2 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-12 h-3 mx-auto my-2 bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
