import React, { useState } from "react"
import { ViewProps, Dimensions } from "react-native"
import tw from "app/lib/tailwind"
import { Tab } from "./Tab"
import { TabHeader } from "./TabHeader"
import { TabPanels } from "./TabPanels"
import { CenteredColumn } from "../Centered"

export type Panel = React.FC

export type Panels = {
  [label: string]: Panel
}

const { width: WIDTH } = Dimensions.get("window")
export const Tabs = ({
  tabs,
  panelComponents,
  panelBgColor,
  containerStyle,
}: {
  tabs: Tab[]
  panelComponents: Panels
  panelBgColor?: string
  containerStyle?: ViewProps
}) => {
  const [index, setIndex] = useState(0)
  const TAB_WIDTH = (WIDTH - 64 - 12) / tabs.length
  return (
    <CenteredColumn style={tw.style(``, containerStyle)}>
      <TabHeader {...{ tabs, index, setIndex, width: TAB_WIDTH }} />
      <TabPanels {...{ tabs, index, setIndex, panelComponents, panelBgColor }} />
    </CenteredColumn>
  )
}
