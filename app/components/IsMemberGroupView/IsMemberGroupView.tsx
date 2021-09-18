// TODO
// - Implement proper view
// - enable stream

import { PortfolioEquitySummaryCard } from "@components/PortfolioEquitySummaryCard"
import { StockTableGroupDynamic, StockTableMeta } from "@components/StockTable"
import { VsMarketSummaryCard } from "@components/VsMarketSummaryCard"
import React, { useMemo } from "react"
import { TradeHistory } from "../../components/TradeHistory/TradeHistory"
import GroupColumnCard from "../GroupColumnCard"

const IsMemberGroupView = ({ groupName }) => {
  const tableMeta = useMemo(() => StockTableMeta, [])

  if (Array.isArray(groupName)) groupName = groupName[0]

  return (
    <>
      <div className="w-full p-4">
        <GroupColumnCard groupName={groupName} />
        {/* Card stats */}
        {/* TODO: Convert these into carousel cards organised by top percentage */}
        <div className="grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => card(`card-${i}`))}
        </div>
        <div className="overscroll-x-none">
          <div className="flex flex-wrap w-full mt-4">
            <StockTableGroupDynamic stockTableMeta={tableMeta} />
          </div>
          <TradeHistory />
        </div>
      </div>
    </>
  )
}

export default IsMemberGroupView

const cards = [
  (key: React.Key) => <PortfolioEquitySummaryCard key={key} />,
  // (key: React.Key) => <LastPurchaseSummaryCard key={key} />,
  (key: React.Key) => <VsMarketSummaryCard key={key} />,
  // (key: React.Key) => <TopPerformerSummaryCard key={key} />,
]
