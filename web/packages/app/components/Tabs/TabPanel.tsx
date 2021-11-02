import React from "react"
import { Text, View } from "react-native"
import { Tab } from "./Tab"
import tw from "../../lib/tailwind"
import { Panels } from "./Tabs"

export const TabPanel = ({
  tab,
  panelComponents,
}: {
  tab: Tab
  panelComponents: Panels
}) => {
  const PanelComponent =
    panelComponents && tab.label in panelComponents ? panelComponents[tab.label] : null
  return PanelComponent ? (
    <PanelComponent />
  ) : (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-brand-black`}>{tab.label}</Text>
      </View>
    </View>
  )
}
