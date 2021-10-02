// TODO
// - Implement proper view
// - enable stream

import { PortfolioEquitySummaryCard } from "@components/PortfolioEquitySummaryCard"
import { StockTableGroupDynamic, StockTableMeta } from "@components/StockTable"
import { VsMarketSummaryCard } from "@components/VsMarketSummaryCard"
import React, { useMemo, useRef, useState } from "react"
import { GroupTradeHistory } from "../../components/GroupTradeHistory/GroupTradeHistory"
import GroupColumnCard from "../GroupColumnCard"
import { AddGroupMemberModalDynamic } from "@components/AddGroupMemberModal"
import { Dialog } from "@headlessui/react"
import { InvisibleButton } from "@components/InvisibleButton"

const IsGroupMemberView = ({ groupName }) => {
  const tableMeta = useMemo(() => StockTableMeta, [])
  const [addingMember, setAddingMember] = useState(true)

  if (Array.isArray(groupName)) groupName = groupName[0]

  return (
    <>
      <div className="w-full p-4">
        {/* <button
          type="button"
          className="text-gray-100 bg-gray-300 rounded-lg text-l hover"
          onClick={() => setAddingMember(true)}
          title="Create a group"
          >
            ADD
        </button> */}
        <AddGroupMemberModalDynamic open={addingMember} />
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
          <GroupTradeHistory groupName={groupName} />
        </div>
      </div>
    </>
  )
}

export default IsGroupMemberView

const cards = [
  (key: React.Key) => <PortfolioEquitySummaryCard key={key} />,
  // (key: React.Key) => <LastPurchaseSummaryCard key={key} />,
  (key: React.Key) => <VsMarketSummaryCard key={key} />,
  // (key: React.Key) => <TopPerformerSummaryCard key={key} />,
]
