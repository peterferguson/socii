import CardSlider from "@components/CardSlider"
import ChartCard from "@components/ChartCard/ChartCard"
import HorizontalAssetCard, {
  HorizontalAssetCardSkeleton,
} from "@components/HorizontalAssetCard"
import { useAuth } from "@hooks"
import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { getMainPageStocks } from "@lib/firebase/client/db/getMainPageStocks"
import { getPopularTickersDocs } from "@lib/firebase/client/db/getPopularTickersDocs"
import { getTickerProps } from "@utils/getTickerProps"
import { getTickersStaticProps } from "@utils/getTickersStaticProps"
import { iexQuote } from "@utils/iexQuote"
import React, { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

const beginLoadingMoreTickersNFromLast = 3

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

      lastTickerLoaded.current = tickerDocs.docs
        ?.slice(
          -beginLoadingMoreTickersNFromLast,
          -beginLoadingMoreTickersNFromLast + 1
        )
        .pop()

      const tickers = await Promise.all(
        tickerDocs.docs?.map(async (tickerDoc) => {
          const { tickerSymbol } = tickerDoc.data()
          const props = await getTickerProps(tickerDoc)

          const price = tickerSymbol
            ? await iexQuote(tickerSymbol, user?.token)
            : undefined
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
        <div className="w-full pt-6 text-3xl tracking-tight text-center uppercase cursor-pointer font-primary text-brand-dark">
          Popular
        </div>
        <CardSlider tickers={tickers} />
        {/* TODO: Charts are not resizing on container change */}
        <div className="content-center w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {tickers
            .concat(moreTickers.current)
            .map(({ ticker, timeseries, price }, i) => {
              const loadNewTickers =
                i ===
                tickers.concat(moreTickers.current).length -
                  beginLoadingMoreTickersNFromLast
              return !timeseries?.length ? (
                <HorizontalAssetCard
                  key={`${ticker?.tickerSymbol}-${i}`}
                  cardRef={null}
                  isin={ticker?.ISIN}
                  tickerSymbol={ticker?.tickerSymbol}
                  shortName={ticker?.shortName}
                  logoColor={ticker?.logoColor}
                  price={price}
                />
              ) : (
                <ChartCard
                  key={`${ticker?.tickerSymbol}-${i}`}
                  cardRef={loadNewTickers ? lastTickerRef : null}
                  ISIN={ticker?.ISIN}
                  tickerSymbol={ticker?.tickerSymbol}
                  shortName={ticker?.shortName}
                  data={timeseries}
                />
              )
            })}
          <HorizontalAssetCardSkeleton cardRef={lastTickerRef} />
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
    timeseriesLimit: 0,
    subQueryField: "industry",
  })
}
