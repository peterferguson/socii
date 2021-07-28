import { default as MainContent } from "@components/TickerSymbolPageMainContent"
import { useAuth } from "@hooks/useAuth"
import { firestore } from "@lib/firebase"
import { stockInvestButtonMachine } from "@lib/machines/stockInvestButtonMachine"
import { fetcher, isBrowser, stockProps } from "@utils"
import { useMachine } from "@xstate/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
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
  // limitOrder:
  // shareOrder:
  // cashOrder:
}

export default function TickerPage({ tickerSymbols }) {
  const router = useRouter()
  const { user } = useAuth()
  const [state, send] = useMachine(stockInvestButtonMachine)
  let { ticker, timeseries } = tickerSymbols?.[0] || {}

  const alpacaId = "933ab506-9e30-3001-8230-50dc4e12861c" // - user?.alpacaID
  const [positions, setPositions] = useState([])
  // TODO: Display a my position section if the user holds the stock
  // TODO: Breakdown the positions into groups if the user holds the stock
  // TODO: Add back buttons to modals
  useEffect(() => {
    const getPositions = async () => {
      setPositions(
        await fetcher("/api/alpaca/positions", {
          method: "POST",
          headers: { Authorization: `Bearer ${user?.token}` },
          body: JSON.stringify({ accountId: alpacaId }),
        })
      )
    }
    if (user?.token && alpacaId) {
      getPositions()
      const holding = positions.filter(
        (position) => position.symbol === ticker?.tickerSymbol
      )[0]
      if (holding) {
        send("UPDATE_HOLDING", { holding })
      }
    }
  }, [user, alpacaId])

  const modalStateName = Object.keys(modals).filter(
    (modal) =>
      JSON.stringify(state.value)
        .replace(/[^a-zA-Z:]+/gi, "")
        .replace(":", ".") === modal
  )?.[0]

  const Modal = modalStateName ? modals[modalStateName]?.component : null

  // - Deserialize the timeseries data
  timeseries = timeseries?.map((d) => ({
    x: d.timestamp instanceof Date ? d.timestamp : new Date(d.timestamp),
    y: d.close,
  }))

  const investHandler = () => (state.matches("active") ? send("CLOSE") : send("CLICK"))

  if (router.isFallback) return <div>Loading...</div>

  // TODO: Replace with skeleton loaders
  if (!tickerSymbols) return <Custom404 />

  return (
    <>
      <MainContent
        ticker={ticker}
        timeseries={timeseries}
        investHandler={investHandler}
      />
      {Modal ? (
        <Modal tickerSymbol={ticker.tickerSymbol} state={state} send={send} />
      ) : null}
    </>
  )
}

// TODO: Create a card for displaying the current holding information & splits by group on interaction
const TickerHoldingCard = ({ holding }) => {
  console.log(holding?.avgEntryPrice)
  console.log(holding?.qty)
  console.log(holding?.side)
  console.log(holding?.marketValue)
  console.log(holding?.costBasis)
  console.log(holding?.unrealizedPl)
  console.log(holding?.unrealizedPlpc)
  console.log(holding?.unrealizedIntradayPl)
  console.log(holding?.unrealizedIntradayPlpc)
  console.log(holding?.currentPrice)
  console.log(holding?.lastdayPrice)
  console.log(holding?.changeToday)

  return (
    <>
      <div className=""></div>
    </>
  )
}

// TODO: Remove tooltip and color price in the graph display of values

export async function getStaticProps({ params }) {
  // TODO add username section here based on the users portfolio
  const { tickerSymbol } = params
  let props

  const tickerQuery = firestore
    .collection("tickers")
    .where("tickerSymbol", "==", tickerSymbol)
    .limit(1)

  try {
    props = await stockProps({ tickerQuery, timeseriesLimit: 100 })
  } catch (e) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }
  }

  return {
    ...props,
    revalidate: 3000,
  }
}

export async function getStaticPaths(context) {
  const snapshot = await firestore
    .collection("tickers")
    .where("isPopular", "==", true)
    .get()

  const paths = snapshot.docs?.map((doc) => {
    const { tickerSymbol } = doc.data()
    return {
      params: { tickerSymbol },
    }
  })

  return { paths, fallback: true }
  // TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
}
