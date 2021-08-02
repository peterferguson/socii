import { GainPctBar, PortfolioHistoryCard, StockTable, SummaryCard } from "@components"
import { logoUrl } from "@utils/logoUrl"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import {
  FaArrowDown,
  FaArrowUp,
  FaChartBar,
  FaChartPie,
  FaPercent,
  FaUsers,
} from "react-icons/fa"
import "react-vis/dist/style.css"

const Dashboard = () => (
  <>
    <div className="flex flex-col w-full bg-blueGray-100">
      <div className="w-full px-2 mx-auto">
        {/* Card stats */}
        <div className="flex flex-wrap items-center justify-center mx-auto">
          {cards.map((props, i) => (
            <SummaryCard key={`card-${i}`} {...props} />
          ))}
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
          <FaArrowUp className="ml-2 mb-0.5 text-emerald-500" />
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
