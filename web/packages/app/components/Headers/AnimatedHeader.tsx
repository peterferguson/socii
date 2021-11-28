import tw from "app/lib/tailwind"
import React, { FC, useState } from "react"
import { ViewProps } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  withTiming,
  runOnJS,
  useAnimatedStyle,
} from "react-native-reanimated"
import { HEADER_HEIGHT, HEADER_OFFSET } from "./constants"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export interface AnimatedHeaderProps extends Omit<ViewProps, "style"> {
  scrollY: Animated.SharedValue<number>
  showHeader: boolean
}

const height = HEADER_HEIGHT

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({
  scrollY,
  children,
  showHeader,
  ...props
}) => {
  const { top: marginTop } = useSafeAreaInsets()

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [HEADER_OFFSET, HEADER_OFFSET + HEADER_HEIGHT],
      [0, -HEADER_HEIGHT],
      Extrapolate.CLAMP
    )
    const opacity = withTiming(
      interpolate(
        -scrollY.value,
        [HEADER_OFFSET, HEADER_OFFSET + HEADER_HEIGHT],
        [0, 1],
        Extrapolate.CLAMP
      )
    )
    return { transform: [{ translateY }], opacity }
  })

  return (
    <Animated.View
      style={[
        tw.style(`w-full absolute top-0`, {
          zIndex: 2,
          marginTop,
          height,
        }),
        animatedStyle,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  )
}
