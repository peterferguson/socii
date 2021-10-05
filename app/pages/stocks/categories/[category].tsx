import HorizontalAssetCard, {
  HorizontalAssetCardSkeleton,
} from "@components/HorizontalAssetCard"
import { useAuth } from "@hooks"
import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { getTickerDocs } from "@lib/firebase/client/db/getTickerDocs"
import { Price } from "@models/Price"
import { getTickerCategoryShortNames } from "@utils/getTickerCategoryShortNames"
import { getTickerProps } from "@utils/getTickerProps"
import { getTickersStaticProps, TickersProps } from "@utils/getTickersStaticProps"
import { iexQuote } from "@utils/iexQuote"
import { GetStaticPaths, GetStaticProps } from "next"
import React, { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "react-responsive"

interface CategoryTickerProps extends TickersProps {
  category: string
  restOfTickers: string[]
}

// TODO: Add overall industry/category performance for comparison purposes
// TODO: Refactor the infinite scrolling stock card loading on all pages
const CategoryPage: React.FC<CategoryTickerProps> = ({
  tickers,
  category,
  restOfTickers,
}) => {
  const { user } = useAuth()
  // - For infinite scroll
  // FIXME: Could be refactored as a hook
  const is1Col = !useMediaQuery({ minWidth: 640 })
  const is2Cols = !useMediaQuery({ minWidth: 1024 })
  const [tickersToLoad, setTickersToLoad] = useState(restOfTickers)
  const [loadingMoreTickers, setLoadingMoreTickers] = useState(false)
  const moreTickers = useRef([])
  const lastTickerLoaded = useRef(null)
  const lastTickerRef = useRef(null)

  const entry = useIntersectionObserver(lastTickerRef, {})
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    const getMoreTickers = async () => {
      // - Next 5 alpaca stocks
      const numTickers = is1Col ? 5 : is2Cols ? 10 : 15
      const nextTickers = tickersToLoad.slice(0, numTickers)
      setTickersToLoad(tickersToLoad.slice(numTickers))
      const tickerDocs = await getTickerDocs(nextTickers)

      lastTickerLoaded.current = tickerDocs?.slice().pop()

      const tickers = await Promise.all(
        tickerDocs?.map(async (tickerDoc) => {
          const { tickerSymbol } = tickerDoc.data()
          const props = await getTickerProps(tickerDoc, null, null)

          let price: Price
          try {
            price = tickerSymbol ? await iexQuote(tickerSymbol, user?.token) : undefined
          } catch (err) {
            console.log(`Failed to find price for ${tickerSymbol}`)
            console.log(err)
            console.log(price)
          }

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
    <div className="relative flex flex-col items-center justify-center">
      {/* <div className="absolute inset-0 rounded-full opacity-50 h-72 w-72 bg-brand-lightTeal mix-blend-multiply filter blur-xl" /> */}
      <div className="my-8 text-2xl tracking-wider uppercase h-1/2 font-primary">
        <span>{category} stocks</span>
      </div>
      {tickers.map(({ ticker, price }) => (
        <HorizontalAssetCard
          key={`${ticker?.tickerSymbol}`}
          cardRef={null}
          isin={ticker?.ISIN}
          tickerSymbol={ticker?.tickerSymbol}
          shortName={ticker?.shortName}
          logoColor={ticker?.logoColor}
          price={price}
        />
      ))}
      {moreTickers.current.length > 0 &&
        moreTickers.current.map(({ ticker, price }) => (
          <HorizontalAssetCard
            key={`${ticker?.tickerSymbol}`}
            cardRef={null}
            isin={ticker?.ISIN}
            tickerSymbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            logoColor={ticker?.logoColor}
            price={price}
          />
        ))}
      <HorizontalAssetCardSkeleton
        cardRef={lastTickerRef}
        className={loadingMoreTickers ? "block" : "invisible"}
      />
    </div>
  )
}

interface StaticProps {
  params: {
    category: string
  }
}

export const getStaticProps: GetStaticProps = async ({
  params: { category },
}: StaticProps) => {
  // FIXME: Is there a way we can not call this twice and just pass the tickers?
  const categories = await getTickerCategoryShortNames()
  const tickers = categories[category]?.tickers

  try {
    // - These functions take arrays of tickers
    const { props } = await getTickersStaticProps({
      tickerDocs: await getTickerDocs(tickers.slice(0, 10)),
      period: null,
      interval: null,
    })

    return {
      props: { ...props, category, restOfTickers: tickers.slice(10) },
      revalidate: 8000,
    }
  } catch (e) {
    return { redirect: { destination: "/404", permanent: false } }
  }
}

// TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getTickerCategoryShortNames()
  const paths = Object.keys(categories).map((shortName) => ({
    params: { category: shortName },
  }))
  return { paths, fallback: "blocking" }
}

export default CategoryPage
