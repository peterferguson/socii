import React from "react"
import PortfolioHistoryLineChart from "./PortfolioHistoryLineChart"

const PortfolioHistoryCard = () => (
  <div className="w-full mt-4">
    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white shadow-lg rounded-2xl">
      <div className="px-4 py-3 mb-0 bg-transparent">
        <div className="flex flex-col items-center">
          <div className="relative flex-1 flex-grow w-full max-w-full">
            <h6 className="mb-1 text-xs font-semibold uppercase text-blueGray-400">
              Holdings
            </h6>
            <h2 className="text-xl font-semibold text-blueGray-700">
              Portfolio Allocation
            </h2>
          </div>
          <PortfolioHistoryLineChart />
        </div>
      </div>
    </div>
  </div>
)

export default PortfolioHistoryCard
