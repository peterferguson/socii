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

  const iconColor = "red-500" // - tw jit border-red-500 text-red-500

  const props = useMemo(
    () => ({
      Title: () => <span className="mb-8">Portfolio Equity</span>,
      subTitle: `$ ${equity}`,
      ImgComponent: () => (
        <div
          className={`w-12 h-12 flex items-center justify-center text-white bg-${iconColor} rounded-full shadow-lg`}
        >
          <FaChartBar />
        </div>
      ),
      iconColor,
      Heading: () => (
        <h1 className={`inline-flex space-x-1 ${pnlColor}`}>
          {percentage ? <FaArrowUp /> : <FaArrowDown />}
          <span> {percentage.toFixed(2)}%</span>
        </h1>
      ),
      headingSubText: "Since yesterday",
      InformationIcon: () => (
        <div
          className={`w-10 h-10 flex items-center justify-center text-white bg-${iconColor} rounded-full shadow-sm`}
        >
          <FaChartBar className="w-4 h-4"/>
        </div>
      ),
      informationTitle: "Equity",
      InformationText:
        "This is the total value of all assets across all of your portfolios",
    }),
    [equity, percentage, pnlColor]
  )
  return <SummaryCard {...props} />
}
export default PortfolioEquitySummaryCard
