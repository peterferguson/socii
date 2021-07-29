import { Chart, PriceCard, PriceHeading } from "@components/index"
import { useAuth } from "@hooks/useAuth"
import { tailwindColorMap } from "@lib/constants"
import { firestore } from "@lib/firebase"
import { stockInvestButtonMachine } from "@lib/machines/stockInvestButtonMachine"
import { fetcher, stockProps } from "@utils"
import { pctChange } from "@utils/pctChange"
import { pnlTextColor } from "@utils/pnlTextColor"
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

export default function TickerPage({ tickerSymbols, price }) {
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

  const [crosshairIndexValue, setCrosshairIndexValue] = useState(0)
  const [gainColor, setGainColor] = useState("text-gray-400")

  const latestClose = timeseries?.[0]?.y
  const highlightedClose = timeseries[crosshairIndexValue]?.y
  let movingMonthlyClose = highlightedClose

  try {
    movingMonthlyClose = timeseries[crosshairIndexValue + 21]?.y
  } catch (err) {
    null
  }

  const movingMonthlyPctChange = pctChange(highlightedClose, movingMonthlyClose)

  const lastMonthPctChange = pctChange(latestClose, timeseries[21]?.y)

  // * Show the pct change of highlighted value versus today
  const highlightedChange = pctChange(latestClose, highlightedClose).toFixed(2)

  const tickerProps = {
    logoUrl: ticker.logoUrl,
    tickerSymbol: ticker.tickerSymbol,
    shortName: ticker.shortName,
    currentPrice: latestClose,
    movingMonthlyPctChange: movingMonthlyPctChange,
  }

  useEffect(
    () => setGainColor(tailwindColorMap[pnlTextColor(lastMonthPctChange)]),
    [lastMonthPctChange]
  )

  if (router.isFallback) return <div>Loading...</div>

  // TODO: Replace with skeleton loaders
  if (!tickerSymbols) return <Custom404 />

  return (
    <>
      <div className="flex flex-col w-full sm:flex-row">
        {/* <SmallAssetCard {...tickerProps} /> */}
        <div className="flex-none pt-4 pl-0 sm:pl-8 ">
          <PriceCard
            {...tickerProps}
            movingMonthlyPctChange={lastMonthPctChange}
            initialPrice={price}
          />
        </div>
        <div className="flex-grow hidden sm:block" />
        <div className="flex-grow px-4 sm:flex-none sm:pl-8">
          <div
            style={{ "background-color": ticker.logoColor }}
            className="mx-0 mt-4 mb-0 text-center btn btn-transition"
            onClick={() => (state.matches("active") ? send("CLOSE") : send("CLICK"))}
          >
            <span className="z-10 w-12 h-4 text-4xl">Invest</span>
          </div>
        </div>
      </div>
      <Chart
        color={ticker?.logoColor}
        timeseries={timeseries}
        crosshairIndexValue={crosshairIndexValue}
        setCrosshairIndexValue={setCrosshairIndexValue}
        highlightedChange={highlightedChange}
        highlightedClose={highlightedClose}
      />
      {Modal ? <Modal ticker={ticker} state={state} send={send} /> : null}
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
  const { Client } = require("iexjs")

  const iexClient = new Client({
    api_token: process.env.NEXT_PUBLIC_IEXCLOUD_PUBLIC_KEY,
    version: "stable",
  })

  const { tickerSymbol } = params
  let props

  const tickerQuery = firestore
    .collection("tickers")
    .where("tickerSymbol", "==", tickerSymbol)
    .limit(1)

  const price = await iexClient.quote(tickerSymbol, {
    filter: "latestPrice,changePercent,iexRealtimePrice",
  })

  props = await stockProps({ tickerQuery, timeseriesLimit: 100 })

  try {
    props = {
      props: { ...props.props, price },
    }
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
