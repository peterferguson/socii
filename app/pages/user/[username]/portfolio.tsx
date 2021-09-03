import { PortfolioEquitySummaryCard } from "@components/PortfolioEquitySummaryCard"
import { PortfolioHistoryCard } from "@components/PortfolioHistoryCard"
import { StockTableDynamic, StockTableMeta } from "@components/StockTable"
import { VsMarketSummaryCard } from "@components/VsMarketSummaryCard"
import React, { useMemo } from "react"

const Dashboard = () => {
  const tableMeta = useMemo(() => StockTableMeta, [])
  return (
    <>
      <div className="flex flex-col w-full bg-blueGray-100">
        <div className="w-full mx-auto">
          {/* Card stats */}
          {/* TODO: Convert these into carousel cards organised by top percentage */}
          <div className="grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => card(`card-${i}`))}
          </div>
        </div>
        <div className="w-full mx-auto overscroll-x-none">
          {/* Tables */}
          <PortfolioHistoryCard />
          <div className="flex flex-wrap w-full mt-4">
            <StockTableDynamic stockTableMeta={tableMeta} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

const cards = [
  (key: React.Key) => <PortfolioEquitySummaryCard key={key} />,
  // (key: React.Key) => <LastPurchaseSummaryCard key={key} />,
  (key: React.Key) => <VsMarketSummaryCard key={key} />,
  // (key: React.Key) => <TopPerformerSummaryCard key={key} />,
]
