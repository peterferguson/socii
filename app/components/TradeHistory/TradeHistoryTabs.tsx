import { Tab } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import { useAccountActivities } from "../../hooks/useAccountActivities"
import { TradeActivityCard } from "./TradeActivityCard"
import { NTAActivityCard } from "./NTAActivityCard"
import { activityTypeMapping } from "./TradeHistory"
import { TabHeading } from "../TabHeading"
import { TabPanels } from "../TabPanels"

export const TradeHistoryTabs = () => {
  let [categories, setCategories] = useState({
    Trades: [],
    Cash: [],
    General: [],
  })
  const [selected, setSelected] = useState("Trades")

  const { activities } = useAccountActivities({})

  useEffect(() => {
    activities.length &&
      setCategories((prev) => ({
        ...prev,
        [selected]: prev[selected]?.push?.(activities),
      }))
  }, [activities, selected])

  // TODO: Paginate the activities
  return (
    <div className="w-full max-w-md px-2 pt-4 pb-16 sm:max-w-xl sm:px-0 font-primary">
      <Tab.Group onChange={(index) => setSelected(Object.keys(categories)[index])}>
        <TabHeading categories={categories} />
        <TabPanels categories={categories}>
          <ul>
            {activities.length ? (
              activities
                .filter((a) => activityTypeMapping[selected].includes(a.activityType))
                .map((activity, idx) =>
                  selected === "Trades" || activity?.activityType === "JNLS" ? (
                    <TradeActivityCard key={`activity-${idx}`} activity={activity} />
                  ) : (
                    <NTAActivityCard key={`activity-${idx}`} activity={activity} />
                  )
                )
            ) : (
              <li className="relative flex items-center p-3 rounded-xl hover:bg-gray-50">
                Nothing to show here yet
              </li>
            )}
          </ul>
        </TabPanels>
      </Tab.Group>
    </div>
  )
}
