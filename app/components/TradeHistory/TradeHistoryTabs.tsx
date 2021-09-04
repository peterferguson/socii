import { Tab } from "@headlessui/react"
import React, { useEffect, useState } from "react"
import { tw } from "@utils/tw"
import { useAccountActivities } from "../../hooks/useAccountActivities"
import { TradeActivityCard } from "./TradeActivityCard"
import { NTAActivityCard } from "./NTAActivityCard"
import { activityTypeMapping } from "./TradeHistory"

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
        <Tab.List className="flex p-1 space-x-1 bg-gray-300/20 rounded-2xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                tw(
                  "w-full py-2.5 text-sm leading-5 font-medium text-brand rounded-xl",
                  "focus:outline-none",
                  selected
                    ? "bg-white shadow"
                    : "text-brand/60 hover:bg-white/20 hover:text-black"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.keys(categories).map(([category], idx) => (
            <Tab.Panel
              key={idx}
              className="p-3 bg-white rounded-2xl focus:outline-none"
            >
              <ul>
                {activities.length ? (
                  activities
                    .filter((a) =>
                      activityTypeMapping[selected].includes(a.activityType)
                    )
                    .map((activity, idx) =>
                      selected === "Trades" || activity?.activityType === "JNLS" ? (
                        <TradeActivityCard
                          key={`activity-${category}-${idx}`}
                          activity={activity}
                        />
                      ) : (
                        <NTAActivityCard
                          key={`activity-${category}-${idx}`}
                          activity={activity}
                        />
                      )
                    )
                ) : (
                  <li className="relative flex items-center p-3 rounded-xl hover:bg-gray-50">
                    Nothing to show here yet
                  </li>
                )}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
