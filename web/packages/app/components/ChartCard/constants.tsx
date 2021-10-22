import { PeriodEnum } from "../../utils/getYahooTimeseries"
import { Dimensions } from "react-native"
import { Graphs } from "../../screens/stocks/stock"
import { Vector } from "react-native-redash"
import Animated from "react-native-reanimated"

export interface IAssetPageLineChartProps {
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
  graphs: Graphs
  prevTab: Animated.SharedValue<TabLabel>
  activeTab: Animated.SharedValue<TabLabel>
  transition: Animated.SharedValue<number>
  handleTabPress: (tab: TabLabel) => () => void
}

export type TabLabel = keyof typeof PeriodEnum

export const tabs = ["1D", "7D", "1M", "6M", "1Y", "MAX"] as TabLabel[]

const { width: WINDOW_WIDTH } = Dimensions.get("window")
export const WIDTH = WINDOW_WIDTH - 64
export const BUTTON_WIDTH = (WIDTH - 32) / tabs.length
