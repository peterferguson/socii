import tw from "app/lib/tailwind"
import React from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated from "react-native-reanimated"

const HeaderContainer = ({ children }) => {
  const { top: paddingTop } = useSafeAreaInsets()
  return (
    <View style={tw`z-10 bg-brand-gray dark:bg-brand-black`}>
      <Animated.View
        style={[
          tw.style(`flex-1 flex-row pr-4 items-center justify-between`, { paddingTop }),
        ]}
      >
        {children}
      </Animated.View>
    </View>
  )
}

export default HeaderContainer
