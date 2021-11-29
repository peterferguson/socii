import tw from "app/lib/tailwind"
import React, { useState, FunctionComponent, ReactNode } from "react"
import Animated, {
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated"
import { HEADER_HEIGHT, HEADER_OFFSET } from "./constants"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AnimatedHeader } from "./AnimatedHeader"

export interface AnimatedNavBarProps {
  scrollY: Animated.SharedValue<number>
  PreAnimationComponent: FunctionComponent
  PostAnimationComponent: FunctionComponent
}

// - adjust for the tabs on the stock screen ... this should be screen dependent
const threshold = HEADER_HEIGHT * 2.4 + HEADER_OFFSET

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
      <Animated.View
        style={[tw.style(`w-full justify-center items-center`), animateOpacity]}
      >
        <PostAnimationComponent />
      </Animated.View>
    </>
  )
}
