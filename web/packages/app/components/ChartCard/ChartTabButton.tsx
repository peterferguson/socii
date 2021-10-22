import React from "react"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle } from "react-native-reanimated"
import tw from "../../lib/tailwind"
import { TabLabel, BUTTON_WIDTH } from "./constants"

export const ChartTabButton: React.FC<{
  label: TabLabel
  activeTab: Animated.SharedValue<string>
  logoColor: string
  handlePress: () => void
}> = ({ label, activeTab, logoColor, handlePress }) => {
  const buttonTextstyle = useAnimatedStyle(() => ({
    color: label === activeTab.value ? "white" : logoColor,
  }))

  React.useEffect(
    () => console.log(label === activeTab.value),
    [label, activeTab.value]
  )

  return (
    <TouchableWithoutFeedback key={label} onPress={handlePress}>
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
