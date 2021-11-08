// TODO: Once the limitations of running js on the ui thread as a worklet in reanimated is
// TODO: resolved, we can return to using the dayjs version.
// import dayjs from "dayjs"
// import calendar from "dayjs/plugin/calendar"
import React from "react"
import { Text, View } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated"
import { ReText, Vector } from "react-native-redash"
import tw from "../lib/tailwind"
import { GraphData, SIZE } from "../utils/buildGraph"
import { shadowStyle } from "../utils/shadowStyle"
import AssetLogo from "./AssetLogo"
import TimeLabel from "./TimeLabel"

// dayjs.extend(calendar)

const PriceCard: React.FC<{
  symbol: string
  isin: string
  shortName: string
  graphData: GraphData
  translation: Vector<Animated.SharedValue<number>>
  priceForComparison: number
}> = ({ symbol, isin, shortName, graphData, translation, priceForComparison }) => {
  const { minTimestamp, maxTimestamp, minPrice, maxPrice } = graphData || {}

  // TODO: get the length of the graph so that we can use the interpolation to plot the actual price & timestamp!
  // TODO: need to know when the graph is being dragged so we can go back to the initial values after animation
  const price = useDerivedValue(() => {
    const priceValue = interpolate(
      translation.y.value,
      [0, SIZE],
      [maxPrice, minPrice],
      Extrapolate.CLAMP
    )

    return priceValue.toFixed(2)
  }, [(translation.y.value, maxPrice, minPrice)])

  const time = useDerivedValue(() =>
    interpolate(
      translation.x.value,
      [0, SIZE],
      [minTimestamp, maxTimestamp],
      Extrapolate.CLAMP
    )
  )

  const changePercent = useDerivedValue(() => {
    const percent =
      priceForComparison &&
      (parseFloat(price.value) - priceForComparison) / priceForComparison
    return `${(percent * 100)?.toFixed(2)}%`
  }, [(price.value, priceForComparison)])

  const pnlColorStyle = useAnimatedStyle(() => {
    // - Again has to be done manually because of the way reanimated works
    const pctChange = parseFloat(changePercent.value)
    return { color: pctChange > 0 ? "#10B981" : pctChange < 0 ? "#EF4444" : "#4B5563" }
  })

  return (
    <View
      style={{
        ...tw`p-4 mt-4 mx-4 mb-2 bg-white sm:mt-2 rounded-2xl dark:bg-gray-800`,
        ...shadowStyle("lg"),
      }}
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
            <View style={tw`android:pt-2`}>
              <Text style={tw`text-sm`}>$</Text>
            </View>
            <ReText
              style={tw`mt-4 mb-2 text-4xl font-poppins-500 text-left text-gray-700 dark:text-gray-100`}
              text={price || null}
            />
          </View>
          <TimeLabel chartTimeSharedValue={time} />
        </View>
        <View style={tw`px-1 mt-[3.25rem]`}>
          <ReText style={pnlColorStyle} text={changePercent || null} />
        </View>
      </View>
    </View>
  )
}
export default PriceCard
