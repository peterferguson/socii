import React from "react"
import { enableScreens } from "react-native-screens"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import tw from "../app/lib/tailwind"
import { Navigation } from "app/navigation"
import AppLoading from "expo-app-loading"
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins"
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans"
import { useDeviceContext } from "twrnc"

enableScreens(true)

export default function App() {
  const [fontIsLoaded] = useFonts({
    "poppins-100": Poppins_100Thin,
    "poppins-200": Poppins_200ExtraLight,
    "poppins-300": Poppins_300Light,
    "poppins-400": Poppins_400Regular,
    "poppins-500": Poppins_500Medium,
    "poppins-600": Poppins_600SemiBold,
    "poppins-700": Poppins_700Bold,
    "poppins-800": Poppins_800ExtraBold,
    "open-sans-300": OpenSans_300Light,
    "open-sans-400": OpenSans_400Regular,
    "open-sans-600": OpenSans_600SemiBold,
    "open-sans-700": OpenSans_700Bold,
    "open-sans-800": OpenSans_800ExtraBold,
  })

  useDeviceContext(tw)
  if (!fontIsLoaded) return <AppLoading />

  return (
    <SafeAreaProvider style={tw`bg-gray-50 flex-1`}>
      <StatusBar style="auto" />
      <Navigation />
    </SafeAreaProvider>
  )
}
