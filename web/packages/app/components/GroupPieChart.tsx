// import DonutChart from "@components/DonutChart"
import tw from "../lib/tailwind"
import { View, Text, Pressable } from "react-native"
import React from "react"
import { useRouter } from "../navigation/use-router"
// import { LoadingIndicator } from "stream-chat-react"

export interface IGroupPieChart {
  groupName: string
  holdingData: any
  currentPrices: any
  cashBalance: number
  radius?: number
  style?: any
}

export default function GroupPieChart({
  groupName,
  holdingData,
  currentPrices,
  cashBalance,
  radius = 250,
  style = {},
}: IGroupPieChart) {
  const router = useRouter()
  const portfolioValue = holdingData
    ?.map(({ symbol, qty }) => currentPrices?.[symbol] * qty)
    .reduce((a, b) => a + b, 0)

  const gain =
    ((portfolioValue -
      holdingData
        ?.map(({ avgPrice, qty }) => avgPrice * qty)
        .reduce((a, b) => a + b, 0)) *
      100) /
    portfolioValue

  const pieData = holdingData?.map(({ symbol, shortName, qty }) => ({
    theta: (currentPrices?.[symbol] * qty) / portfolioValue,
    label: shortName,
    subLabel: symbol,
  }))

  return (
    <View
      style={tw.style(
        "w-88 sm:w-full items-center justify-center flex-col m-0 sm:m-4 mb-2 sm:mb-4",
        style
      )}
    >
      <Pressable onPress={() => router.push(`/groups/${groupName}`)}>
        <Text
          style={tw.style(
            "text-4xl text-center text-brand-black z-10 top-2 font-poppins-600",
            "umami--click--group-pie-chart-title"
          )}
        >
          {groupName}
        </Text>
      </Pressable>
      {/* {pieData?.length && portfolioValue ? (
        <DonutChart
          className="relative z-0 -mt-6 min-h-[280px]"
          data={pieData}
          scaling={0.35}
          scaleToWindow={true}
          radius={radius}
          text={{
            portfolio: `$${portfolioValue?.toFixed(2)}`,
            gain: `${gain.toFixed(2)}%`,
            cash: `$${cashBalance?.toFixed(2)}`,
          }}
        />
      ) : // <div className="grid place-items-center h-72">
      //   <LoadingIndicator color="#3fba" size={200} />
      // </div>
      null} */}
    </View>
  )
}
