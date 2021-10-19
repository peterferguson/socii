import React, { useEffect, useState } from "react"
import { Dimensions, Text, useWindowDimensions, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { mixPath, useVector } from "react-native-redash"
import Svg, { Path } from "react-native-svg"
import { usePrevious } from "../../hooks/usePrevious"
import { useTimeseries } from "../../hooks/useTimeseries"
import tw from "../../lib/tailwind"
import { OHLCTimeseries } from "../../models/OHLCTimseries"
import { buildGraph, GraphData } from "../../utils/buildGraph"
import { IntervalEnum, PeriodEnum } from "../../utils/getYahooTimeseries"
import Cursor from "./Cursor"

interface ITickerPageLineChartProps {
  symbol: string
  logoColor: string
}

type TabLabel = keyof typeof PeriodEnum
type Graphs = {
  [label in TabLabel]+?: {
    graphData: GraphData
    timeseries: OHLCTimeseries
  }
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const tabs = ["1D", "7D", "1M", "6M", "1Y", "MAX"] as TabLabel[]
const { width: WINDOW_WIDTH } = Dimensions.get("window")
const WIDTH = WINDOW_WIDTH - 64
const BUTTON_WIDTH = (WIDTH - 32) / tabs.length

const ChartCard: React.FC<ITickerPageLineChartProps> = ({ symbol, logoColor }) => {
  const [graphs, setGraphs] = useState<Graphs>({
    "1D": { graphData: null, timeseries: null },
    "7D": { graphData: null, timeseries: null },
    "1M": { graphData: null, timeseries: null },
    "6M": { graphData: null, timeseries: null },
    "1Y": { graphData: null, timeseries: null },
    MAX: { graphData: null, timeseries: null },
  })

  const activeTab = useSharedValue<TabLabel>("1D")
  const translation = useVector()
  const transition = useSharedValue(0)
  const prevTab = usePrevious(activeTab)

  const { timeseries, isLoading, isError } = useTimeseries({
    symbols: [symbol],
    period: PeriodEnum[activeTab.value],
    interval:
      IntervalEnum[
        activeTab.value === "1D"
          ? "5m"
          : activeTab.value.includes("D")
          ? "30m"
          : activeTab.value.includes("MAX")
          ? "1W"
          : "1D"
      ],
  })

  useEffect(() => {
    if (!isLoading && !isError)
      setGraphs((prevTabs) => ({
        ...prevTabs,
        [activeTab.value]: {
          timseries: timeseries,
          // @ts-ignore
          // - here we are using a single timeseries so ignoring this
          graphData: buildGraph(timeseries),
        },
      }))
  }, [activeTab.value, timeseries, isLoading, isError])

  const animatedProps = useAnimatedProps(() => {
    const prevPath = graphs[prevTab?.value ?? "1D"].graphData?.path
    const nextPath = graphs[activeTab.value].graphData?.path
    return {
      d: nextPath && prevPath ? mixPath(transition.value, prevPath, nextPath) : "",
    }
  })

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(BUTTON_WIDTH * tabs.indexOf(activeTab.value)) },
      ],
    }
  })

  return (
    <View
      style={tw`my-2 mx-4 bg-white min-h-[400px] rounded-2xl flex flex-1 flex-col justify-center items-center`}
    >
      <View style={{ height: WIDTH - 56, width: WIDTH - 48, ...tw`-ml-8 mb-8` }}>
        <Svg width={WIDTH} height={WIDTH}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke={logoColor}
            strokeWidth={3}
          />
        </Svg>

        <Cursor
          translation={translation}
          path={graphs[activeTab.value].graphData?.path}
          logoColor={logoColor}
        />
      </View>
      <View
        style={{
          ...tw`flex-row`,
          width: WIDTH - 32,
        }}
      >
        <View style={tw`absolute inset-0`}>
          <Animated.View
            style={[
              {
                backgroundColor: logoColor,
                width: (3.5 * BUTTON_WIDTH) / 5,
                height: (3.5 * BUTTON_WIDTH) / 5,
                ...tw`rounded-full`,
                marginLeft: (7 / 50) * BUTTON_WIDTH,
                marginTop: (-11 / 50) * BUTTON_WIDTH,
              },
              style,
            ]}
          />
        </View>
        {(Object.keys(graphs) as TabLabel[]).map((label) => (
          <TouchableWithoutFeedback
            key={label}
            onPress={() => {
              prevTab.value = activeTab.value
              transition.value = 0
              activeTab.value = label
              transition.value = withTiming(1)
            }}
          >
            <Animated.View style={{ width: BUTTON_WIDTH }}>
              <Text
                style={{
                  ...tw`text-center font-poppins-600 text-xs`,
                  color: label === activeTab.value ? "white" : logoColor,
                }}
              >
                {label}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  )
}

export default ChartCard
