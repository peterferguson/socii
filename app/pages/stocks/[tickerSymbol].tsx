import { InvestButton } from "@components/InvestButton"
import { InvestButtonModal } from "@components/InvestButtonModal"
import PriceCard from "@components/PriceCard"
import { ReturnToLastScreenModalDynamic } from "@components/ReturnToLastScreenModal"
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
import TickerHoldingCard from "@components/TickerHoldingCard"

const TickerPage: React.FC<TickersProps> = ({ tickers }) => {
  let { ticker, timeseries, price: initialPrice } = tickers?.[0] || {}
  const logoColor: string = ticker?.logoColor || ""
  const { price, isLoading } = useTickerPrice(
    ticker?.tickerSymbol,
    3 * 60 * 1000,
    initialPrice
  )

  const router = useRouter()
  const [holding, setHolding] = useState(Object)
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
    if (holding) {
      send("UPDATE_HOLDING", { holding })
      setHolding(holding)
    }
  }, [positions, send, ticker?.tickerSymbol])

  // - Push the latest price to the array
  useEffect(() => {
    if (price)
      timeseries?.push({
        timestamp:
          typeof price?.latestUpdate !== "string" && price?.latestUpdate?.unix() * 1000,
        close: price?.iexRealtimePrice || price?.latestPrice,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

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
          <TickerHoldingCard
            holding={holding}
            tickerSymbol={ticker?.tickerSymbol}
            price={null}
            isPriceLoading={true}
          />
          <div className="flex-grow hidden sm:block" />
          <div className="flex-grow px-4 sm:flex-none sm:pl-8">
            <InvestButton send={send} logoColor={logoColor} />
          </div>
          <TickerPageChartCard
            tickerSymbol={ticker.tickerSymbol}
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
        </div>
      )}
    </>
  )
}

// TODO: Remove tooltip and color price in the graph display of values
export const getStaticProps: GetStaticProps = async ({ params: { tickerSymbol } }) => {
  // - For this page, we only retrieve one ticker so pop it off the array if passed in

  const symbol = typeof tickerSymbol === "string" ? tickerSymbol : tickerSymbol.pop()

  try {
    // - These functions take arrays of tickers
    const props = await getTickersStaticProps({
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

    props.props.tickers = props.props.tickers.map((ticker) => ({
      ...ticker,
      timeseries,
    }))

    return { ...props, revalidate: 8000 }
  } catch (e) {
    return { redirect: { destination: "/404", permanent: false } }
  }
}

// TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getPopularTickersDocs()).docs?.map((doc) => {
    const { tickerSymbol } = doc.data()
    return { params: { tickerSymbol } }
  })

  return { paths, fallback: true }
}

export default TickerPage
