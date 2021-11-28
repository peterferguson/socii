import React from "react"
import { Tab } from "./Tab"
import { TabPanel } from "./TabPanel"
import { TabPanelContainer } from "./TabPanelContainer"
import { Panels } from "./Tabs"

export const TabPanels = ({
  tabs,
  index,
  setIndex,
  panelComponents,
  panelBgColor,
}: {
  tabs: Tab[]
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
  panelComponents: Panels
  panelBgColor?: string
}) => {
  return (
    <TabPanelContainer panelBgColor={panelBgColor || "white"}>
      {tabs.map(
        (tab, i) =>
          i === index && (
            <TabPanel key={i} {...{ tab, i, index, setIndex, panelComponents }} />
          )
      )}
    </TabPanelContainer>
  )
}
