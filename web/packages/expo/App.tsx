import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import AnimatedAppLoader from "app/components/AnimatedAppLoader"
import { Navigation } from "app/navigation"
import { Subscription } from "expo-modules-core"
import * as Notifications from "expo-notifications"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useRef, useState } from "react"
import { LogBox } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { enableScreens } from "react-native-screens"
import { useDeviceContext } from "twrnc"
import { registerForExpoNotifications } from "../app/lib/firebase/messaging"
import tw from "../app/lib/tailwind"
import logger from "../app/utils/logger"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

enableScreens(true)

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
})

export default function App() {
  LogBox.ignoreLogs(["Setting a timer", "umami--", "AsyncStorage"])

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
  return (
    <SafeAreaProvider style={tw`bg-gray-50 flex-1`}>
      <AnimatedAppLoader>
        <StatusBar style="auto" />
        <BottomSheetModalProvider>
          <Navigation />
        </BottomSheetModalProvider>
      </AnimatedAppLoader>
    </SafeAreaProvider>
  )
}
