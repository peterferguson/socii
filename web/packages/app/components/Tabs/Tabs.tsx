import tw from "app/lib/tailwind"
import React, { useState } from "react"
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewProps,
} from "react-native"
import { CenteredColumn } from "../Centered"
import { Tab } from "./Tab"
import { TabHeader } from "./TabHeader"
import { TabPanels } from "./TabPanels"

export type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void
export type Panel = React.FC<{ scrollHandler?: OnScroll }>

export type Panels = {
  [label: string]: Panel
}

const { width: WIDTH } = Dimensions.get("window")
export const Tabs = ({
  tabs,
  panelComponents,
  panelBgColor,
  panelScrollHandler,
  containerStyle,
}: {
  tabs: Tab[]
  panelComponents: Panels
  panelBgColor?: string
  containerStyle?: ViewProps
  panelScrollHandler: OnScroll
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
    // @ts-ignore
    <CenteredColumn style={tw.style(``, containerStyle)}>
      <TabHeader {...{ tabs, index, handleTabPress, width: TAB_WIDTH }} />
      <TabPanels
        {...{
          tabs,
          index,
          panelComponents,
          panelBgColor,
          panelScrollHandler,
          activePanelDirection,
        }}
      />
    </CenteredColumn>
  )
}
