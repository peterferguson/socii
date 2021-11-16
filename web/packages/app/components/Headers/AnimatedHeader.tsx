import tw from "app/lib/tailwind"
import React, { FC } from "react"
import { ViewProps, View } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated"
import { HEADER_HEIGHT, HEADER_OFFSET } from "./constants"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export interface AnimatedHeaderProps extends Omit<ViewProps, "style"> {
  scrollY: Animated.SharedValue<number>
}

export const AnimatedHeader: FC<AnimatedHeaderProps> = ({
  scrollY,
  children,
  ...otherProps
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
        tw.style(`w-full -ml-3 justify-center`, {
          zIndex: 2,
          marginTop,
          height: HEADER_HEIGHT,
        }),
        animatedStyle,
      ]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  )
}
