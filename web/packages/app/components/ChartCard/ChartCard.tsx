import React from "react"
import { Dimensions, View } from "react-native"
import Animated from "react-native-reanimated"
import { Vector } from "react-native-redash"
import { Path } from "react-native-svg"
import tw from "../../lib/tailwind"
import { Graphs } from "../../screens/stocks/stock"
import { PeriodEnum } from "../../utils/getYahooTimeseries"
import { Chart } from "./Chart"
import { ChartTabButton } from "./ChartTabButton"
import { ChartTabRow } from "./ChartTabRow"

export type TabLabel = keyof typeof PeriodEnum
interface IAssetPageLineChartProps {
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
  graphs: Graphs
  prevTab: Animated.SharedValue<TabLabel>
  activeTab: Animated.SharedValue<TabLabel>
  transition: Animated.SharedValue<number>
  handleTabPress: (tab: TabLabel) => () => void
}

export const AnimatedPath = Animated.createAnimatedComponent(Path)

export const tabs = ["1D", "7D", "1M", "6M", "1Y", "MAX"] as TabLabel[]
const { width: WINDOW_WIDTH } = Dimensions.get("window")
export const WIDTH = WINDOW_WIDTH - 64
export const BUTTON_WIDTH = (WIDTH - 32) / tabs.length

const ChartCard: React.FC<IAssetPageLineChartProps> = ({
  logoColor,
  translation,
  graphs,
  prevTab,
  activeTab,
  transition,
  handleTabPress,
}) => {
  return (
    <View
      style={tw`my-2 mx-4 bg-white min-h-[400px] rounded-2xl flex flex-1 flex-col justify-center items-center`}
    >
      <Chart {...{ graphs, prevTab, activeTab, transition, logoColor, translation }} />
      <ChartTabRow logoColor={logoColor} activeTab={activeTab}>
        {(Object.keys(graphs) as TabLabel[]).map((label) => (
          <ChartTabButton
            {...{ label, activeTab, logoColor, handlePress: handleTabPress(label) }}
          />
        ))}
      </ChartTabRow>
    </View>
  )
}

export default ChartCard
