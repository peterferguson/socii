import React from "react"
import { Tab } from "./Tab"
import { TabHeaderContainer } from "./TabHeaderContainer"

export const TabHeader = ({
  tabs,
  index,
  width,
  handleTabPress,
}: {
  tabs: Tab[]
  index: number
  width: number
  handleTabPress: React.Dispatch<React.SetStateAction<number>>
}) => (
  <TabHeaderContainer>
    {tabs.map((tab, i) => (
      <Tab
        key={i}
        tab={tab}
        index={i}
        selected={index === i}
        setIndex={handleTabPress}
        width={width}
      />
    ))}
  </TabHeaderContainer>
)
