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
  const [activePanelDirection, setActivePanelDirection] = React.useState<
    "left" | "right" | null
  >(null)

  const TAB_WIDTH = (WIDTH - 64 - 12) / tabs.length

  const handleTabPress = (activeIndex: number) =>
    setIndex((prevIndex: number) => {
      if (activeIndex === prevIndex) {
        setActivePanelDirection(null)
      } else if (activeIndex < prevIndex) {
        setActivePanelDirection("left")
      } else {
        setActivePanelDirection("right")
      }
      return activeIndex
    })

  return (
    <CenteredColumn style={tw.style(``, containerStyle)}>
      <TabHeader {...{ tabs, index, handleTabPress, width: TAB_WIDTH }} />
      <TabPanels
        {...{ tabs, index, panelComponents, panelBgColor, activePanelDirection }}
      />
    </CenteredColumn>
  )
}
