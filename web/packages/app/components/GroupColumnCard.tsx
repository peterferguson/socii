import { useDonutSectors, useGroupCashBalance, useGroupHoldings } from "app/hooks"
import tw from "app/lib/tailwind"
import React from "react"
import { FlatList, View } from "react-native"
import { shadowStyle } from "../utils/shadowStyle"
import CardDonutChart from "./CardDonutChart"
import StockCard from "./StockCard"
import TextDivider from "./TextDivider"
export interface IGroupColumnCard {
  groupName: string
  style?: any
}

export interface Holding {
  ISIN: string
  symbol: string
  shortName: string
  avgPrice: number
  qty: number
  logoColor?: string
}

export default function GroupColumnCard({ groupName, style }: IGroupColumnCard) {
  const cashBalance = useGroupCashBalance(groupName)
  const { data: holdingsInfo, prices } = useGroupHoldings(groupName)

  const donutSectors = useDonutSectors(holdingsInfo, prices)

  const donutRadius = 80
  const donutTextColor = tw`text-brand-black dark:text-brand-gray`.color as string

  const portfolioValue = prices
    ?.map(({ currentPrice, qty }) => currentPrice * qty)
    .reduce((a, b) => a + b, 0)

  const gain =
    (portfolioValue -
      prices?.map(({ avgPrice, qty }) => avgPrice * qty).reduce((a, b) => a + b, 0)) /
    (portfolioValue * 0.01)

  return (
    <View style={tw`flex-col mb-4`}>
      <View
        style={tw.style("flex-col items-center p-4 bg-white rounded-2xl min-h-max", {
          ...shadowStyle("lg"),
          ...style,
        })}
      >
        {/* <CardTitle title={groupName} style={style} /> */}
        <CardDonutChart
          sectors={donutSectors}
          radius={donutRadius}
          textColor={donutTextColor}
          gain={gain}
          cashBalance={cashBalance}
        />
        <TextDivider lineStyles={undefined}>
          {holdingsInfo?.length > 0
            ? `${holdingsInfo?.length} Investments`
            : "No Investments Yet"}
        </TextDivider>
        <View style={tw`w-11/12 my-2`}>
          <FlatList
            data={holdingsInfo?.map((info, i) => ({ ...info, ...prices[i] }))}
            keyExtractor={item => item.symbol}
            renderItem={({ item: holding }) => <StockCard {...holding} />}
          />
        </View>
      </View>
    </View>
  )
}
