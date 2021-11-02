import React from "react"
import { Tab } from "./Tab"
import { TabHeaderContainer } from "./TabHeaderContainer"

export const TabHeader = ({
  tabs,
  index,
  width,
  setIndex,
}: {
  tabs: Tab[]
  index: number
  width: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
}) => (
  <TabHeaderContainer>
    {tabs.map((tab, i) => (
      <Tab
        key={i}
        tab={tab}
        index={i}
        selected={index === i}
        setIndex={setIndex}
        width={width}
      />
    ))}
  </TabHeaderContainer>
)
