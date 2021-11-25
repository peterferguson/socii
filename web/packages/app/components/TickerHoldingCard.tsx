// TODO
// - order holdings list by size
// - pin overall summary to bottom of the card

import { pnlTextColor } from "app/utils/pnlTextColor"
import React, { useEffect, useState } from "react"
import { useAuth, usePrevious } from "app/hooks"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { getGroupData, getStockHoldingData } from "app/lib/firebase/db"
import { View, Text } from "react-native"
import { tw } from "app/lib/tailwind"

// TODO: Create a card for displaying the current holding information & splits by group on interaction
export default function TickerHoldingCard({
  holding,
  tickerSymbol,
  price,
  isPriceLoading,
}) {
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
          setGroupMemberCount((prev) => ({ ...prev, [group]: data.investorCount }))
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
    <View style={tw`mt-4 mb-2 bg-white shadow-lg standalone:container grid grid-rows-[4fr,1fr] sm:mt-2 rounded-2xl dark:bg-gray-800`}>
      <View style={tw`flex flex-col w-full p-2`}>
        <Text style={tw`text-xl text-gray-700 leading-0 dark:text-white`}>
          My Position
        </Text>
        <View style={tw`flex items-center`}></View>
        <View style={tw`divide-y divide-gray-700`}>
          {groupHoldings?.map((details, i) =>
            details.qty ? (
              <View
                style={tw`flex items-center justify-between px-1`}
                key={`position-${i}`}
              >
                <Text style={tw`font-semibold text-brand`}>{details.groupName}:</Text>
                <Text style={tw`text-xl font-semibold text-gray-700`}>
                  {(
                    (parseFloat(details.qty) * parseFloat(holding.currentPrice)) /
                    groupMemberCount[details.groupName]
                  ).toFixed(2)}
                </Text>
                <Text>
                  {(
                    parseFloat(details.qty) / groupMemberCount[details.groupName]
                  ).toFixed(2)}
                  <p style={tw`text-gray-400 text-tiny `}>shares</p>
                </Text>
              </View>
            ) : null
          )}
        </View>
      </View>
      <View style={tw`flex flex-row items-center justify-between space-x-3 bg-brand-light rounded-b-2xl`}>
        <View style={tw`flex flex-col pt-1 pl-3`}>
          <View
            style={tw`flex items-center text-sm pb-0.5 ${pnlTextColor(
              parseFloat(holding?.unrealizedPlpc)
            )}`}
          >
            {parseFloat(holding?.unrealizedPlpc) > 0 ? <FaCaretUp /> : <FaCaretDown />}
            <Text>{(holding?.unrealizedPlpc * 100)?.toFixed(2)}%</Text>
          </View>
          <p style={tw`flex justify-center text-gray-400  text-tiny -pb-0.5 `}>
            overall
          </p>
        </View>
        <View>
          <p style={tw`text-3xl font-semibold text-gray-700 dark:text-gray-100`}>
            <Text style={tw`text-sm`}>$</Text>
            {parseFloat(holding?.marketValue).toFixed(2)}
          </p>
        </View>
        <View style={tw`flex flex-col pt-1 pr-3`}>
          <Text>{parseFloat(holding?.qty)?.toFixed(2)}</Text>
          <p style={tw`flex justify-center text-gray-400 text-tiny -pb-0.5 `}>shares</p>
        </View>
      </View>
    </View>
  )
}
