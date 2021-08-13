import { Price } from "@models/Price"
import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import Link from "next/link"
import React from "react"
import { TickerLogo } from "./TickerLogo"

interface IHorizontalAssetCard {
  cardRef?: React.MutableRefObject<any>
  isin: string
  logoColor: string
  tickerSymbol: string
  shortName: string
  price: Price
}

const HorizontalAssetCard = ({
  cardRef,
  isin,
  tickerSymbol,
  logoColor,
  shortName,
  price,
}: IHorizontalAssetCard) => {
  const pnlColor = pnlBackgroundColor(price?.changePercent)

  return (
    <div
      ref={cardRef ? cardRef : null}
      className="w-11/12 h-auto max-w-sm mx-auto my-2"
    >
      <div className="flex h-20 p-2 overflow-hidden bg-white rounded-lg shadow-2xl">
        <div className="items-center justify-center flex-none w-20 m-auto rounded-full">
          <Link href={`stocks/${tickerSymbol}`}>
            <TickerLogo
              isin={isin}
              tickerSymbol={tickerSymbol}
              height="48"
              width="48"
            />
          </Link>
        </div>
        <div className="flex-col flex-grow my-auto">
          <Link href={`stocks/${tickerSymbol}`}>
            <a
              className="text-sm font-extrabold tracking-wider text-gray-400 uppercase font-primary"
              style={{ color: logoColor }}
            >
              {tickerSymbol}
            </a>
          </Link>
          <Link href={`stocks/${tickerSymbol}`}>
            <a className="flex text-xs tracking-wider text-gray-600 font-primary">
              {shortName}
            </a>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-20">
          <div className="overflow-hidden text-sm font-semibold tracking-wider text-gray-600 uppercase overflow-ellipsis">
            ${(price?.iexRealtimePrice || price?.latestPrice)?.toFixed(2)}
          </div>
          <div
            className={`${pnlColor} text-black text-tiny sm:text-xs px-2 rounded-full font-semibold w-full text-center inline-block`}
          >
            M: {(price?.changePercent * 100)?.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default HorizontalAssetCard
