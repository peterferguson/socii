import { logoUrl, pctChange, pnlBackgroundColor, pnlTextColor } from "@utils/helper"
import Link from "next/link"
import React, { useState } from "react"


export default function SmallAssetPctChangeCard({
  logoUrl,
  tickerSymbol,
  dailyPctChange,
  monthlyPctChange,
  shortName,
}) {
  // TODO: Market state with some nice symbols like sun & moon for open & closed plus info on last updated
  return (
    <div className="flex-none pt-4 pl-4 sm:pl-8">
      <div className="w-40 p-4 bg-white rounded-lg shadow-lg sm:w-52">
        <div className="items-center justify-center sm:flex">
          <img
            className="w-16 h-auto mx-auto rounded-full shadow-lg"
            src={logoUrl}
            alt={`${tickerSymbol} logo`}
          />
          <div className="w-auto h-auto p-2 text-center">
            <div
              className={`${pnlBackgroundColor(
                dailyPctChange
              )} text-black text-tiny sm:text-xs px-2 mx-1 rounded-full font-semibold \
              w-full text-center inline-block`}
            >
              D: {dailyPctChange?.toFixed(2)}%
            </div>
            <div
              className={`${pnlBackgroundColor(
                monthlyPctChange
              )} text-black text-tiny sm:text-xs px-2 mx-1 rounded-full font-semibold \
                w-full text-center hidden sm:inline-block`}
            >
              M: {monthlyPctChange?.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="inline-block w-full ml-2 text-xs font-semibold tracking-wider text-gray-600 uppercase overflow-ellipsis">
          {tickerSymbol} &bull; {shortName}
        </div>
      </div>
    </div>
  )
}

export function SmallAssetCard({
  logoUrl,
  tickerSymbol,
  currentPrice,
  monthlyPctChange,
  shortName,
  currencySymbol = "$",
}) {
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
            <div className="flex items-center justify-center mx-auto font-semibold text-gray-500 bg-gray-100 rounded-full shadow-lg h-14 w-14 text-tiny">
              {tickerSymbol}
            </div>
          )}
          <div className="w-auto h-auto p-1 text-center">
            <div
              className={
                "text-2xl px-2 mx-1 rounded-full font-semibold w-full text-center inline-block"
              }
            >
              {currencySymbol}
              {currentPrice?.toFixed(2)}
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
        <div className="inline-block w-full mt-2 ml-2 text-xs font-semibold tracking-wider text-gray-600 uppercase sm:mt-4 \ overflow-ellipsis">
          {tickerSymbol} &bull; {shortName}
        </div>
      </div>
    </div>
  )
}

export function AssetCard({ ticker, timeseries, sector }) {
  const pnlColor = pnlTextColor(
    pctChange(timeseries?.[0].close, timeseries[timeseries.length - 1].close)
  )
  const { tickerSymbol } = ticker
  const [logoNotFound, setLogoNotFound] = useState(false)
  return (
    <>
      <Link href={`/stocks/${tickerSymbol}`}>
        <a href={tickerSymbol}>
          <header className="flex mb-auto flex-nowrap">
            {!logoNotFound ? (
              <img
                className="mx-auto rounded-full shadow-lg h-14 w-14"
                src={logoUrl(ticker.ISIN)}
                alt={`${tickerSymbol} logo`}
                onError={() => setLogoNotFound(true)}
              />
            ) : (
              <div className="flex items-center justify-center mx-auto font-semibold text-gray-500 bg-gray-100 rounded-full shadow-lg h-14 w-14 text-tiny">
                {tickerSymbol}
              </div>
            )}
            <p className="p-2 truncate">{ticker.shortName}</p>
          </header>
        </a>
      </Link>
      <Link href={`/stocks/${tickerSymbol}`}>
        <div className="relative py-8 mx-3 align-middle grid grid-cols-none">
          <h1 className="text-xl font-bold">{tickerSymbol}</h1>

          <div className="bpx-border">
            <div className={`font-bold text-3xl ${pnlColor}`}>
              ${timeseries[timeseries.length - 1].close}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col pt-2 pb-4 mb-8 -mt-2 justify leading-8">
        <a
          className="h-8 px-3 font-bold text-gray-400 uppercase truncate align-middle border-2 w-36 text-tiny \ rounded-3xl"
          href={tickerSymbol}
        >
          {sector.sector}
        </a>
        <a
          className="h-8 px-3 font-bold text-gray-400 uppercase truncate align-middle border-2 w-36 text-tiny \ rounded-3xl"
          href={tickerSymbol}
        >
          {sector.industry}
        </a>
      </div>
    </>
  )
}

export function BlockCard({ ticker, timeseries }) {
  return (
    <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
      <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white rounded shadow-lg xl:mb-0">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative flex-1 flex-grow w-full max-w-full pr-4">
              <h5 className="text-xs font-bold uppercase text-blueGray-400">
                {ticker.tickerSymbol}
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
                  alt={`${ticker.tickerSymbol} logo`}
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
}
