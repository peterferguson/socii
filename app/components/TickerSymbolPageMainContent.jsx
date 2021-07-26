import { Chart, PriceCard } from "@components/index"
import { tailwindColorMap } from "@lib/constants"
import { pctChange } from "@utils/pctChange"
import { pnlTextColor } from "@utils/pnlTextColor"
import React, { useEffect, useState } from "react"

export default function TickerSymbolPageMainContent({
  ticker,
  timeseries,
  tickerLogoUrl,
  investHandler,
}) {
  const tickerSymbol = ticker?.tickerSymbol

  const [crosshairIndexValue, setCrosshairIndexValue] = useState(0)
  const [gainColor, setGainColor] = useState("text-gray-400")

  const latestClose = timeseries?.[0]?.y
  const highlightedClose = timeseries[crosshairIndexValue]?.y
  let movingMonthlyClose = highlightedClose

  try {
    movingMonthlyClose = timeseries[crosshairIndexValue + 21]?.y
  } catch (err) {
    console.log(err)
  }

  const movingMonthlyPctChange = pctChange(highlightedClose, movingMonthlyClose)

  const lastMonthPctChange = pctChange(latestClose, timeseries[21]?.y)

  // * Show the pct change of highlighted value versus today
  const highlightedChange = pctChange(latestClose, highlightedClose).toFixed(2)

  const tickerProps = {
    logoUrl: tickerLogoUrl,
    tickerSymbol: tickerSymbol,
    shortName: ticker.shortName,
    currentPrice: latestClose,
    movingMonthlyPctChange: movingMonthlyPctChange,
  }

  useEffect(() => {
    setGainColor(tailwindColorMap[pnlTextColor(lastMonthPctChange)])
  }, [lastMonthPctChange])

  return (
    <>
      <div className="flex flex-col w-full sm:flex-row">
        {/* <SmallAssetCard {...tickerProps} /> */}
        <div className="flex-none pt-4 pl-0 sm:pl-8 ">
          <PriceCard
            {...tickerProps}
            movingMonthlyPctChange={lastMonthPctChange}
            gainColor={gainColor}
          />
        </div>
        <div className="flex-grow hidden sm:block" />
        <div className="flex-grow px-4 sm:flex-none sm:pl-8">
          {/* log for tailwind jit compiler  */}
          <div
            style={{ "background-color": ticker.logoColor }}
            className="mx-0 mt-4 mb-0 text-center btn btn-transition"
            onClick={() => investHandler()}
          >
            <span className="z-10 w-12 h-4 text-4xl">Invest</span>
          </div>
        </div>
      </div>
      <Chart
        color={ticker?.logoColor}
        timeseries={timeseries}
        crosshairIndexValue={crosshairIndexValue}
        setCrosshairIndexValue={setCrosshairIndexValue}
        highlightedChange={highlightedChange}
        highlightedClose={highlightedClose}
      />
    </>
  )
}
