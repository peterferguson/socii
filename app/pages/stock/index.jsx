import CardSlider from "@components/CardSlider"
import ChartCard from "@components/ChartCard"
import { TradingViewStockTickerQuotes } from "@components/TradingViewChart"
import RightChevron from "@icons/rightChevron.svg"
import { firestore } from "@lib/firebase"
import { isBrowser, logoUrl, stockProps } from "@utils/helper"
import { useIntersectionObserver } from "@lib/hooks"
import Link from "next/link"
import React, { useRef, useEffect } from "react"

export default function StockDisplay({ tickerSymbols }) {
  // TODO: large screen vertical cards - small horizontal cards

  // - For infinite scroll

  const moreTickers = useRef([])
  const lastTickerLoaded = useRef(null)
  const lastTickerRef = useRef(null)

  const entry = useIntersectionObserver(lastTickerRef, {})
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    const getMoreTickers = async () => {
      const query = firestore
        .collection("tickers")
        .where("marketCountry", "==", "United States of America")
        .where("exchangeAbbreviation", "!=", "PNK")
        .orderBy("exchangeAbbreviation", "asc")
        .startAfter(lastTickerLoaded.current || 0)
        .limit(10)

      const tickerDocs = await query.get()

      lastTickerLoaded.current = tickerDocs.docs.slice(-1).pop()

      let { tickerSymbols: newSymbols } = await stockProps({ tickerDocs })
      moreTickers.current.push(newSymbols)
    }
    if (isVisible) getMoreTickers()
  }, [isVisible])

  // const tradingViewSymbols = {
  //   symbols: tickerSymbols.map(({ ticker }) => {
  //     return {
  //       proName: `${ticker.exchange}:${ticker.tickerSymbol}`,
  //       title: ticker.tickerSymbol,
  //     }
  //   }),
  // }

  return (
    <>
      <div className="flex flex-col">
        {isBrowser && (
          <>
            <TradingViewStockTickerQuotes />
            {/* <TradingViewStockTickerTape tickerSymbols={tradingViewSymbols} /> */}
          </>
        )}
      </div>
      <div>
        <Link href="/stock/popular">
          <div className="flex px-4 pt-8 mb-4 text-3xl font-bold uppercase cursor-pointer font-work-sans text-brand-dark">
            Popular Stocks
            <div className="flex-grow" />
            <RightChevron className="h-8 cursor-pointer mt-0.5" />
          </div>
        </Link>
        <CardSlider tickerSymbols={tickerSymbols} />
        <div className="flex flex-col items-center min-h-screen mt-8 bg-gray-50">
          {tickerSymbols
            .concat(moreTickers.current)
            .map(({ ticker, timeseries }, i) => {
              const isLastTicker =
                i === tickerSymbols.concat(moreTickers.current).length - 1
              return (
                <ChartCard
                  key={ticker.tickerSymbol}
                  cardRef={isLastTicker ? lastTickerRef : null}
                  logoUrl={logoUrl(ticker.ISIN)}
                  tickerSymbol={ticker.tickerSymbol}
                  shortName={ticker.shortName}
                  data={timeseries}
                />
              )
            })}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  // * Get ticker name from firestore
  const tickerQuery = firestore.collection("tickers").where("isPopular", "==", true)
  return await stockProps({ tickerQuery, subQueryField: "industry" })
}
