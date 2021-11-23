import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans"
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Navigation } from "app/navigation"
import AppLoading from "expo-app-loading"
import { Subscription } from "expo-modules-core"
import * as Notifications from "expo-notifications"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState, useRef } from "react"
import { LogBox } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import { useDeviceContext } from "twrnc"
import tw from "../app/lib/tailwind"
import logger from "../app/utils/logger"
import { registerForExpoNotifications } from "../app/lib/firebase/messaging"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

enableScreens(true)

export default function App() {
  LogBox.ignoreLogs(["Setting a timer", "umami--"])
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

  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    registerForExpoNotifications()

    // - This listener is fired whenever a notification is received while the app
    // - is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => setNotification(notification)
    )

    // - This listener is fired whenever a user taps on or interacts with a notification
    // - (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => logger.log(response)
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  useDeviceContext(tw)
  if (!fontIsLoaded) return <AppLoading />

  return (
    <SafeAreaProvider style={tw`bg-gray-50 flex-1`}>
      <StatusBar style="auto" />
      <BottomSheetModalProvider>
        <Navigation />
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  )
}
