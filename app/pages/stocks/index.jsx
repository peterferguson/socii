import CardSlider from "@components/CardSlider"
import ChartCard from "@components/ChartCard/ChartCard"
import HorizontalAssetCard, {
  HorizontalAssetCardSkeleton,
} from "@components/HorizontalAssetCard"
import { useAuth } from "@hooks"
import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { getMainPageStocks } from "@lib/firebase/client/db/getMainPageStocks"
import { getPopularTickersDocs } from "@lib/firebase/client/db/getPopularTickersDocs"
import { fetchYahoo } from "@utils/fetchYahoo"
import { getTickerCategoryShortNames } from "@utils/getTickerCategoryShortNames"
import { getTickerProps } from "@utils/getTickerProps"
import { getTickersStaticProps } from "@utils/getTickersStaticProps"
import { iexQuote } from "@utils/iexQuote"
import { tw } from "@utils/tw"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

const beginLoadingMoreTickersNFromLast = 3

export default function StockDisplay({ tickers }) {
  // TODO: large screen vertical cards - small horizontal cards
  // TODO: Add skeleton loaders for chart cards on infinite scroll

  const { user } = useAuth()
  const [categories, setCategories] = useState({})

  // - For infinite scroll
  const [loadingMoreTickers, setLoadingMoreTickers] = useState(false)
  const moreTickers = useRef([])
  const lastTickerLoaded = useRef(null)
  const lastTickerRef = useRef(null)

  const entry = useIntersectionObserver(lastTickerRef, {})
  const isVisible = !!entry?.isIntersecting

  const is1Col = !useMediaQuery({ minWidth: 640 })
  const is2Cols = !useMediaQuery({ minWidth: 1024 })

  useEffect(() => getTickerCategoryShortNames().then(setCategories), [])

  useEffect(() => {
    const getMoreTickers = async () => {
      // - Next 5 alpaca stocks
      const numTickers = is1Col ? 5 : is2Cols ? 10 : 15
      const tickerDocs = await getMainPageStocks(lastTickerLoaded.current, numTickers)

      lastTickerLoaded.current = tickerDocs?.slice().pop()

      const tickers = await Promise.all(
        tickerDocs?.map(async (tickerDoc) => {
          const { tickerSymbol } = tickerDoc.data()
          const props = await getTickerProps(tickerDoc, null, null)

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
        <div className="w-full pt-6 text-3xl tracking-tight uppercase cursor-pointer font-primary text-brand-dark">
          Popular
        </div>
        <CardSlider tickers={tickers} />
        <Categories categories={categories} />
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
                  key={`${ticker?.tickerSymbol}`}
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
          <HorizontalAssetCardSkeleton
            cardRef={lastTickerRef}
            className={loadingMoreTickers ? "block" : "invisible"}
          />
          {/* REFACTOR */}
          {/* Compensate for the footer */}
          {is1Col && <div className="h-36"></div>}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  // try {
  //   const trendingTickers = await getYahooTrending()
  // } catch (e) {
  //   console.log(e)
  // }
  return await getTickersStaticProps({
    tickerDocs: await getPopularTickersDocs(),
    period: null,
    interval: null,
  })
}

const getYahooTrending = async () => {
  const trendingTickers = await fetchYahoo([], "get_trending")
  console.log(trendingTickers)
  return trendingTickers
}

const Categories = ({ categories }) => (
  <>
    <div className="w-full pt-6 text-3xl tracking-tight uppercase cursor-pointer font-primary text-brand-dark">
      Categories
    </div>
    <section
      className={tw(
        "flex p-4 overflow-x-scroll sm:no-scrollbar",
        "umami--drag--popular-stocks-category-card-slider"
      )}
    >
      {Object.entries(categories).map(([shortName, { emoji }], index) =>
        emoji ? (
          <Link key={`category-${index}`} href={`/stocks/categories/${shortName}`}>
            <a
              className={tw(
                "mx-1 rounded-2xl border border-gray-300 text-gray-600 h-28",
                "flex flex-col transition relative p-6 rounded-2xl bg-white",
                "clear-both"
              )}
            >
              <div className="flex items-center justify-center w-10 text-center rounded-full text-tiny">
                <div className="absolute flex items-center justify-center w-12 h-12 m-auto mt-3 text-lg rounded-full bg-gray-200/60">
                  {emoji}
                </div>
                <div className="absolute flex items-center justify-center text-xs bottom-2 inset-x-1 font-primary font-md">
                  {shortName}
                </div>
              </div>
            </a>
          </Link>
        ) : null
      )}
    </section>
    {/* TODO: This needs to be like lightyears collections */}
    {/* <section
  className={tw(
    "overflow-scroll grid grid-cols-8 sm:grid-cols-5 auto-rows-fr place-items-center sm:no-scrollbar space-x-1 space-y-2 sm:space-y-3"
    )}
    style={{ gridAutoFlow: "row dense" }}
    >
    {Object.entries(categories).map(([shortName, { emoji }], index) =>
    emoji ? (
      <Link key={`category-${index}`} href={`/stocks/categories/${shortName}`}>
      <a
      className={tw(
        "h-6 px-5 rounded-full border border-gray-300 text-gray-600",
        "flex items-center justify-center"
        )}
        >
        <div className="flex items-center justify-center flex-grow space-x-2 text-tiny">
        <span>{emoji}</span>
        <span>{shortName}</span>
        </div>
        </a>
        </Link>
        ) : null
        )}
      </section> */}
  </>
)
