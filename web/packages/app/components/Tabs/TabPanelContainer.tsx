import React from "react"
import { View } from "react-native"
import tw from "../../lib/tailwind"

export const TabPanelContainer = ({
  panelBgColor,
  children,
}: {
  panelBgColor: string
  children: React.ReactNode
}) => {
  return <View style={tw`p-3 bg-${panelBgColor} rounded-2xl `}>{children}</View>
}