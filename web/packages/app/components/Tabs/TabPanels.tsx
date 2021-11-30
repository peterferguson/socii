import React from "react"
import { Tab } from "./Tab"
import { TabPanel } from "./TabPanel"
import { TabPanelContainer } from "./TabPanelContainer"
import { Panels } from "./Tabs"
import { AnimatePresence } from "moti"
import { OnScroll } from "."

export const TabPanels = ({
  tabs,
  index,
  panelComponents,
  panelBgColor,
  panelScrollHandler,
  activePanelDirection,
}: {
  tabs: Tab[]
  index: number
  panelComponents: Panels
  panelBgColor?: string
  panelScrollHandler: OnScroll
  activePanelDirection?: "left" | "right" | null
}) => {
  return (
    <TabPanelContainer panelBgColor={panelBgColor || "white"}>
      <AnimatePresence>
        {tabs.map(
          (tab, i) =>
            i === index && (
              <TabPanel
                key={i}
                tab={tab}
                panelComponents={panelComponents}
                panelScrollHandler={panelScrollHandler}
                activePanelDirection={activePanelDirection}
              />
            )
        )}
      </AnimatePresence>
    </TabPanelContainer>
  )
}
