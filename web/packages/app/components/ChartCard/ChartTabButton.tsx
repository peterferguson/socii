import React, { useCallback } from "react"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, withTiming, Easing } from "react-native-reanimated"
import tw from "../../lib/tailwind"
import { BUTTON_WIDTH, TabLabel } from "./constants"

export const ChartTabButton: React.FC<{
  label: TabLabel
  prevTab: Animated.SharedValue<TabLabel>
  activeTab: Animated.SharedValue<TabLabel>
  transition: Animated.SharedValue<number>
  logoColor: string
}> = ({ label, prevTab, activeTab, transition, logoColor }) => {
  const buttonTextstyle = useAnimatedStyle(() => ({
    color: label === activeTab.value ? "white" : logoColor,
  }))

  const onPress = useCallback(() => {
    prevTab.value = activeTab.value
    transition.value = 0
    activeTab.value = label
    transition.value = withTiming(1, {
      duration: 750,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  }, [label])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={{ width: BUTTON_WIDTH }}>
        <Animated.Text
          style={[{ ...tw`text-center font-poppins-600 text-xs` }, buttonTextstyle]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
