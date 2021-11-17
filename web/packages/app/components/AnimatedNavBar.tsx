import tw from "app/lib/tailwind"
import React, { useState, FunctionComponent, ReactNode } from "react"
import Animated, {
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated"
import { HEADER_HEIGHT, HEADER_OFFSET } from "./Headers/constants"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AnimatedHeader } from "./Headers/AnimatedHeader"

export interface AnimatedNavBarProps {
  scrollY: Animated.SharedValue<number>
  PreAnimationComponent: FunctionComponent
  PostAnimationComponent: FunctionComponent
}

// - HEADER_OFFSET + HEADER_HEIGHT * 0.6
const threshold = HEADER_HEIGHT * 0.6 + HEADER_OFFSET

export const AnimatedNavBar: FunctionComponent<AnimatedNavBarProps> = ({
  scrollY,
  PreAnimationComponent,
  PostAnimationComponent,
  ...props
}) => {
  const { top: safeAreaTop } = useSafeAreaInsets()

  const [postAnimation, setPostAnimation] = useState(false)

  const animateOpacity = useAnimatedStyle(() => {
    const animateCondition = scrollY.value > threshold + safeAreaTop ? 1 : 0
    const opacity = withTiming(animateCondition, { duration: 500 }, () =>
      runOnJS(setPostAnimation)(!!animateCondition)
    )
    return { opacity }
  })

  return (
    <>
      <AnimatedHeader scrollY={scrollY} showHeader={!postAnimation} {...props}>
        <PreAnimationComponent />
      </AnimatedHeader>
      <Animated.View style={[tw.style(`justify-center`), animateOpacity]}>
        <PostAnimationComponent />
      </Animated.View>
    </>
  )
}
