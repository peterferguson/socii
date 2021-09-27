import { InvestButton } from "@components/InvestButton"
import PriceCard from "@components/PriceCard"
import { StockNewsDynamic } from "@components/StockNews"
import { StockRecommendationsDynamic } from "@components/StockRecommendations"
import { TickerHoldingCardDynamic } from "@components/TickerHoldingCard"
import TickerPageChartCard from "@components/TickerPageChartCard"
import { usePositions, useTickerPrice } from "@hooks"
import { getPopularTickersDocs } from "@lib/firebase/client/db/getPopularTickersDocs"
import { getTickerDocs } from "@lib/firebase/client/db/getTickerDocs"
import { Position } from "@models/alpaca/Position"
import { getTickersStaticProps, TickersProps } from "@utils/getTickersStaticProps"
import { getYahooTimeseries, IntervalEnum, PeriodEnum } from "@utils/getYahooTimeseries"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const TickerPage: React.FC<TickersProps> = ({ tickers }) => {
  let { ticker, timeseries, price: initialPrice } = tickers?.[0] || {}
  const logoColor: string = ticker?.logoColor || ""
  const { price, isLoading } = useTickerPrice(
    ticker?.tickerSymbol,
    3 * 60 * 1000,
    initialPrice
  )

  const router = useRouter()
  const { positions, error } = usePositions()
  const [holding, setHolding] = useState<Position>(null)

  // TODO: Display a my position section if the user holds the stock
  // TODO: Breakdown the positions into groups if the user holds the stock
  // TODO: Add back buttons to modals
  useEffect(() => {
    const position = positions
      ?.filter((position) => position.symbol === ticker?.tickerSymbol)
      .pop()
    if (position) setHolding(position)
  }, [positions, ticker?.tickerSymbol])

  // - Push the latest price to the array
  useEffect(() => {
    if (price?.iexRealtimePrice || price?.latestPrice) {
      timeseries?.push({
        timestamp:
          typeof price?.latestUpdate !== "string" && price?.latestUpdate?.unix() * 1000,
        close: price?.iexRealtimePrice || price?.latestPrice,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price?.iexRealtimePrice, price?.latestPrice, price?.latestUpdate])

  // TODO: Replace with skeleton loaders
  if (!tickers || router.isFallback)
    return (
      <div className="items-center justify-center mx-auto text-4xl font-primary text-brand-lightTeal">
        Loading...
      </div>
    )

  return (
    <>
      {!error && (
        <div className="flex flex-col flex-wrap justify-between w-full sm:flex-row">
          <PriceCard
            tickerSymbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            price={price}
            isPriceLoading={isLoading}
          />
          {holding && (
            <TickerHoldingCardDynamic
              holding={holding}
              tickerSymbol={ticker?.tickerSymbol}
              price={null}
              isPriceLoading={true}
            />
          )}
          <div className="flex-grow sm:flex-none">
            <InvestButton ticker={ticker} holding={holding} logoColor={logoColor} />
          </div>
          <TickerPageChartCard
            tickerSymbol={ticker?.tickerSymbol}
            color={ticker?.logoColor}
            timeseries={timeseries}
          />
          <StockRecommendationsDynamic symbol={ticker?.tickerSymbol} />
          <div className="flex-grow hidden sm:block" />
          <StockNewsDynamic
            exchange={ticker?.exchange || ticker?.alpaca?.exchange}
            symbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            logoColor={ticker?.logoColor}
          />
        </div>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params: { tickerSymbol } }) => {
  // - For this page, we only retrieve one ticker so pop it off the array if passed in

  const symbol = typeof tickerSymbol === "string" ? tickerSymbol : tickerSymbol.pop()

  try {
    // - These functions take arrays of tickers
    const { props } = await getTickersStaticProps({
      tickerDocs: await getTickerDocs([symbol]),
      period: PeriodEnum["1D"],
      interval: IntervalEnum["1m"],
    })
    return { props, revalidate: 8000 }
  } catch (e) {
    return { redirect: { destination: "/404", permanent: false } }
  }
}

// TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getPopularTickersDocs())?.map((doc) => {
    const { tickerSymbol } = doc.data()
    return { params: { tickerSymbol } }
  })

  return { paths, fallback: true }
}

export default TickerPage
