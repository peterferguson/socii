import React, { FunctionComponent, ReactNode } from "react"
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { HEADER_HEIGHT, HEADER_OFFSET } from "./Headers/constants"

export interface AnimatedNavBarProps {
  scrollY: Animated.SharedValue<number>
  children: ReactNode
}

export const AnimatedNavBar: FunctionComponent<AnimatedNavBarProps> = ({
  children,
  scrollY,
}) => {
  const opacity = useSharedValue(0)

  const animateOpacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 300 }),
    }
  })

  useAnimatedScrollHandler(e => {
    scrollY.value = withSpring(e.contentOffset.y)
    if (e.contentOffset.y > HEADER_OFFSET + HEADER_HEIGHT * 0.6) {
      opacity.value = 1
    }
  })

  return <Animated.View style={animateOpacity}>{children}</Animated.View>
}
