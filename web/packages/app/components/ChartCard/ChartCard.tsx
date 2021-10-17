import React, { useEffect, useState } from "react"
import { useWindowDimensions, View, Text } from "react-native"
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
import tw from "../../lib/tailwind"
import { OHLCTimeseries } from "../../models/OHLCTimseries"
import { buildGraph, GraphData } from "../../utils/buildGraph"
import {
  getYahooTimeseries,
  IntervalEnum,
  PeriodEnum,
} from "../../utils/getYahooTimeseries"
import Cursor from "./Cursor"

interface ITickerPageLineChartProps {
  symbol: string
  timeseries: OHLCTimeseries
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

const ChartCard: React.FC<ITickerPageLineChartProps> = ({
  symbol,
  timeseries,
  logoColor,
}) => {
  const [graphs, setGraphs] = useState<Graphs>({
    "1D": {
      graphData: timeseries.length ? buildGraph(timeseries) : null,
      timeseries: timeseries.length ? timeseries : null,
    },
    "7D": { graphData: null, timeseries: null },
    "1M": { graphData: null, timeseries: null },
    "6M": { graphData: null, timeseries: null },
    "1Y": { graphData: null, timeseries: null },
    MAX: { graphData: null, timeseries: null },
  })

  const { width: WINDOW_WIDTH } = useWindowDimensions()
  const BUTTON_WIDTH = (WINDOW_WIDTH - 32) / Object.keys(graphs).length

  const activeTab = useSharedValue<TabLabel>("1D")

  const translation = useVector()
  const transition = useSharedValue(0)
  const prevTab = usePrevious(activeTab)
  const animatedProps = useAnimatedProps(() => {
    console.log("animatedProps")

    if (!graphs[activeTab.value].graphData?.path) return { d: "" }
    console.log("correct animatedProps")

    const prevPath = graphs[prevTab.value].graphData?.path
    const nextPath = graphs[activeTab.value].graphData?.path
    return { d: mixPath(transition.value, prevPath, nextPath) }
  })

  console.log(animatedProps)

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(
          BUTTON_WIDTH * Object.keys(graphs).indexOf(activeTab.value)
        ),
      },
    ],
  }))

  // TODO: refactor into custom hook
  useEffect(() => {
    if (!graphs[activeTab.value].timeseries?.length)
      getYahooTimeseries({
        tickers: [symbol],
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
      }).then((ts) =>
        setGraphs((prevTabs) => ({
          ...prevTabs,
          [activeTab.value]: {
            timseries: ts[symbol],
            graphData: buildGraph(ts[symbol]),
          },
        }))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab.value])

  // useEffect(() => console.log(graphs), [graphs])

  return (
    <View
      style={tw`my-2 p-4 mx-4 bg-white min-h-[400px] rounded-2xl flex flex-col justify-center items-center`}
    >
      <View style={{ height: (2 * WINDOW_WIDTH) / 3 }}>
        {graphs[activeTab.value].graphData?.path && (
          <Svg width={(21 * WINDOW_WIDTH) / 24} height={(2 * WINDOW_WIDTH) / 3}>
            <AnimatedPath
              animatedProps={animatedProps}
              fill="transparent"
              stroke={logoColor}
              strokeWidth={3}
            />
          </Svg>
        )}
        <Cursor
          translation={translation}
          path={graphs[activeTab.value].graphData?.path}
          logoColor={logoColor}
        />
      </View>
      <View style={{ ...tw`flex-row bg-transparent`, width: WINDOW_WIDTH - 32 }}>
        <View style={tw`absolute inset-0`}>
          <Animated.View
            style={[
              { backgroundColor: logoColor, width: BUTTON_WIDTH, ...tw`rounded-full` },
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
            <Animated.View style={{ ...tw`pt-8`, width: BUTTON_WIDTH }}>
              <Text style={{ ...tw`text-center font-poppins-600`, color: logoColor }}>
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
