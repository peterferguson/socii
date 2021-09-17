import { useMarketData, usePortfolioHistory } from "@hooks"
import { pnlTextColor } from "@utils/pnlTextColor"
import React, { useMemo } from "react"
import { FaArrowDown, FaArrowUp, FaPercent } from "react-icons/fa"
import SummaryCard from "../SummaryCard"

const VsMarketSummaryCard = () => {
  const { history } = usePortfolioHistory()
  const { market } = useMarketData()

  const equityChange = history?.profitLossPct?.slice(-1)[0] * 100
  const marketChange = market?.changePercent * 100

  const difference = equityChange - marketChange
  const pnlColor = pnlTextColor(difference)
  const iconColor = "blue-500" // - tw jit border-blue-500 text-blue-500 bg-blue-500

  const props = useMemo(
    () => ({
      Title: () => <span>Market Performance</span>,
      subTitle: `${marketChange.toFixed(2)}%`,
      ImgComponent: () => (
        <div
          className={`w-12 h-12 flex items-center justify-center text-white bg-${iconColor} rounded-full shadow-lg`}
        >
          <FaPercent />
        </div>
      ),
      iconColor,
      Heading: () => (
        <h1 className={`inline-flex space-x-1 ${pnlColor}`}>
          {difference ? <FaArrowUp /> : <FaArrowDown />}
          <span> {difference.toFixed(2)}%</span>
        </h1>
      ),
      headingSubText: "Beating the market today!",
      InformationIcon: () => (
        <div
          className={`w-10 h-10 flex items-center justify-center text-white bg-${iconColor} rounded-full shadow-sm`}
        >
          <FaPercent className="w-4 h-4" />
        </div>
      ),
      informationTitle: "Market Performance",
      InformationText: () => (
        <div className="">
          <p>
            This a comparison of all your assets (across all portfolios) against the
            S&P500 (represented by SPY ETF).
          </p>
          <br />
          <p>
            The S&P500 tracks the performance of the 500 largest companies in the US.
          </p>
        </div>
      ),
    }),
    [difference, marketChange, pnlColor]
  )

  return <SummaryCard {...props} />
}

export default VsMarketSummaryCard
