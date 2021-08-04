import { Chart, PriceCard } from "@components/index"
import { usePositions } from "@hooks"
import { useAuth } from "@hooks/useAuth"
import { getPopularTickersDocs, getTickerDocs } from "@lib/firebase/client/db"
import { stockInvestButtonMachine } from "@lib/machines/stockInvestButtonMachine"
import { getTickersStaticProps } from "@utils/getTickersStaticProps"
import { useMachine } from "@xstate/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import Custom404 from "../404"

const modals = {
  ["active.shareInformation"]: {
    component: dynamic(() => import("../../components/StockSharingModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.chooseGroup"]: {
    component: dynamic(() => import("../../components/SelectGroupModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.investAction"]: {
    component: dynamic(() => import("../../components/SelectInvestActionModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.orderType"]: {
    component: dynamic(() => import("../../components/SelectOrderTypeModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  returnToLastScreen: {
    component: dynamic(() => import("../../components/returnToLastScreenModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.limitOrder"]: {
    component: dynamic(() => import("../../components/OrderModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.shareOrder"]: {
    component: dynamic(() => import("../../components/OrderModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.cashOrder"]: {
    component: dynamic(() => import("../../components/OrderModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
}

export default function TickerPage({ tickers }) {
  let { ticker, timeseries, price } = tickers?.[0] || {}
  const logoColor: string = ticker?.logoColor || ""

  const router = useRouter()
  const { user } = useAuth()

  const alpacaId = "933ab506-9e30-3001-8230-50dc4e12861c" // - user?.alpacaID
  const { positions, error } = usePositions()

  // - State machine for the invest button
  const [state, send] = useMachine(stockInvestButtonMachine)
  const modalStateName = Object.keys(modals).filter(
    (modal) =>
      JSON.stringify(state.value)
        .replace(/[^a-zA-Z:]+/gi, "")
        .replace(":", ".") === modal
  )?.[0]

  const Modal = modalStateName ? modals[modalStateName]?.component : null

  // TODO: Display a my position section if the user holds the stock
  // TODO: Breakdown the positions into groups if the user holds the stock
  // TODO: Add back buttons to modals
  useEffect(() => {
    const holding = positions
      ?.filter((position) => position.symbol === ticker?.tickerSymbol)
      .pop()
    if (holding) send("UPDATE_HOLDING", { holding })
  }, [positions, send, ticker?.tickerSymbol])

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
      <div className="flex flex-col w-full sm:flex-row">
        <div className="flex-none pt-4 pl-0 sm:pl-8 ">
          <PriceCard
            isin={ticker?.isin}
            tickerSymbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            initialPrice={price}
          />
        </div>
        <div className="flex-grow hidden sm:block" />
        <div className="flex-grow px-4 sm:flex-none sm:pl-8">
          <div
            style={{ backgroundColor: logoColor }}
            className="mx-0 mt-4 mb-0 text-center btn btn-transition"
            onClick={() => (state.matches("active") ? send("CLOSE") : send("CLICK"))}
          >
            <span className="z-10 w-12 h-4 text-4xl">Invest</span>
          </div>
        </div>
      </div>
      <Chart color={ticker?.logoColor} timeseries={timeseries} price={price} />
      {Modal ? <Modal ticker={ticker} state={state} send={send} /> : null}
    </>
  )
}

// TODO: Remove tooltip and color price in the graph display of values

export async function getStaticProps({ params: { tickerSymbol } }) {
  try {
    const props = await getTickersStaticProps({
      tickerDocs: await getTickerDocs([tickerSymbol]),
    })
    return { ...props, revalidate: 3000 }
  } catch (e) {
    return { redirect: { destination: "/404", permanent: false } }
  }
}

// TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
export async function getStaticPaths() {
  const paths = (await getPopularTickersDocs()).docs?.map((doc) => {
    const { tickerSymbol } = doc.data()
    return { params: { tickerSymbol } }
  })

  return { paths, fallback: true }
}
