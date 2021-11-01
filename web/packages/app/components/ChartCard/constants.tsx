import { Dimensions } from "react-native"
import { PeriodEnum } from "../../utils/getYahooTimeseries"

export type TabLabel = keyof typeof PeriodEnum

export const tabs = ["1D", "7D", "1M", "6M", "1Y", "MAX"] as TabLabel[]

const { width: WINDOW_WIDTH } = Dimensions.get("window")
export const WIDTH = WINDOW_WIDTH - 64
export const BUTTON_WIDTH = (WIDTH - 32) / tabs.length
