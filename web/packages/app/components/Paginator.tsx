import tw from "app/lib/tailwind"
import React from "react"
import { useWindowDimensions } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated"
import { CenteredRow } from "."

const DOT_WIDTH = 10
const DOT_HEIGHT = 10

export default ({
  numPages,
  scrollX,
  activeColor = "brand",
  inactiveColor = "gray-300",
}: {
  numPages: number
  scrollX: Animated.SharedValue<number>
  activeColor?: string
  inactiveColor?: string
}) => {
  const { width } = useWindowDimensions()
  return (
    <CenteredRow style={tw.style(`h-16`, { flex: 1 })}>
      {[...Array(numPages).keys()].map((_, i) => {
        const fluidDotStyle = useAnimatedStyle(() => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
          const dotWidth = interpolate(
            scrollX.value,
            inputRange,
            [DOT_WIDTH, 2 * DOT_WIDTH, DOT_WIDTH],
            Extrapolate.CLAMP
          )
          // const backgroundColor = interpolateColor(scrollX.value, inputRange, [
          //   inactiveColor,
          //   activeColor,
          // ])
          return { width: dotWidth }
        })
        return (
          <Animated.View
            style={[
              tw.style(`rounded-full mx-2`, {
                height: DOT_HEIGHT,
                backgroundColor: tw.color(activeColor),
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
