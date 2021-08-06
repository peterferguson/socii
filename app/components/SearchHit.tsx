import { useTickerPrice } from "@hooks"
import Link from "next/link"
import React, { useState } from "react"
import { Loading } from "./SearchResultsModal"
import { TickerLogo } from "./TickerLogo"

export const SearchHit = ({ hit }) => {
  const [loadingTicker, setLoadingTicker] = useState(false)

  const { price } = useTickerPrice(hit.tickerSymbol)

  const hitClickHandler = () => setLoadingTicker(!loadingTicker)

  return (
    <>
      <Link href={`/stocks/${hit.tickerSymbol}`}>
        <a onClick={hitClickHandler}>
          {loadingTicker && <Loading show={loadingTicker} className="z-50" />}
          <div className="flex pt-4">
            <TickerLogo
              tickerSymbol={hit.tickerSymbol}
              isin={hit.ISIN}
              className="absolute -top-4 -left-4"
            />
            <div className="flex-1 text-xl text-gray-900">{hit.tickerSymbol}</div>
            {price ? (
              <p className="inline text-base text-right text-green-400">
                $ {price?.latestPrice}
              </p>
            ) : (
              <div className="w-16 h-6 mx-auto mb-4 bg-gray-200 rounded-sm animate-pulse" />
            )}
          </div>
          <div className="flex">
            <p className="flex-1 text-base text-gray-600">{hit.longName}</p>
            {price ? (
              <p className={"inline text-base text-right text-red-400"}>
                {(100 * price?.changePercent).toFixed(2)}%
              </p>
            ) : (
              <div className="w-16 h-6 mx-auto mb-4 bg-gray-200 rounded-sm animate-pulse" />
            )}
          </div>
        </a>
      </Link>
    </>
  )
}
