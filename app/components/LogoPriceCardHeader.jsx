import { pnlBackgroundColor, currencyFormatter, logoUrl } from "@utils/helper"

import router from "next/router"
import React, { useEffect, useRef } from "react"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

export default function LogoPriceCardHeader({
  tickerSymbol,
  tickerState,
  className = "",
}) {
  const { priceChange, price, assetCurrency, shares, action } = tickerState || {}
  const pnlBgColor = pnlBackgroundColor((100 * priceChange).toFixed(2))
  const pnlColors = `${pnlBgColor} ${pnlBgColor
    .replace("bg", "text")
    .replace("200", "700")}`
  return (
    <div className={`cursor-pointer ${className}`}>
      <TickerLogo tickerSymbol={tickerSymbol} />
      <div className="w-auto h-auto p-1 text-center">
        <div
          className={
            "text-xl px-2 mx-1 rounded-full font-semibold w-full text-center \
               inline-block font-poppins mt-1 text-blueGray-500"
          }
        >
          {!shares ? (
            <>
              {tickerSymbol} &bull; {currencyFormatter(price, assetCurrency)}
            </>
          ) : (
            <>
              <div>{tickerSymbol}</div>
              <div
                className={`${
                  action.toLowerCase().includes("buy")
                    ? "text-teal-500"
                    : "text-red-400"
                }`}
              >
                {action.toUpperCase()} {shares} Shares &bull;
                {currencyFormatter(price, assetCurrency)}
              </div>
            </>
          )}
        </div>
        {priceChange && (
          <PriceChangeTag
            price={price}
            pnlColors={pnlColors}
            priceChange={priceChange}
          />
        )}
      </div>
    </div>
  )
}

function TickerLogo({ tickerSymbol }) {
  const logo = useRef(null)

  useEffect(() => {
    const getLogo = async () => {
      logo.current = await logoUrl(tickerSymbol)
    }
    getLogo()
  }, [tickerSymbol])

  return (
    <img
      className="h-auto mx-auto rounded-full shadow-lg w-14"
      src={logo.current}
      alt={`${tickerSymbol} logo`}
      onClick={() => router.push(`/stock/${tickerSymbol}`)}
    />
  )
}

function PriceChangeTag({ priceChange, pnlColors, price }) {
  return (
    <>
      {(priceChange !== null || !priceChange !== undefined) && (
        <div
          className={`ml-1 ${pnlColors} text-xs font-semibold inline-block py-1 px-2 rounded-full uppercase mt-1`}
        >
          <div className="flex flex-row items-center justify-between">
            {priceChange > 0 ? <FaArrowUp /> : price < 0 ? <FaArrowDown /> : null}
            <span className="ml-0.5">{(100 * priceChange).toFixed(2)}%</span>
          </div>
        </div>
      )}
    </>
  )
}
