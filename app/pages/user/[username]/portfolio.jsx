import {
  GainPctBar,
  GroupPieCard,
  LineChart,
  PieCardSkeleton,
  StockTable,
  SummaryCard,
} from "@components"
import { firestore } from "@lib/firebase"
import { logoUrl } from "@utils/logoUrl"
import { fetcher } from "@utils/fetcher"
import { useAuth } from "@hooks"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"
import {
  FaArrowDown,
  FaArrowUp,
  FaChartBar,
  FaChartPie,
  FaPercent,
  FaUsers,
} from "react-icons/fa"

export default function Dashboard() {
  // TODO: Sidebar with name, breakdown dashboard, activity feed & chat
  // TODO: converting to a footer when in mobile view

  const router = useRouter()
  const groupName = router.query.groupName
  // const { username, userGroups } = useAuth();

  return (
    <>
      <div className="flex flex-col w-full bg-blueGray-100">
        <div className="py-12 bg-gradient-to-r from-green-300 to-brand">
          <PortfolioHistoryLineChart />
          <div className="w-full px-4 mx-auto md:px-10">
            {/* Card stats */}
            <div className="flex flex-wrap items-center mx-auto">
              {cards.map((props, i) => (
                <SummaryCard key={`card-${i}`} {...props} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full px-4 mx-auto md:px-10">
          {/* Tables */}
          <div className="flex flex-wrap mt-4">
            <StockTable
              positions={[
                {
                  asset_id: "904837e3-3b76-47ec-b432-046db621571b",
                  symbol: "AAPL",
                  exchange: "NASDAQ",
                  asset_class: "us_equity",
                  avg_entry_price: "100.0",
                  qty: "5",
                  side: "long",
                  market_value: "600.0",
                  cost_basis: "500.0",
                  unrealized_pl: "100.0",
                  unrealized_plpc: "0.20",
                  unrealized_intraday_pl: "10.0",
                  unrealized_intraday_plpc: "0.0084",
                  current_price: "120.0",
                  lastday_price: "119.0",
                  change_today: "0.0084",
                },
              ]}
              stockTableMeta={stockTableMeta}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const PortfolioHistoryLineChart = () => {
  const { user } = useAuth()

  const alpacaId = "933ab506-9e30-3001-8230-50dc4e12861c" // - user?.alpacaID

  const [history, setHistory] = useState([])
  useEffect(() => {
    const makeHistory = async () => {
      setHistory(
        await fetcher("/api/alpaca/portfolio", {
          method: "POST",
          headers: { Authorization: `Bearer ${user?.token}` },
          body: JSON.stringify({ accountId: alpacaId }),
        })
      )
    }
    if (user?.token && alpacaId) makeHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, alpacaId])

  return (
    <>
      <div className="w-full px-4 mt-4 xl:w-4/12">
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
          <div className="px-4 py-3 mb-0 bg-transparent rounded-t">
            <div className="flex flex-wrap items-center">
              <div className="relative flex-1 flex-grow w-full max-w-full">
                <h6 className="mb-1 text-xs font-semibold uppercase text-blueGray-400">
                  Holdings
                </h6>
                <h2 className="text-xl font-semibold text-blueGray-700">
                  Portfolio Allocation
                </h2>
              </div>
              {/* <div className="">{JSON.stringify(history)}</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// function PieChart({ groupName }) {
//   const [currentPrices, setCurrentPrices] = useState([])
//   const holdingsRef = firestore.collection(`groups/${groupName}/holdings`)

//   const [holdings, loading] = useCollectionDataOnce(holdingsRef)

//   // useEffect(() => {
//   //   holdings?.map(({ tickerSymbol }) => {
//   //     const iexClient = new IEXQuery()

//   //     fetchJSON(iexClient.stockPrice(tickerSymbol)).then((value) =>
//   //       setCurrentPrices((previousState) => ({
//   //         ...previousState,
//   //         [tickerSymbol]: value,
//   //       }))
//   //     )
//   //   })
//   // }, [holdings])

//   const holdingData = holdings?.map(
//     ({ assetRef, tickerSymbol, shortName, avgPrice, shares }) => {
//       return { ISIN: assetRef.id, tickerSymbol, shortName, avgPrice, shares }
//     }
//   )

//   return (
//     <>
//       <div className="w-full px-4 xl:w-4/12">
//         <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
//           <div className="px-4 py-3 mb-0 bg-transparent rounded-t">
//             <div className="flex flex-wrap items-center">
//               <div className="relative flex-1 flex-grow w-full max-w-full">
//                 <h6 className="mb-1 text-xs font-semibold uppercase text-blueGray-400">
//                   Holdings
//                 </h6>
//                 <h2 className="text-xl font-semibold text-blueGray-700">
//                   Portfolio Allocation
//                 </h2>
//               </div>
//             </div>
//           </div>
//           <div className="flex-auto p-4">
//             {/* Chart */}
//             {!loading ? (
//               <GroupPieCard
//                 className={"bg-opacity-0 bg-gray-50"}
//                 groupName={groupName}
//                 holdingData={holdingData}
//                 currentPrices={currentPrices}
//               />
//             ) : (
//               <PieCardSkeleton scaling={0.3} radius={250} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// - sample position data
// ? "asset_id": "904837e3-3b76-47ec-b432-046db621571b",
// ? "symbol": "AAPL",
// ? "exchange": "NASDAQ",
// ? "asset_class": "us_equity",
// ? "avg_entry_price": "100.0",
// ? "qty": "5",
// ? "side": "long",
// ? "market_value": "600.0",
// ? "cost_basis": "500.0",
// ? "unrealized_pl": "100.0",
// ? "unrealized_plpc": "0.20",
// ? "unrealized_intraday_pl": "10.0",
// ? "unrealized_intraday_plpc": "0.0084",
// ? "current_price": "120.0",
// ? "lastday_price": "119.0",
// ? "change_today": "0.0084"

export const stockTableMeta = {
  Asset: {
    alpacaAttr: "symbol",
    Component: ({ position, attr }) => {
      const [logoURL, setLogoURL] = useState(null)
      const url = logoUrl(position[attr])
      if (typeof url === "string") setLogoURL(url)
      else url.then((url) => setLogoURL(url))
      return (
        <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
          <Link href={`/stocks/${position?.[attr] || ""}`}>
            {logoURL ? (
              <Image
                src={logoURL}
                width="32px"
                height="32px"
                className="object-cover mx-auto rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-6 h-6 mx-auto font-semibold text-gray-500 bg-gray-100 rounded-full shadow-lg text-tiny">
                {position[attr]}
              </div>
            )}
          </Link>
          <span className="ml-3">{position[attr]}</span>
        </th>
      )
    },
  },
  Equity: {
    alpacaAttr: "market_value",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
      >
        ${position[attr]}
      </td>
    ),
  },
  Shares: {
    alpacaAttr: "qty",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
      >
        {position[attr]}
      </td>
    ),
  },
  Gain: {
    alpacaAttr: "unrealized_pl",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
      >
        <div className="flex items-center">
          ${position[attr]}
          <FaArrowUp className="ml-2 mb-0.5 text-emerald-500" />
        </div>
      </td>
    ),
  },
  "Gain %": {
    alpacaAttr: "unrealized_plpc",
    Component: ({ position, attr }) => (
      <GainPctBar key={`position-${attr}`} gainPct={position[attr]} />
    ),
  },
}

const cards = [
  {
    Title: () => <span>Portfolio Value</span>,
    subTitle: "350,907",
    ImgComponent: () => (
      <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-red-500 rounded-full shadow-lg">
        <FaChartBar />
      </div>
    ),
    headingColor: "text-emerald-500",
    Heading: () => (
      <>
        <FaArrowUp /> 3.48%
      </>
    ),
    headingSubText: "Since last month",
  },
  {
    Title: () => (
      <span>
        Top Performer: <span className="text-emerald-500">(TSLA)</span>
      </span>
    ),
    subTitle: "924",
    ImgComponent: () => (
      <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-pink-500 rounded-full shadow-lg">
        <FaUsers />
      </div>
    ),
    headingColor: "text-red-500",
    Heading: () => (
      <>
        <FaArrowDown /> 1.10%
      </>
    ),
    headingSubText: "Since last week",
  },
  {
    Title: () => (
      <>
        Latest Purchase: <span className="text-emerald-500">(TSLA)</span>
      </>
    ),
    subTitle: "2,356",
    ImgComponent: () => (
      <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-orange-500 rounded-full shadow-lg">
        <FaChartPie />
      </div>
    ),
    headingColor: "text-emerald-500",
    Heading: () => (
      <>
        <FaArrowUp /> 3.48%
      </>
    ),
    headingSubText: "Since last week",
  },
  {
    Title: () => <span>Performance vs. Market</span>,
    subTitle: "49,65%",
    ImgComponent: () => (
      <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-blue-500 rounded-full shadow-lg">
        <FaPercent />
      </div>
    ),
    headingColor: "text-emerald-500",
    Heading: () => (
      <>
        <FaArrowUp /> 12%
      </>
    ),
    headingSubText: "Since yesterday",
  },
]
