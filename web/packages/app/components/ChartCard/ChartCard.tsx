import React from "react"
import { Dimensions, Text, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import { mixPath, Vector } from "react-native-redash"
import Svg, { Path } from "react-native-svg"
import tw from "../../lib/tailwind"
import { Graphs } from "../../screens/stocks/stock"
import { PeriodEnum } from "../../utils/getYahooTimeseries"
import Cursor from "./Cursor"

type TabLabel = keyof typeof PeriodEnum
interface IAssetPageLineChartProps {
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
  graphs: Graphs
  prevTab: Animated.SharedValue<TabLabel>
  activeTab: Animated.SharedValue<TabLabel>
  transition: Animated.SharedValue<number>
  handleTabPress: (tab: TabLabel) => () => void
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
      <TabRow logoColor={logoColor} activeTab={activeTab}>
        {(Object.keys(graphs) as TabLabel[]).map((label) => (
          <TabButton
            {...{ label, activeTab, logoColor, handlePress: handleTabPress(label) }}
          />
        ))}
      </TabRow>
    </View>
  )
}

const Chart: React.FC<{
  graphs: Graphs
  prevTab: Animated.SharedValue<TabLabel>
  activeTab: Animated.SharedValue<TabLabel>
  transition: Animated.SharedValue<number>
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
}> = ({ graphs, prevTab, activeTab, transition, logoColor, translation }) => {
  const animatedProps = useAnimatedProps(() => {
    const prevPath = graphs[prevTab?.value ?? "1D"].graphData?.path
    const nextPath = graphs[activeTab.value].graphData?.path
    return {
      d:
        nextPath || prevPath
          ? mixPath(transition.value, prevPath, nextPath, Animated.Extrapolate.CLAMP)
          : "",
    }
  })

  React.useEffect(() => console.log(activeTab.value), [activeTab.value])

  // const { minPrice, maxPrice } = graphs[activeTab.value].graphData || {}
  // const firstPrice = graphs[activeTab.value].timeseries?.[0].close || 0
  // const lastPrice = graphs[activeTab.value].timeseries?.slice().pop().close || 0
  // const firstPoint = graphs[activeTab.value].graphData?.path.curves[0].c2.y || 0
  // const lastPoint =
  //   graphs[activeTab.value].graphData?.path.curves.slice().pop().c2.y || 0

  return (
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
        path={graphs[activeTab.value].graphData?.path}
        logoColor={logoColor}
      />
    </View>
  )
}

const TabRow: React.FC<{
  logoColor: string
  activeTab: Animated.SharedValue<TabLabel>
}> = ({ children, logoColor, activeTab }) => {
  const buttonBgStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(BUTTON_WIDTH * tabs.indexOf(activeTab.value)) },
      ],
    }
  })

  return (
    <View style={{ ...tw`flex-row`, width: WIDTH - 32 }}>
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
            buttonBgStyle,
          ]}
        />
      </View>
      {children}
    </View>
  )
}

const TabButton: React.FC<{
  label: TabLabel
  activeTab: Animated.SharedValue<string>
  logoColor: string
  handlePress: () => void
}> = ({ label, activeTab, logoColor, handlePress }) => {
  const buttonTextstyle = useAnimatedStyle(() => ({
    color: label === activeTab.value ? "white" : logoColor,
  }))

  React.useEffect(
    () => console.log(label === activeTab.value),
    [label, activeTab.value]
  )

  return (
    <TouchableWithoutFeedback key={label} onPress={handlePress}>
      <Animated.View style={{ width: BUTTON_WIDTH }}>
        <Animated.Text
          style={[{ ...tw`text-center font-poppins-600 text-xs` }, buttonTextstyle]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default ChartCard
