import React from "react"
import { View } from "react-native"
import Animated, { useAnimatedProps } from "react-native-reanimated"
import { mixPath, Vector } from "react-native-redash"
import Svg, { Path } from "react-native-svg"
import tw from "../../lib/tailwind"
import { Graphs } from "../../screens/stocks/stock"
import { TabLabel, WIDTH } from "./constants"
import Cursor from "./Cursor"

export const AnimatedPath = Animated.createAnimatedComponent(Path)

export const Chart: React.FC<{
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
