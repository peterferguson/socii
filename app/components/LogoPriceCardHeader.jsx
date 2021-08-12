import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import React from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { TickerLogo } from "./TickerLogo"

export default function LogoPriceCardHeader({
  tickerSymbol,
  priceChange,
  price,
  shares,
  action,
  ISIN,
  className = "",
}) {
  const pnlBgColor = pnlBackgroundColor((100 * priceChange).toFixed(2))
  const pnlColors = `${pnlBgColor} ${pnlBgColor
    .replace("bg", "text")
    .replace("200", "500")}`
  return (
    <a className={className}>
      <TickerLogo tickerSymbol={tickerSymbol} isin={ISIN} />
      <div className="w-auto h-auto p-1 text-center">
        <div
          className={
            "text-xl px-2 mx-1 rounded-full font-semibold w-full text-center \
               inline-block font-primary mt-1 text-blueGray-500"
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
                  action.toLowerCase().includes("buy")
                    ? "text-teal-500"
                    : "text-red-400"
                }`}
              >
                {action.toUpperCase()} {shares} Shares &bull; ${price}
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
    </a>
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
