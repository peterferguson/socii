import React from "react"
import TickerLogo from "./TickerLogo"

const StockGallery = ({ tickers }) => (
  <div className="items-center justify-center w-full m-0 overflow-y-scroll grid grid-cols-2 space-x-4 no-scrollbar">
    {tickers.map(({ tickerSymbol }, i) => (
      <StockGalleryCard key={`ticker-gallery-card-${i}`} tickerSymbol={tickerSymbol} />
    ))}
  </div>
)

const StockGalleryCard = ({ tickerSymbol }) => (
  <div className="relative flex flex-col justify-between object-cover object-center w-11/12 h-56 my-2 overflow-hidden text-gray-800 bg-white bg-cover shadow-md cursor-pointer rounded-2xl">
    <div className="absolute inset-x-0 z-0 inset-y-8">
      <TickerLogo tickerSymbol={tickerSymbol} height="72" width="72" />
    </div>
    <div className="relative flex flex-row items-end w-full h-72">
      <div className="absolute top-0 right-0 m-2">
        {/* TODO Update this to outline star if not favorited */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-1 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      </div>
      <div className="z-10 flex flex-col w-full p-6 rounded-lg">
        <h4 className="mt-1 text-xl font-semibold leading-tight truncate">
          Tesla Inc.
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="flex items-center text-sm font-normal text-gray-300">
              ${tickerSymbol}
            </h2>
          </div>
        </div>
        <div className="flex pt-4 text-sm text-gray-300 font-primary">
          <div className="flex items-center font-medium tracking-wide">
            $1800
            <span className="font-normal text-gray-300 text-tiny">(-3.00%)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default StockGallery
