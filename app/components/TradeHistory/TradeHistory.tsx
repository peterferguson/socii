import { Tab } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import { useAccountActivities } from "@hooks/useAccountActivities"
import { transferToNTAActivity } from "@utils/transferToNTAActivity"
import { TradeActivityCard } from "./TradeActivityCard"
import { NTAActivityCard } from "./NTAActivityCard"
import { TabHeading } from "../TabHeading"
import { TabPanels } from "../TabPanels"
import { useTransfers } from "@hooks/useTransfers"

const activityTypeMapping = {
  Trades: ["FILL"],
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

export const TradeHistory = () => {
  let [categories, setCategories] = useState({
    Trades: [],
    Cash: [],
    General: [],
  })
  const [selected, setSelected] = useState("Trades")

  const { activities } = useAccountActivities({})
  const { transfers } = useTransfers()

  useEffect(() => {
    activities.length &&
      transfers.length &&
      setCategories((prev) => {
        const filtered = Object.keys(prev).reduce((acc, key) => {
          activities.filter((activity) => {
            if (
              activityTypeMapping[key].includes(activity.activityType) &&
              !prev[key]?.map(({ id }) => id).includes(activity.id)
            ) {
              prev[key].push(activity)
            }
            if (key === "Cash") {
              transfers.map(
                (transfer) =>
                  !prev[key]?.map(({ id }) => id).includes(transfer.id) &&
                  prev[key].push(transferToNTAActivity(transfer))
              )
            }
          })

          return acc
        }, {})
        return { ...prev, ...filtered }
      })
  }, [activities, transfers])

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

export default TradeHistory
