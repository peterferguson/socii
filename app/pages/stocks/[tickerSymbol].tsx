import { InvestButton } from "@components/InvestButton"
import { InvestButtonModal } from "@components/InvestButtonModal"
import PriceCard from "@components/PriceCard"
import { ReturnToLastScreenModalDynamic } from "@components/ReturnToLastScreenModal"
import { StockNewsDynamic } from "@components/StockNews"
import { StockRecommendationsDynamic } from "@components/StockRecommendations"
import TickerPageChartCard from "@components/TickerPageChartCard"
import { usePositions, useTickerPrice } from "@hooks"
import { getPopularTickersDocs } from "@lib/firebase/client/db/getPopularTickersDocs"
import { getTickerDocs } from "@lib/firebase/client/db/getTickerDocs"
import { stockInvestButtonMachine } from "@lib/machines/stockInvestButtonMachine"
import { getTickersStaticProps, TickersProps } from "@utils/getTickersStaticProps"
import { getYahooTimeseries, IntervalEnum, PeriodEnum } from "@utils/getYahooTimeseries"
import { useMachine } from "@xstate/react"
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

  // - State machine for the invest button
  const [state, send] = useMachine(stockInvestButtonMachine)

  // - Decoupling the state machine from the return to last screen modal avoids a bug
  // - where the next modal is closed regardless of the option selected
  const [returnToLastScreen, setReturnToLastScreen] = useState(null)

  useEffect(() => {
    returnToLastScreen !== null &&
      send(returnToLastScreen ? "AGREE" : "DISAGREE") &&
      setReturnToLastScreen(null)
  }, [returnToLastScreen, send])

  // TODO: Display a my position section if the user holds the stock
  // TODO: Breakdown the positions into groups if the user holds the stock
  // TODO: Add back buttons to modals
  useEffect(() => {
    const holding = positions
      ?.filter((position) => position.symbol === ticker?.tickerSymbol)
      .pop()
    if (holding) send("UPDATE_HOLDING", { holding })
  }, [positions, send, ticker?.tickerSymbol])

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
        <div className="flex flex-col flex-wrap w-full sm:flex-row">
          <PriceCard
            isin={ticker?.isin}
            tickerSymbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            price={price}
            isPriceLoading={isLoading}
          />
          <div className="flex-grow hidden sm:block" />
          <div className="flex-grow sm:flex-none">
            <InvestButton send={send} logoColor={logoColor} />
          </div>
          <TickerPageChartCard
            tickerSymbol={ticker?.tickerSymbol}
            color={ticker?.logoColor}
            timeseries={timeseries}
          />
          {InvestButtonModal && !state.matches("returnToLastScreen") && (
            <InvestButtonModal ticker={ticker} state={state} send={send} />
          )}
          {state.matches("returnToLastScreen") && (
            <ReturnToLastScreenModalDynamic
              open={state?.matches("returnToLastScreen")}
              setReturnToLastScreen={setReturnToLastScreen}
            />
          )}
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
    const data = await getTickersStaticProps({
      tickerDocs: await getTickerDocs([symbol]),
      timeseriesLimit: 0, // TODO: Remove this once we have a real timeseries api calls working
    })

    const timeseries = (
      await getYahooTimeseries({
        tickers: [symbol],
        period: PeriodEnum["1D"],
        interval: IntervalEnum["1m"],
      })
    )[symbol].map((tick) => ({
      ...tick,
      timestamp: tick.timestamp.valueOf(),
    }))

    data.props.tickers = data.props.tickers.map((ticker) => ({
      ...ticker,
      timeseries,
    }))

    return { ...data, revalidate: 8000 }
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
