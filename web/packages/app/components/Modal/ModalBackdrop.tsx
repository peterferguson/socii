import React, { useMemo } from "react"
import { BlurView } from "expo-blur"
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated"

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const ModalBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }))

  const containerStyle = useMemo(
    () => [style, { backgroundColor: "#000" }, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  )

  return <AnimatedBlurView intensity={90} tint={"default"} style={containerStyle} />
}

export default ModalBackdrop
