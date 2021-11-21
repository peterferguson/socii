import React from "react"
import { View } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import tw from "app/lib/tailwind"
import { BUTTON_WIDTH, TabLabel, tabs, WIDTH } from "./constants"

const ChartTabRow: React.FC<{
  logoColor: string
  activeTab: Animated.SharedValue<TabLabel>
}> = ({ children, logoColor, activeTab }) => {
  const buttonBgStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(BUTTON_WIDTH * tabs.indexOf(activeTab.value)) },
      ],
    }
  })

  return (
    <View style={{ ...tw`flex-row`, width: WIDTH - 32 }}>
      <View style={tw`absolute inset-0`}>
        <Animated.View
          style={[
            {
              backgroundColor: logoColor,
              width: (3.5 * BUTTON_WIDTH) / 5,
              height: (3.5 * BUTTON_WIDTH) / 5,
              ...tw`rounded-full`,
              marginLeft: (7 / 50) * BUTTON_WIDTH,
              marginTop: (-11 / 50) * BUTTON_WIDTH,
            },
            buttonBgStyle,
          ]}
        />
      </View>
      {children}
    </View>
  )
}

export default ChartTabRow
