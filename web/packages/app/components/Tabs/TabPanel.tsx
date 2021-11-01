import React from "react"
import { Text } from "react-native"
import { Tab } from "./Tab"

export const TabPanel = ({ tab }: { tab: Tab }) => {
  return <Text>{tab.label}</Text>
}
