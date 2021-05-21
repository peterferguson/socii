import { AssetCard, BlockCard } from '@components/AssetCards'
import { firestore } from '@lib/firebase'
import { stockProps } from '@utils/helper'

export default function Popular({ tickerSymbols }) {
  // TODO: on click of chevron create a new view with only the popular stocks
  // TODO: large screen vertical cards - small horizontal cards
  return (
    <div>
      <div className="flex items-center justify-center mx-auto h-80 bg-gradient-to-r from-teal-400 to-brand-light">
        <div className="flex px-4 pt-4 m-12 text-6xl font-bold text-center uppercase font-work-sans text-gray-50">
          Popular Stocks
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center -mt-16">
        <div className="flex flex-wrap items-center justify-center min-h-screen">
          {tickerSymbols.map(({ ticker, timeseries, sector }) => {
            return (
              <>
                <div className="flex flex-col p-4 mx-auto my-4 bg-white rounded-lg shadow-lg w-88 sm:w-64">
                  <AssetCard ticker={ticker} timeseries={timeseries} sector={sector} />
                </div>
                {/* <BlockCard
                  ticker={ticker}
                  timeseries={timeseries}
                  sector={sector}
                /> */}
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  // * Get ticker name from firestore
  const tickerQuery = firestore.collection('tickers').where('isPopular', '==', true)

  return await stockProps(tickerQuery, 'industry', 2)
}
