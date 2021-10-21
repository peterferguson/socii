import React from "react"
import { Dimensions, Text, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { mixPath, Vector } from "react-native-redash"
import Svg, { Path } from "react-native-svg"
import { usePrevious } from "../../hooks/usePrevious"
import tw from "../../lib/tailwind"
import { Graphs } from "../../screens/stocks/stock"
import { PeriodEnum } from "../../utils/getYahooTimeseries"
import Cursor from "./Cursor"

type TabLabel = keyof typeof PeriodEnum
interface IAssetPageLineChartProps {
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
  graphs: Graphs
  activeGraph: Animated.SharedValue<TabLabel>
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const tabs = ["1D", "7D", "1M", "6M", "1Y", "MAX"] as TabLabel[]
const { width: WINDOW_WIDTH } = Dimensions.get("window")
const WIDTH = WINDOW_WIDTH - 64
const BUTTON_WIDTH = (WIDTH - 32) / tabs.length

const ChartCard: React.FC<IAssetPageLineChartProps> = ({
  logoColor,
  translation,
  graphs,
  activeGraph,
}) => {
  const prevTab = usePrevious(activeGraph)
  const transition = useSharedValue(0)
  const animatedProps = useAnimatedProps(() => {
    const prevPath = graphs[prevTab?.value ?? "1D"].graphData?.path
    const nextPath = graphs[activeGraph.value].graphData?.path
    return {
      d:
        nextPath || prevPath
          ? mixPath(transition.value, prevPath, nextPath, Animated.Extrapolate.CLAMP)
          : "",
    }
  })

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(BUTTON_WIDTH * tabs.indexOf(activeGraph.value)) },
      ],
    }
  })

  // const { minPrice, maxPrice } = graphs[activeGraph.value].graphData || {}
  const firstPrice = graphs[activeGraph.value].timeseries?.[0].close || 0
  const lastPrice = graphs[activeGraph.value].timeseries?.slice().pop().close || 0
  const firstPoint = graphs[activeGraph.value].graphData?.path.curves[0].c2.y || 0
  const lastPoint =
    graphs[activeGraph.value].graphData?.path.curves.slice().pop().c2.y || 0

  // console.log(graphs[activeGraph.value].timeseries)
  return (
    <View
      style={tw`my-2 mx-4 bg-white min-h-[400px] rounded-2xl flex flex-1 flex-col justify-center items-center`}
    >
      <View style={{ height: WIDTH - 56, width: WIDTH - 96, ...tw`-ml-16 mb-8` }}>
        {/* {[
          { price: firstPrice, point: firstPoint },
          { price: lastPrice, point: lastPoint },
        ].map(({ price, point }, index) => (
          <Text
            style={{
              ...tw`text-tiny p-1 font-poppins-800`,
              paddingTop: point > (WIDTH - 56) / 2 ? 0 : 4,
              position: "absolute",
              color: logoColor,
              top: point,
              left: index === 0 ? -32 : WIDTH - 46,
            }}
          >
            {parseFloat(price?.toFixed(2)) || null}
          </Text>
        ))} */}
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
          path={graphs[activeGraph.value].graphData?.path}
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
              prevTab.value = activeGraph.value
              transition.value = 0
              activeGraph.value = label
              transition.value = withTiming(1)
            }}
          >
            <Animated.View style={{ width: BUTTON_WIDTH }}>
              <Text
                style={{
                  ...tw`text-center font-poppins-600 text-xs`,
                  color: label === activeGraph.value ? "white" : logoColor,
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
