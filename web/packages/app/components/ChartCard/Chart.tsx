import React from "react"
import { Text, View } from "react-native"
import Animated, { useAnimatedProps, withSpring } from "react-native-reanimated"
import { mixPath, Vector } from "react-native-redash"
import Svg, { Path } from "react-native-svg"
import tw from "../../lib/tailwind"
import { Graph } from "../../hooks/useGraph"
import { WIDTH } from "./constants"
import Cursor from "./Cursor"

export const AnimatedPath = Animated.createAnimatedComponent(Path)

export const Chart: React.FC<{
  currentGraph: Graph
  fetchingGraph: boolean
  lastGraph: Graph
  transition: Animated.SharedValue<number>
  logoColor: string
  translation: Vector<Animated.SharedValue<number>>
}> = ({
  currentGraph,
  lastGraph,
  transition,
  fetchingGraph,
  logoColor,
  translation,
}) => {
  const animatedProps = useAnimatedProps(() => {
    // TODO: this is failing since the two paths dont have the same length
    const prevPath = lastGraph?.graphData?.path
    const nextPath = currentGraph?.graphData?.path
    // - on initial load -> no graph data show SOME loading animation
    // - on first graph load -> show graph
    // - on graph change & still fetching -> show graph pulsing
    // - on graph change & graph ready -> mixPaths animation

    if (!(nextPath && prevPath)) return { d: "", strokeWidth: 0 }

    if (fetchingGraph || nextPath === prevPath) {
      return {
        d: mixPath(1, prevPath, prevPath, Animated.Extrapolate.CLAMP),
        strokeWidth: withSpring(3),
      }
    }

    return {
      d: mixPath(transition.value, prevPath, nextPath, Animated.Extrapolate.CLAMP),
      strokeWidth: 3,
    }
  })
  // const { minPrice, maxPrice } = currentGraph.graphData || {}

  return (
    <View style={{ height: WIDTH - 56, width: WIDTH - 96, ...tw`-ml-16 mb-8` }}>
      <Svg width={WIDTH} height={WIDTH}>
        <AnimatedPath
          animatedProps={animatedProps}
          fill="transparent"
          stroke={logoColor}
        />
      </Svg>
      {/* <FixedAxisEndpointLabels
        {...{
          firstPrice: currentGraph.timeseries?.[0].close || 0,
          lastPrice: currentGraph.timeseries?.slice().pop().close || 0,
          firstPoint: currentGraph.graphData?.path.curves[0].c2.y || 0,
          lastPoint:
            currentGraph.graphData?.path.curves.slice().pop().c2.y || 0,
          logoColor,
        }}
      /> */}
      {currentGraph?.graphData?.path.curves.length && (
        <Cursor
          translation={translation}
          path={currentGraph?.graphData?.path}
          logoColor={logoColor}
        />
      )}
    </View>
  )
}

const FixedAxisEndpointLabels = ({
  firstPrice,
  lastPrice,
  firstPoint,
  lastPoint,
  logoColor,
}) => (
  <>
    {[
      { price: firstPrice, point: firstPoint },
      { price: lastPrice, point: lastPoint },
    ].map(({ price, point }, index) => (
      <View
        style={tw.style(`p-1`, {
          paddingTop: point > (WIDTH - 56) / 2 ? 0 : 4,
          position: "absolute",
          top: point,
          left: index === 0 ? -32 : WIDTH - 46,
        })}
      >
        <Text style={tw.style(`text-tiny font-poppins-800`, { color: logoColor })}>
          {parseFloat(price?.toFixed(2)) || null}
        </Text>
      </View>
    ))}
  </>
)
