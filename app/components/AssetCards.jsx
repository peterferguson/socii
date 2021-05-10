import { pnlBackgroundColor, pctChange, pnlTextColor } from "@utils/helper";
import Link from "next/link";

export default function SmallAssetPctChangeCard({
  logoUrl,
  tickerSymbol,
  dailyPctChange,
  monthlyPctChange,
  shortName,
}) {
  // TODO: Market state with some nice symbols like sun & moon for open & closed plus info on last updated
  return (
    <div className="flex-none pl-4 sm:pl-8 pt-4 bg-gray-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-40 sm:w-52">
        <div className="items-center justify-center sm:flex">
          <img
            className="shadow-lg rounded-full h-auto w-16 mx-auto"
            src={logoUrl}
            alt={`${tickerSymbol} logo`}
          />
          <div className="p-2 h-auto w-auto text-center">
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
        <div
          className="ml-2 text-gray-600 uppercase text-xs w-full inline-block \
                font-semibold tracking-wider overflow-ellipsis overflow-hidden"
        >
          {tickerSymbol} &bull; {shortName}
        </div>
      </div>
    </div>
  );
}

export function SmallAssetCard({
  logoUrl,
  tickerSymbol,
  currentPrice,
  monthlyPctChange,
  shortName,
  currencySymbol = "$",
}) {
  // TODO: Market state with some nice symbols like sun & moon for open & closed plus info on last updated
  return (
    <div className="flex-none pl-4 sm:pl-8 pt-4 bg-gray-50">
      <div className="bg-white p-4 rounded-lg shadow-lg h-full sm:h-36 w-40 sm:w-52">
        <div className="items-center justify-center sm:flex">
          <img
            className="shadow-lg rounded-full h-auto w-14 mx-auto"
            src={logoUrl}
            alt={`${tickerSymbol} logo`}
          />
          <div className="p-1 h-auto w-auto text-center">
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
        <div
          className="ml-2 mt-2 sm:mt-4 text-gray-600 uppercase text-xs w-full inline-block \
                font-semibold tracking-wider overflow-ellipsis"
        >
          {tickerSymbol} &bull; {shortName}
        </div>
      </div>
    </div>
  );
}

export function AssetCard({ ticker, timeseries, sector }) {
  const pnlColor = pnlTextColor(
    pctChange(timeseries[0].close, timeseries[timeseries.length - 1].close)
  );
  return (
    <>
      <Link href={`/stock/${ticker.tickerSymbol}`}>
        <a href={ticker.tickerSymbol}>
          <header className="flex flex-nowrap mb-auto">
            <img
              className="flex-none w-12 rounded"
              src={ticker.logoUrl}
              alt={`${ticker.tickerSymbol} logo`}
            />
            <p className="truncate p-2">{ticker.shortName}</p>
          </header>
        </a>
      </Link>
      <Link href={`/stock/${ticker.tickerSymbol}`}>
        <div className="py-8 mx-3 grid align-middle relative grid-cols-none">
          <h1 className="font-bold text-xl">{ticker.tickerSymbol}</h1>

          <div className="bpx-border">
            <div className={`font-bold text-3xl ${pnlColor}`}>
              ${timeseries[timeseries.length - 1].close}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify -mt-2 mb-8 pt-2 pb-4 leading-8">
        <a
          className="font-bold w-36 h-8 align-middle text-tiny truncate text-gray-400 \
                     uppercase border-2 rounded-3xl px-3"
          href={ticker.tickerSymbol}
        >
          {sector.sector}
        </a>
        <a
          className="font-bold w-36 h-8 align-middle text-tiny truncate text-gray-400 \
                     uppercase border-2 rounded-3xl px-3"
          href={ticker.tickerSymbol}
        >
          {sector.industry}
        </a>
      </div>
    </>
  );
}

export function BlockCard({ ticker, timeseries }) {
  return (
    <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {ticker.tickerSymbol}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                ${timeseries[timeseries.length - 1].close}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                <img
                  className="flex-none w-12 rounded"
                  src={ticker.logoUrl}
                  alt={`${ticker.tickerSymbol} logo`}
                />
                <p className="truncate p-2">{ticker.shortName}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <span className="text-emerald-500 mr-2">
              <i className="fas fa-arrow-up"></i> 3.48%
            </span>
            <span className="whitespace-nowrap">Since last month</span>
          </p>
        </div>
      </div>
    </div>
  );
}
