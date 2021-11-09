import React, { useState } from "react"
import { View, Dimensions } from "react-native"
import tw from "app/lib/tailwind"
import { Tab } from "./Tab"
import { TabHeader } from "./TabHeader"
import { TabPanels } from "./TabPanels"

export type Panel = React.FC

export type Panels = {
  [label: string]: Panel
}

const { width: WIDTH } = Dimensions.get("window")
export const Tabs = ({
  tabs,
  panelComponents,
}: {
  tabs: Tab[]
  panelComponents: Panels
}) => {
  const [index, setIndex] = useState(0)
  const TAB_WIDTH = (WIDTH - 64 - 12) / tabs.length
  return (
    <View style={tw`flex-col`}>
      <TabHeader {...{ tabs, index, setIndex, width: TAB_WIDTH }} />
      <TabPanels {...{ tabs, index, setIndex, panelComponents }} />
    </View>
  )
}
