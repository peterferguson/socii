import { InvestButton } from "@components/InvestButton"
import { InvestButtonModal } from "@components/InvestButtonModal"
import PriceCard from "@components/PriceCard"
import TickerPageChartCard from "@components/TickerPageChartCard"
import { usePositions, useTickerPrice } from "@hooks"
import { getPopularTickersDocs, getTickerDocs } from "@lib/firebase/client/db"
import { stockInvestButtonMachine } from "@lib/machines/stockInvestButtonMachine"
import { getTickersStaticProps, TickersProps } from "@utils/getTickersStaticProps"
import { useMachine } from "@xstate/react"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import Custom404 from "../404"

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
    if (price)
      timeseries?.push({
        timestamp:
          typeof price?.latestUpdate !== "string" && price?.latestUpdate?.unix() * 1000,
        close: price?.iexRealtimePrice || price?.latestPrice,
        open: undefined,
        high: undefined,
        low: undefined,
        volume: undefined,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  // TODO: Replace with skeleton loaders
  if (!tickers) return <Custom404 />

  if (router.isFallback)
    return (
      <div className="items-center justify-center mx-auto text-4xl font-primary text-brand-lightTeal">
        Loading...
      </div>
    )

  return (
    <>
      {!error && (
        <>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="flex-none pt-4 pl-0 sm:pl-1 ">
              <PriceCard
                isin={ticker?.isin}
                tickerSymbol={ticker?.tickerSymbol}
                shortName={ticker?.shortName}
                price={price}
                isPriceLoading={isLoading}
              />
            </div>
            <div className="flex-grow hidden sm:block" />
            <div className="flex-grow px-4 sm:flex-none sm:pl-8">
              <InvestButton state={state} send={send} logoColor={logoColor} />
            </div>
          </div>
          <TickerPageChartCard color={ticker?.logoColor} timeseries={timeseries} />
          <InvestButtonModal ticker={ticker} state={state} send={send} />
        </>
      )}
    </>
  )
}

// TODO: Remove tooltip and color price in the graph display of values
export const getStaticProps: GetStaticProps = async ({ params: { tickerSymbol } }) => {
  try {
    const props = await getTickersStaticProps({
      tickerDocs: await getTickerDocs(
        typeof tickerSymbol === "string" ? [tickerSymbol] : tickerSymbol
      ),
    })
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
