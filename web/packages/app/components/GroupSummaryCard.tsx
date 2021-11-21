import { useGroupCashBalance, useDonutSectors, useGroupHoldings } from "app/hooks"
import tw from "app/lib/tailwind"
import React from "react"
import { Dimensions, Pressable, Text, View } from "react-native"
import { useRouter } from "../navigation/use-router"
import { shadowStyle } from "../utils/shadowStyle"
import CardDonutChart from "./CardDonutChart"
import { ChatWithGroupFooter } from "./ChatWithGroup"
import { IGroupColumnCard } from "./GroupColumnCard"

export default ({ groupName, style }: IGroupColumnCard) => {
  const cashBalance = useGroupCashBalance(groupName)
  const { data: holdingInfo, prices } = useGroupHoldings(groupName)
  const donutSectors = useDonutSectors(holdingInfo, prices)

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
        style={tw.style("flex-col items-center p-4 bg-white rounded-t-2xl", {
          ...shadowStyle("lg"),
          ...style,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        })}
      >
        <CardTitle title={groupName} style={style} />
        <CardDonutChart
          sectors={donutSectors}
          radius={donutRadius}
          textColor={donutTextColor}
          gain={gain}
          cashBalance={cashBalance}
          linkTo={groupName}
        />
        {/* TODO: Show top gainer after divider */}
        {/* <TextDivider lineStyles={undefined}>
          {holdings?.length > 0
            ? `${holdings?.length} Investments`
            : "No Investments Yet"}
        </TextDivider> */}
      </View>
      <ChatWithGroupFooter groupName={groupName} />
    </View>
  )
}

const { width: WINDOW_WIDTH } = Dimensions.get("window")

const CARD_WIDTH = WINDOW_WIDTH - 64

const CardTitle = ({ title, style }) => {
  const router = useRouter()
  return (
    <View
      style={tw.style("items-center justify-center flex-col m-0 sm:m-4 mb-2 sm:mb-4", {
        ...style,
        width: CARD_WIDTH,
      })}
    >
      <Pressable onPress={() => router.push(`/groups/${title}`)}>
        <Text
          style={tw.style(
            "text-4xl text-center text-brand-black z-10 top-2 font-poppins-600",
            "umami--click--group-pie-chart-title"
          )}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  )
}
