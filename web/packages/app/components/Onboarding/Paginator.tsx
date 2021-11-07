import tw from "app/lib/tailwind"
import React from "react"
import { View, useWindowDimensions } from "react-native"
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from "react-native-reanimated"
import { CenteredRow } from ".."

const DOT_WIDTH = 10
const DOT_HEIGHT = 10

export default ({
  data,
  scrollX,
}: {
  data: any[]
  scrollX: Animated.SharedValue<number>
}) => {
  const { width } = useWindowDimensions()
  return (
    <CenteredRow style={tw.style(`h-16`, { flex: 1 })}>
      {data.map((_, i) => {
        const fluidDotStyle = useAnimatedStyle(() => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
          const dotWidth = interpolate(
            scrollX.value,
            inputRange,
            [DOT_WIDTH, 2 * DOT_WIDTH, DOT_WIDTH],
            Extrapolate.CLAMP
          )
          return { width: dotWidth }
        })
        return (
          <Animated.View
            style={[
              tw.style(`rounded-full bg-[#3fbaeb] mx-2`, {
                height: DOT_HEIGHT,
              }),
              fluidDotStyle,
            ]}
            key={i.toString()}
          />
        )
      })}
    </CenteredRow>
  )
}
