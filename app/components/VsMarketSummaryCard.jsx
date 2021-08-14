import { useMarketData, usePortfolioHistory } from "@hooks"
import { pnlTextColor } from "@utils/pnlTextColor"
import React, { useMemo } from "react"
import { FaArrowDown, FaArrowUp, FaPercent } from "react-icons/fa"
import SummaryCard from "./SummaryCard"

const VsMarketSummaryCard = () => {
  const { history } = usePortfolioHistory()
  const { market } = useMarketData()

  const equityChange = history?.profitLossPct?.slice(-1)[0] * 100
  const marketChange = market?.changePercent * 100

  const difference = equityChange - marketChange
  const pnlColor = pnlTextColor(difference)

  const props = useMemo(
    () => ({
      Title: () => <span>Market Performance</span>,
      subTitle: `${marketChange.toFixed(2)}%`,
      ImgComponent: () => <FaPercent />,
      iconColor: "blue-500", // - tw jit border-blue-500 text-blue-500 bg-blue-500
      Heading: () => (
        <h1 className={`inline-flex space-x-1 ${pnlColor}`}>
          {difference ? <FaArrowUp /> : <FaArrowDown />}
          <span> {difference.toFixed(2)}%</span>
        </h1>
      ),
      headingSubText: "Beating the market today!",
    }),
    [difference, marketChange, pnlColor]
  )

  return <SummaryCard {...props} />
}

export default VsMarketSummaryCard
