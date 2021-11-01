import React, { useState } from "react"
import { View, Dimensions } from "react-native"
import tw from "../../lib/tailwind"
import { Tab } from "./Tab"
import { TabHeader } from "./TabHeader"
import { TabPanels } from "./TabPanels"

const { width: WIDTH } = Dimensions.get("window")
export const Tabs = ({ tabs }: { tabs: Tab[] }) => {
  const [index, setIndex] = useState(0)
  const TAB_WIDTH = (WIDTH - 64 - 12) / tabs.length
  return (
    <View style={tw`flex-col`}>
      <TabHeader {...{ tabs, index, setIndex, width: TAB_WIDTH }} />
      <TabPanels {...{ tabs, index, setIndex }} />
    </View>
  )
}
