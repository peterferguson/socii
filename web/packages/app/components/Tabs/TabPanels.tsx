import React from "react"
import { Tab } from "./Tab"
import { TabPanel } from "./TabPanel"
import { TabPanelContainer } from "./TabPanelContainer"
import { Panels } from "./Tabs"
import { AnimatePresence } from "moti"

export const TabPanels = ({
  tabs,
  index,
  panelComponents,
  panelBgColor,
  activePanelDirection,
}: {
  tabs: Tab[]
  index: number
  panelComponents: Panels
  panelBgColor?: string
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
                activePanelDirection={activePanelDirection}
              />
            )
        )}
      </AnimatePresence>
    </TabPanelContainer>
  )
}
