import tw from "app/lib/tailwind"
import { MotiTransitionProp, MotiView } from "moti"
import React from "react"
import { Text, View } from "react-native"
import { Easing } from "react-native-reanimated"
import { Tab } from "./Tab"
import { Panels } from "./Tabs"
import { Dimensions } from "react-native"

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.out(Easing.linear),
}

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const TabPanel = ({
  tab,
  panelComponents,
  activePanelDirection,
}: {
  tab: Tab
  panelComponents: Panels
  activePanelDirection: "left" | "right" | null
}) => {
  const PanelComponent =
    panelComponents && tab.label in panelComponents ? panelComponents[tab.label] : null

  return (
    <MotiView
      transition={transition}
      from={{
        translateX: activePanelDirection === "left" ? -SCREEN_WIDTH : SCREEN_WIDTH,
        opacity: 0,
      }}
      animate={{ translateX: 0, opacity: 1 }}
    >
      {PanelComponent ? (
        <PanelComponent />
      ) : (
        <View style={tw`flex-1 items-center justify-center bg-white`}>
          <View style={tw`p-4`}>
            <Text style={tw`text-brand-black`}>{tab.label}</Text>
          </View>
        </View>
      )}
    </MotiView>
  )
}
