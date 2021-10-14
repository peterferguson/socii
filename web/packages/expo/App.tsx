import React from "react"
import { enableScreens } from "react-native-screens"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import tw from "../app/lib/tailwind"
import { Navigation } from "app/navigation"

enableScreens(true)

export default function App() {
  return (
    <SafeAreaProvider style={tw`bg-gray-50 flex-1`}>
      <StatusBar style="light" />
      <Navigation />
    </SafeAreaProvider>
  )
}
