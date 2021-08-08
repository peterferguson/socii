import { pctChange } from "@utils/pctChange"
import Link from "next/link"
import React, { useState } from "react"
import { ChartCardChartDynamic } from "./ChartCardChart.dynamic"
import { TickerLogo } from "./TickerLogo"

export default function ChartCard({ cardRef, ISIN, tickerSymbol, shortName, data }) {
  const closeDelta = pctChange(data?.[0].close, data?.[data.length - 1].close)

  const pnlColor =
    closeDelta > 0 ? "bg-teal-200" : closeDelta < 0 ? "bg-red-200" : "bg-brand"

  return (
    <div
      ref={cardRef ? cardRef : null}
      className="w-11/12 h-auto max-w-sm mx-auto my-2"
    >
      <div className="flex h-20 p-2 overflow-hidden bg-white rounded-lg shadow-2xl">
        <div className="justify-center flex-none w-20 mx-auto rounded-full">
          <Link href={`stocks/${tickerSymbol}`}>
            <TickerLogo
              isin={ISIN}
              tickerSymbol={tickerSymbol}
              height="40"
              width="40"
            />
          </Link>
          <Link href={`stocks/${tickerSymbol}`}>
            <a>
              <div className="font-semibold tracking-wider text-center text-gray-600 uppercase text-tiny">
                {shortName}
              </div>
            </a>
          </Link>
          <Link href={`stocks/${tickerSymbol}`}>
            <a>
              <div className="font-semibold tracking-wider text-center text-gray-600 uppercase text-tiny">
                {tickerSymbol}
              </div>
            </a>
          </Link>
        </div>
        <ChartCardChartDynamic data={data} pnlColor={pnlColor} />
        <div className="flex flex-col items-center justify-center w-20">
          <div className="overflow-hidden text-sm font-semibold tracking-wider text-gray-600 uppercase overflow-ellipsis">
            ${data?.[0].close}
          </div>
          <div
            className={`${pnlColor} text-black text-tiny sm:text-xs px-2 rounded-full font-semibold w-full text-center inline-block`}
          >
            M: {closeDelta.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  )
}
