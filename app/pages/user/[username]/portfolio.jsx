import { GroupPieCard, PieCardSkeleton } from "@components"
import { firestore } from "@lib/firebase"
import { logoUrl } from "@utils/logoUrl"
import { pnlBackgroundColor } from "@utils/pnlBackgroundColor"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"
import { FaArrowUp } from "react-icons/fa"

export default function Dashboard() {
  // TODO: Sidebar with name, breakdown dashboard, activity feed & chat
  // TODO: converting to a footer when in mobile view

  const router = useRouter()
  const groupName = router.query.groupName
  // const { username, userGroups } = useAuth();

  const cards = [
    {
      title: "Portfolio Value",
      subTitle: "350,907",
      imgComponent: (
        <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-red-500 rounded-full shadow-lg">
          <i className="far fa-chart-bar"></i>
        </div>
      ),
      headingColor: "text-emerald-500",
      heading: (
        <>
          <i className="fas fa-arrow-up"></i> 3.48%
        </>
      ),
      headingSubText: "Since last month",
    },
    {
      title: (
        <>
          Top Performer: <span className="text-emerald-500">(TSLA)</span>
        </>
      ),
      subTitle: "924",
      imgComponent: (
        <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-pink-500 rounded-full shadow-lg">
          <i className="fas fa-users"></i>
        </div>
      ),
      headingColor: "text-red-500",
      heading: (
        <>
          <i className="fas fa-arrow-down"></i> 1.10%
        </>
      ),
      headingSubText: "Since last week",
    },
    {
      title: (
        <>
          Latest Purchase: <span className="text-emerald-500">(TSLA)</span>
        </>
      ),
      subTitle: "2,356",
      imgComponent: (
        <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white bg-orange-500 rounded-full shadow-lg">
          <i className="fas fa-chart-pie"></i>
        </div>
      ),
      headingColor: "text-emerald-500",
      heading: (
        <>
          <i className="fas fa-arrow-up"></i> 3.48%
        </>
      ),
      headingSubText: "Since last week",
    },
    {
      title: "Performance vs. Market",
      subTitle: "49,65%",
      imgComponent: (
        <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-center text-white rounded-full shadow-lg bg-lightBlue-500">
          <i className="fas fa-percent"></i>
        </div>
      ),
      headingColor: "text-emerald-500",
      heading: (
        <>
          <i className="fas fa-arrow-up"></i> 12%
        </>
      ),
      headingSubText: "Since yesterday",
    },
  ]

  return (
    <>
      <div className="relative bg-blueGray-100">
        {/* Header */}
        <div className="relative pt-12 pb-32 bg-gradient-to-r from-green-300 to-brand md:pt-32">
          <div className="w-full px-4 mx-auto md:px-10">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                {cards.map((props, i) => (
                  <BlockCard key={`card-${i}`} {...props} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 mx-auto -m-24 md:px-10">
          {/* Charts */}
          <div className="flex flex-wrap">
            <PieChart groupName={groupName} />
          </div>
          {/* Tables */}
          <div className="flex flex-wrap mt-4">
            <StockTable />
          </div>
        </div>
      </div>
    </>
  )
}

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

const stockTableMeta = {
  Ticker: {
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
      <GainContribution key={`position-${attr}`} gainPct={position[attr]} />
    ),
  },
}

const StockTableHeader = ({ headings }) => (
  <thead>
    <tr>
      {headings.map((heading, i) => (
        <th
          key={`heading-${i}-${heading}`}
          className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap"
        >
          {heading}
        </th>
      ))}
    </tr>
  </thead>
)

const StockTableBody = ({ positions, meta }) => {
  console.log(Object.values(meta))
  return (
    <tbody>
      {positions.map((position, i) => (
        <tr key={`position-${i}`}>
          {Object.values(meta).map((row, j) => (
            <row.Component
              key={`position-${j}`}
              position={position}
              attr={row.alpacaAttr}
            />
          ))}
        </tr>
      ))}
    </tbody>
  )
}

const StockTable = (props) => (
  <div className="w-full px-4 mb-12 xl:w-8/12 xl:mb-0">
    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
      <div className="px-4 py-3 mb-0 border-0 rounded-t">
        <div className="flex flex-wrap items-center">
          <div className="relative flex-1 flex-grow w-full max-w-full px-4">
            <h3 className="text-base font-semibold text-blueGray-700">
              Holdings Breakdown
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <table className="items-center w-full bg-transparent border-collapse">
          <StockTableHeader headings={Object.keys(stockTableMeta)} />
          <StockTableBody
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
            meta={stockTableMeta}
          />
        </table>
      </div>
    </div>
  </div>
)

// TODO: Send this the correct data. It should be what that stocks contributed to the portfolios overall gain.
const GainContribution = ({ gainPct }) => {
  const gainColor = pnlBackgroundColor(gainPct)
  return (
    <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
      <div className="flex items-center space-x-1">
        <span className="">{gainPct * 100}%</span>
        <div className="w-full">
          <div className="flex h-2 overflow-hidden bg-red-200 rounded text-tiny">
            <div
              style={{ width: `${gainPct * 100}%` }}
              className={`flex flex-col justify-center text-center text-white ${gainColor}`}
            />
          </div>
        </div>
      </div>
    </td>
  )
}

function BlockCard({
  title,
  subTitle,
  imgComponent,
  headingColor,
  heading,
  headingSubText,
}) {
  return (
    <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
      <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white rounded shadow-lg xl:mb-0">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative flex-1 flex-grow w-full max-w-full pr-4">
              <h5 className="text-xs font-bold uppercase text-blueGray-400">{title}</h5>
              <span className="text-xl font-semibold text-blueGray-700">
                {subTitle}
              </span>
            </div>
            <div className="relative flex-initial w-auto pl-4">{imgComponent}</div>
          </div>
          <p className="mt-4 text-sm text-blueGray-400">
            <span className={`${headingColor} mr-2`}>{heading}</span>
            <span className="whitespace-nowrap">{headingSubText}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function PieChart({ groupName }) {
  const [currentPrices, setCurrentPrices] = useState([])
  const holdingsRef = firestore.collection(`groups/${groupName}/holdings`)

  const [holdings, loading] = useCollectionDataOnce(holdingsRef)

  // useEffect(() => {
  //   holdings?.map(({ tickerSymbol }) => {
  //     const iexClient = new IEXQuery()

  //     fetchJSON(iexClient.stockPrice(tickerSymbol)).then((value) =>
  //       setCurrentPrices((previousState) => ({
  //         ...previousState,
  //         [tickerSymbol]: value,
  //       }))
  //     )
  //   })
  // }, [holdings])

  const holdingData = holdings?.map(
    ({ assetRef, tickerSymbol, shortName, avgPrice, shares }) => {
      return { ISIN: assetRef.id, tickerSymbol, shortName, avgPrice, shares }
    }
  )

  return (
    <>
      <div className="w-full px-4 xl:w-4/12">
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
            </div>
          </div>
          <div className="flex-auto p-4">
            {/* Chart */}
            {!loading ? (
              <GroupPieCard
                className={"bg-opacity-0 bg-gray-50"}
                groupName={groupName}
                holdingData={holdingData}
                currentPrices={currentPrices}
              />
            ) : (
              <PieCardSkeleton scaling={0.3} radius={250} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
