import React from "react"
import PctChangeTag from "./PctChangeTag"
import TickerLogo from "./TickerLogo"

interface ILogoHeader {
  tickerSymbol: string
  price: number | string
  shares: number | string
  action: string
  priceChange?: number
  ISIN?: string
  className?: string
}

export default function LogoPriceCardHeader({
  tickerSymbol,
  priceChange,
  price,
  shares,
  action,
  ISIN,
  className = "",
}: ILogoHeader) {
  return (
    <>
      <TickerLogo tickerSymbol={tickerSymbol} isin={ISIN} />
      <a className={className}>
        <div className="w-auto h-auto p-1 text-center">
          <div
            className={
              "text-xl px-2 mx-1 rounded-full font-semibold w-full text-center \
               inline-block font-primary mt-1 text-gray-500"
            }
          >
            {!shares ? (
              <>
                {tickerSymbol} &bull; ${price}
              </>
            ) : (
              <>
                <div>{tickerSymbol}</div>
                <div
                  className={`${
                    action?.toLowerCase().includes("buy")
                      ? "text-teal-500"
                      : "text-red-400"
                  }`}
                >
                  {action?.toUpperCase()} {shares} Shares &bull; ${price}
                </div>
              </>
            )}
          </div>
          {priceChange && <PctChangeTag pctChange={priceChange} />}
        </div>
      </a>
    </>
  )
}
