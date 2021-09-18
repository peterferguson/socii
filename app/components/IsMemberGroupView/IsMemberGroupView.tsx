// TODO
// - Implement proper view
// - enable stream

import { ClientOnly, GroupColumnCard } from "@components"
import dynamic from "next/dynamic"
import { useMediaQuery } from "react-responsive"
import { PortfolioEquitySummaryCard } from "@components/PortfolioEquitySummaryCard"
import { PortfolioHistoryCard } from "@components/PortfolioHistoryCard"
import { StockTableGroupDynamic, StockTableMeta } from "@components/StockTable"
import { VsMarketSummaryCard } from "@components/VsMarketSummaryCard"
import React, { useMemo } from "react"
import { TradeHistory } from "../../components/TradeHistory/TradeHistory"

const StreamChatWithNoSSR = dynamic(() => import("@stream/components/Chat"), {
  ssr: false,
})

const IsMemberGroupView = ({ groupName }) => {
  const is1Col = !useMediaQuery({ minWidth: 640 })
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
          {/* Tables */}
          {/* <PortfolioHistoryCard /> */}
          <div className="flex flex-wrap w-full mt-4">
            <StockTableGroupDynamic stockTableMeta={tableMeta} />
          </div>
          <TradeHistory />
          <ClientOnly>
            {/* <StreamChatWithNoSSR client={client} /> */}
            <div>test</div>
          </ClientOnly>
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
