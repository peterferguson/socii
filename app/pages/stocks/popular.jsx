import { AssetCard } from "@components/AssetCards"
import { getTickersStaticProps } from "@utils/getTickersStaticProps"
import { getPopularTickersDocs } from "@lib/firebase/client/db"
import React from "react"

export default Popular

// TODO: on click of chevron create a new view with only the popular stocks
// TODO: large screen vertical cards - small horizontal cards
const Popular = ({ tickers }) => (
  <div>
    <div className="flex items-center justify-center mx-auto h-80 bg-gradient-to-r from-teal-400 to-brand">
      <div className="flex px-4 pt-4 m-12 text-6xl font-bold text-center uppercase font-secondary text-gray-50">
        Popular Stocks
      </div>
    </div>
    <div className="flex flex-wrap items-center justify-center -mt-16">
      <div className="flex flex-wrap items-center justify-center min-h-screen">
        {tickers.map(({ ticker, queryData, price }, i) => (
          <div
            key={`popular-ticker-${i}`}
            className="flex flex-col p-4 mx-auto my-4 bg-white rounded-lg shadow-lg w-88 sm:w-64"
          >
            <AssetCard
              tickerSymbol={ticker.tickerSymbol}
              logoUrl={ticker.logoUrl}
              shortName={ticker.shortName}
              price={price}
              sectorData={queryData}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export async function getStaticProps() {
  return await getTickersStaticProps({
    tickerDocs: await getPopularTickersDocs(),
    subQueryField: "industry",
    timeseriesLimit: 2,
  })
}
