import React from "react"
import { View } from "react-native"
import tw from "app/lib/tailwind"

export const TabHeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={tw`flex-row justify-between bg-gray-300/20 p-1 my-2 rounded-2xl`}>
      {children}
    </View>
  )
}
