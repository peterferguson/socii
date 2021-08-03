import {
  GainPctBar,
  LastPurchaseSummaryCard,
  PortfolioHistoryCard,
  PortfolioValueSummaryCard,
  StockTable,
  TopPerformerSummaryCard,
  VsMarketSummaryCard,
} from "@components"
import { logoUrl } from "@utils/logoUrl"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import "react-vis/dist/style.css"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

const Dashboard = () => (
  <>
    <div className="flex flex-col w-full bg-blueGray-100">
      <div className="w-full px-2 mx-auto">
        {/* Card stats */}
        <div className="items-center justify-center mx-auto grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => card(`card-${i}`))}
        </div>
      </div>
      <div className="w-full px-2 mx-auto">
        {/* Tables */}
        <PortfolioHistoryCard />
        <div className="flex flex-wrap w-full mt-4">
          <StockTable stockTableMeta={stockTableMeta} />
        </div>
      </div>
    </div>
  </>
)
export default Dashboard

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
    alpacaAttr: "marketValue",
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
    alpacaAttr: "unrealizedPl",
    Component: ({ position, attr }) => (
      <td
        key={`position-${attr}`}
        className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap"
      >
        <div className="flex items-center">
          ${position[attr]}
          {position[attr] > 0 ? (
            <FaArrowUp className="ml-2 mb-0.5 text-emerald-500" />
          ) : (
            <FaArrowDown className="ml-2 text-red-500 mb-0.5" />
          )}
        </div>
      </td>
    ),
  },
  "Gain %": {
    alpacaAttr: "unrealizedPlpc",
    Component: ({ position, attr }) => (
      <GainPctBar key={`position-${attr}`} gainPct={position[attr]} />
    ),
  },
}

const cards = [
  (key: React.Key) => <PortfolioValueSummaryCard key={key} />,
  (key: React.Key) => <LastPurchaseSummaryCard key={key} />,
  (key: React.Key) => <VsMarketSummaryCard key={key} />,
  (key: React.Key) => <TopPerformerSummaryCard key={key} />,
]
