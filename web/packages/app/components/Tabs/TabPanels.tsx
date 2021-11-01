import React from "react"
import { Tab } from "./Tab"
import { TabPanel } from "./TabPanel"
import { TabPanelContainer } from "./TabPanelContainer"

export const TabPanels = ({
  tabs,
  index,
  setIndex,
}: {
  tabs: Tab[]
  index: number
  setIndex: (index: number) => void
}) => {
  return (
    <TabPanelContainer panelBgColor="white">
      {tabs.map(
        (tab, i) => i === index && <TabPanel key={i} {...{ tab, i, index, setIndex }} />
      )}
    </TabPanelContainer>
  )
}
