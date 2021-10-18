// TODO
// - order holdings list by size
// - pin overall summary to bottom of the card

import { pnlTextColor } from "@utils/pnlTextColor"
import React, { useEffect, useState } from "react"
import { useAuth } from "@hooks"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { getGroupData } from "@lib/firebase/client/db"
import { getStockHoldingData } from "@lib/firebase/client/db"
import { usePrevious } from "@hooks/usePrevious"

// TODO: Create a card for displaying the current holding information & splits by group on interaction
export default function TickerHoldingCard({ holding, tickerSymbol }) {
  const [groupHoldings, setHoldings] = useState(Array())
  const [userGroups, setGroups] = useState(null)
  const { user } = useAuth()
  const [groupMemberCount, setGroupMemberCount] = useState({})
  const prevSymbol = usePrevious(tickerSymbol)

  useEffect(() => {
    if (user?.groups) {
      setGroups(user?.groups)
    }
  }, [user?.groups])

  useEffect(() => {
    if (userGroups) {
      userGroups.map((group) => {
        getGroupData(group).then((data) =>
          setGroupMemberCount((prev) => ({ ...prev, [group]: data?.investorCount }))
        )
      })
    }
  }, [userGroups])

  useEffect(() => {
    if (holding?.qty && user?.groups) {
      // if groupHoldings!=null then set to null to avoid duplicates on qty change
      if (groupHoldings) setHoldings(Array())

      user?.groups?.map((groupName) => {
        getStockHoldingData(groupName, tickerSymbol).then((data) => {
          setHoldings((prev) => [...prev, { ...data, groupName }])
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.groups, holding?.qty])

  useEffect(
    () => prevSymbol !== tickerSymbol && setHoldings(Array()),
    [prevSymbol, tickerSymbol]
  )

  return (
    <div className="mt-4 mb-2 bg-white shadow-lg standalone:container grid grid-rows-[4fr,1fr] sm:mt-2 rounded-2xl dark:bg-gray-800">
      <div className="flex flex-col w-full p-2">
        <span className="text-xl text-gray-700 leading-0 dark:text-white">
          My Position
        </span>
        <div className="flex items-center"></div>
        <div className="divide-y divide-gray-700">
          {groupHoldings?.map((details, i) =>
            details.qty ? (
              <div
                className="flex items-center justify-between px-1"
                key={`position-${i}`}
              >
                <span className="font-semibold text-brand">{details.groupName}:</span>
                <span className="text-xl font-semibold text-gray-700">
                  {(
                    (parseFloat(details.qty) * parseFloat(holding.currentPrice)) /
                    groupMemberCount[details.groupName]
                  ).toFixed(2)}
                </span>
                <span>
                  {(
                    parseFloat(details.qty) / groupMemberCount[details.groupName]
                  ).toFixed(2)}
                  <p className="text-gray-400 text-tiny ">shares</p>
                </span>
              </div>
            ) : null
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between space-x-3 bg-brand-light rounded-b-2xl">
        <div className="flex flex-col pt-1 pl-3">
          <div
            className={`flex items-center text-sm pb-0.5 ${pnlTextColor(
              parseFloat(holding?.unrealizedPlpc)
            )}`}
          >
            {parseFloat(holding?.unrealizedPlpc) > 0 ? <FaCaretUp /> : <FaCaretDown />}
            <span>{(holding?.unrealizedPlpc * 100)?.toFixed(2)}%</span>
          </div>
          <p className="flex justify-center text-gray-400  text-tiny -pb-0.5 ">
            overall
          </p>
        </div>
        <div>
          <p className="text-3xl font-semibold text-gray-700 dark:text-gray-100">
            <span className="text-sm">$</span>
            {parseFloat(holding?.marketValue).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col pt-1 pr-3">
          <span>{parseFloat(holding?.qty)?.toFixed(2)}</span>
          <p className="flex justify-center text-gray-400 text-tiny -pb-0.5 ">shares</p>
        </div>
      </div>
    </div>
  )
}
