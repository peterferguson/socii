import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import React from "react"
import { Text, View } from "react-native"
import tw from "../lib/tailwind"
import AssetLogo from "./AssetLogo"
import Animated, { useAnimatedStyle, useDerivedValue } from "react-native-reanimated"
import { ReText } from "react-native-redash"
import { pnlTextColor } from "../utils/pnlTextColor"

dayjs.extend(calendar)

const PriceCard: React.FC<{
  symbol: string
  isin: string
  shortName: string
  price: Animated.SharedValue<number>
  timestamp: Animated.SharedValue<number>
  changePercent: Animated.SharedValue<number>
}> = ({ symbol, isin, shortName, price, changePercent, timestamp }) => {
  const priceValue = useDerivedValue(() => price.value?.toFixed(2))
  const time = useDerivedValue(() => dayjs(timestamp.value * 1000).calendar())
  const changePct = useDerivedValue(() => `${(changePercent.value * 100)?.toFixed(2)}%`)

  const pnlColorStyle = useAnimatedStyle(() => ({
    color: tw`${pnlTextColor(changePercent.value)}`.color as string,
  }))

  return (
    <View
      style={tw`p-4 mt-4 mx-4 mb-2 bg-white shadow-lg sm:mt-2 rounded-2xl dark:bg-gray-800`}
    >
      <View style={tw`flex-row items-center`}>
        <AssetLogo key={symbol} asset={symbol} isin={isin} height="64px" width="64px" />
        <View style={tw`flex flex-col`}>
          <Text
            style={tw`mb-2 ml-2 text-base font-poppins-700 tracking-wider text-gray-700 uppercase dark:text-white`}
          >
            {symbol}
          </Text>
          <Text
            style={tw`ml-2 text-xs font-poppins-600 tracking-wider text-gray-500 uppercase dark:text-white`}
          >
            {shortName}
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-row justify-between `}>
        {/* TODO: loading skeleton */}
        <View style={tw`flex-col items-start pl-1`}>
          <View style={tw`flex-row items-center pl-1`}>
            <View style={tw`pt-2`}>
              <Text style={tw`text-sm`}>$</Text>
            </View>
            <ReText
              style={tw`mt-4 mb-2 text-4xl font-semibold text-left text-gray-700 dark:text-gray-100`}
              text={priceValue || null}
            />
          </View>
          <View>
            <ReText style={tw`text-gray-400 text-tiny`} text={time || null} />
          </View>
        </View>
        <View style={tw`px-1 mt-[3.25rem]`}>
          <ReText style={[tw`text-base`, pnlColorStyle]} text={changePct} />
        </View>
      </View>
    </View>
  )
}
export default PriceCard
