import CardSlider from "@components/CardSlider"
import ChartCard from "@components/ChartCard"
import { firestore } from "@lib/firebase"
import { useIntersectionObserver } from "@lib/hooks"
import { logoUrl, stockProps } from "@utils/helper"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { FiChevronRight } from "react-icons/fi"
import { useMediaQuery } from "react-responsive"

export default function StockDisplay({ tickerSymbols }) {
  // TODO: large screen vertical cards - small horizontal cards
  // TODO: Add skeleton loaders for chart cards on infinite scroll

  // - For infinite scroll

  const [loadingMoreTickers, setLoadingMoreTickers] = useState(false)
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
        .limit(5)

      const tickerDocs = await query.get()

      lastTickerLoaded.current = tickerDocs.docs.slice(-1).pop()

      let {
        props: { tickerSymbols },
      } = await stockProps({ tickerDocs })
      moreTickers.current.push(...tickerSymbols)
      setLoadingMoreTickers(false)
    }
    if (isVisible) {
      setLoadingMoreTickers(true)
      getMoreTickers()
      lastTickerRef.current = null
    }
  }, [isVisible])

  // const tradingViewSymbols = {
  //   symbols: tickerSymbols.map(({ ticker }) => {
  //     return {
  //       proName: `${ticker.exchange}:${ticker.tickerSymbol}`,
  //       title: ticker.tickerSymbol,
  //     }
  //   }),
  // }
  const is1Col = !useMediaQuery({ minWidth: 640 })

  return (
    // TODO: Create our own version of this Ticker Tape banner
    <main className="flex flex-wrap flex-grow w-full sm:w-[calc(100vw-560px)] h-[calc(100vh-120px)]">
      {/* <div className="flex flex-col">
        {isBrowser && <TradingViewStockTickerTape tickerSymbols={tradingViewSymbols} />}
        {isBrowser && <TradingViewStockTickerQuotes />}
      </div> */}

      <Link href="/stocks/popular">
        <div className="flex px-4 pt-8 mb-4 text-3xl font-bold uppercase cursor-pointer font-work-sans text-brand-dark">
          Popular Stocks
          <div className="flex-grow" />
          <FiChevronRight className="h-8 cursor-pointer mt-0.5" />
        </div>
      </Link>
      <CardSlider tickerSymbols={tickerSymbols} />
      {/* TODO: Charts are not resizing on container change */}
      <div className="content-center w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {tickerSymbols.concat(moreTickers.current).map(({ ticker, timeseries }, i) => {
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
        {/* Compensate for the footer */}
        {is1Col && <div className=" h-36"></div>}
      </div>
    </main>
  )
}

export async function getStaticProps(context) {
  // * Get ticker name from firestore
  const tickerQuery = firestore.collection("tickers").where("isPopular", "==", true)
  return await stockProps({ tickerQuery, subQueryField: "industry" })
}
