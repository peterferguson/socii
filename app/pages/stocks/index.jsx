import CardSlider from "@components/CardSlider"
import ChartCard from "@components/ChartCard"
import { useAuth } from "@hooks"
import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { getPopularTickersDocs } from "@lib/firebase/client/db/getPopularTickersDocs"
import { getMainPageStocks } from "@lib/firebase/client/db/getMainPageStocks"
import { getTickerProps } from "@utils/getTickerProps"
import { getTickersStaticProps } from "@utils/getTickersStaticProps"
import { iexQuote } from "@utils/iexQuote"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { FiChevronRight } from "react-icons/fi"
import { useMediaQuery } from "react-responsive"

export default function StockDisplay({ tickers }) {
  // TODO: large screen vertical cards - small horizontal cards
  // TODO: Add skeleton loaders for chart cards on infinite scroll

  const { user } = useAuth()

  // - For infinite scroll
  const [loadingMoreTickers, setLoadingMoreTickers] = useState(false)
  const moreTickers = useRef([])
  const lastTickerLoaded = useRef(null)
  const lastTickerRef = useRef(null)

  const entry = useIntersectionObserver(lastTickerRef, {})
  const isVisible = !!entry?.isIntersecting

  const is1Col = !useMediaQuery({ minWidth: 640 })
  const is2Cols = !useMediaQuery({ minWidth: 1024 })

  useEffect(() => {
    const getMoreTickers = async () => {
      // - Next 5 alpaca stocks
      const numTickers = is1Col ? 5 : is2Cols ? 10 : 15
      const tickerDocs = await getMainPageStocks(lastTickerLoaded.current, numTickers)

      lastTickerLoaded.current = tickerDocs.docs?.slice(-1).pop()

      const tickers = await Promise.all(
        tickerDocs.docs?.map(async (tickerDoc) => {
          const { tickerSymbol } = tickerDoc.data()
          const props = await getTickerProps(tickerDoc)
          const price = await iexQuote(tickerSymbol, user?.token)
          return { ...props, price }
        })
      )

      moreTickers.current.push(...tickers.filter((ticker) => !!ticker))
      setLoadingMoreTickers(false)
    }
    if (isVisible) {
      setLoadingMoreTickers(true)
      getMoreTickers()
      lastTickerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, user?.token])

  return (
    // TODO: Create our own version of this Ticker Tape banner
    <>
      <main className="flex flex-wrap flex-grow w-full sm:w-[calc(100vw-560px)] h-[calc(100vh-120px)]">
        <Link href="/stocks/popular">
          <div className="flex px-4 pt-8 mb-4 text-3xl font-bold uppercase cursor-pointer font-secondary text-brand-dark">
            Popular Stocks
            <div className="flex-grow" />
            <FiChevronRight className="h-8 cursor-pointer mt-0.5" />
          </div>
        </Link>
        <CardSlider tickers={tickers} />
        {/* TODO: Charts are not resizing on container change */}
        <div className="content-center w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {tickers.concat(moreTickers.current).map(({ ticker, timeseries }, i) => {
            const isLastTicker = i === tickers.concat(moreTickers.current).length - 1
            return (
              <ChartCard
                key={`${ticker?.tickerSymbol}-${i}`}
                cardRef={isLastTicker ? lastTickerRef : null}
                ISIN={ticker?.ISIN}
                tickerSymbol={ticker?.tickerSymbol}
                shortName={ticker?.shortName}
                data={timeseries}
              />
            )
          })}
          {/* REFACTOR */}
          {/* Compensate for the footer */}
          {is1Col && <div className="h-36"></div>}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  return await getTickersStaticProps({
    tickerDocs: await getPopularTickersDocs(),
    subQueryField: "industry",
  })
}
