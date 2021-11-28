import React from "react"
import { View } from "react-native"
import tw from "app/lib/tailwind"

export const TabPanelContainer = ({
  panelBgColor,
  children,
}: {
  panelBgColor: string
  children: React.ReactNode
}) => {
  return <View style={tw`p-3 bg-${panelBgColor} rounded-2xl w-full`}>{children}</View>
}
