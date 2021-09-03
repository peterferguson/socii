import { usePortfolioHistory } from "@hooks"
import { pnlTextColor } from "@utils/pnlTextColor"
import React, { useMemo } from "react"
import { FaArrowDown, FaArrowUp, FaChartBar } from "react-icons/fa"
import SummaryCard from "../SummaryCard"

const PortfolioEquitySummaryCard = () => {
  const { history } = usePortfolioHistory()
  const equity = history?.equity?.slice(-1)[0]?.toFixed(2)
  const percentage = history?.profitLossPct?.slice(-1)[0] * 100
  const pnlColor = pnlTextColor(percentage)
  const props = useMemo(
    () => ({
      Title: () => <span className="mb-8">Portfolio Equity</span>,
      subTitle: `$ ${equity}`,
      ImgComponent: () => <FaChartBar />,
      iconColor: "red-500", // - tw jit border-red-500 text-red-500
      Heading: () => (
        <h1 className={`inline-flex space-x-1 ${pnlColor}`}>
          {percentage ? <FaArrowUp /> : <FaArrowDown />}
          <span> {percentage.toFixed(2)}%</span>
        </h1>
      ),
      headingSubText: "Since yesterday",
    }),
    [equity, percentage, pnlColor]
  )
  return <SummaryCard {...props} />
}
export default PortfolioEquitySummaryCard