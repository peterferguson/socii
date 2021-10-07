import { Tab } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import { transferToNTAActivity } from "@utils/transferToNTAActivity"
import { TradeActivityCard } from "./GroupTradeActivityCard"
import { NTAActivityCard } from "./NTAActivityCard"
import { TabHeading } from "../TabHeading"
import { TabPanels } from "../TabPanels"
import { useGroupAccountActivities } from "@hooks/useGroupAccountActivities"

// TODO correct for other activity types
const activityTypeMapping = {
  Trades: ["success"],
  Cash: ["ACATC", "ACATS", "CSD", "CSR", "CSW"],
  General: [
    "INT",
    "JNLC",
    "JNLS",
    "MA",
    "NC",
    "PTC",
    "REORG",
    "SSO",
    "SSP",
    "DIV",
    "DIVCGL",
    "DIVCGS",
    "DIVNRA",
    "DIVROC",
    "DIVTXEX",
  ],
}

export const GroupTradeHistory = ( {groupName} ) => {
  let [categories, setCategories] = useState({
    Trades: [],
    Cash: [],
    General: [],
  })
  const [selected, setSelected] = useState("Trades")

  const { activities } = useGroupAccountActivities(groupName)

  useEffect(() => {
    
    activities.length &&
      setCategories((prev) => {
        const filtered = Object.keys(prev).reduce((acc, key) => {
           activities.filter((activity) => {
             if (
               activityTypeMapping[key].includes(activity.executionStatus) &&
               !prev[key]?.map(({ messageId }) => messageId).includes(activity.messageId)
             ) {
              prev[key].push(activity)
              }
            //  if (key === "Cash") {
            //    transfers.map(
            //      (transfer) =>
            //        !prev[key]?.map(({ id }) => id).includes(transfer.id) &&
            //        prev[key].push(transferToNTAActivity(transfer))
            //    )
            //  }
           })

          return acc
        }, {})
        return { ...prev, ...filtered }
      })
  }, [activities])

  // TODO: Paginate the activities
  return (
    <>
      <h2 className="pl-2 text-2xl text-gray-500 font-primary">Activity</h2>
      <div className="w-full max-w-md px-2 pt-4 pb-16 sm:max-w-xl sm:px-0 font-primary">
        <Tab.Group onChange={(index) => setSelected(Object.keys(categories)[index])}>
          <TabHeading categories={categories} />
          <TabPanels categories={categories} panelBackgroundColor={"white"}>
            <ul>
              {categories[selected]?.length ? (
                categories[selected]?.map((activity, idx) =>
                  (activity && selected === "Trades") ||
                  activity?.activityType === "JNLS" ? (
                    <TradeActivityCard key={`activity-${idx}`} activity={activity} />
                  ) : (
                    <NTAActivityCard key={`activity-${idx}`} activity={activity} />
                  )
                )
              ) : (
                <NothingToShow />
              )}
            </ul>
          </TabPanels>
        </Tab.Group>
      </div>
    </>
  )
}

const NothingToShow = () => (
  <li className="relative flex items-center p-3 rounded-xl hover:bg-gary-200">
    Nothing to show here yet
  </li>
)

export default GroupTradeHistory
