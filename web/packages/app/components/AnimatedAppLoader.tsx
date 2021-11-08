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
import tw from "app/lib/tailwind"
import AppLoading from "expo-app-loading"
import Constants from "expo-constants"
import * as SplashScreen from "expo-splash-screen"
import { AnimatePresence, MotiView } from "moti"
import React from "react"
import { StyleSheet, View } from "react-native"
import { Socii } from "."

export default function AnimatedAppLoader({ children }) {
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

  if (!fontIsLoaded) return <AppLoading autoHideSplash={false} />

  return (
    <AnimatedSplashScreen isAppReady={fontIsLoaded}>{children}</AnimatedSplashScreen>
  )
}

function AnimatedSplashScreen({ children, isAppReady }) {
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState(false)

  React.useEffect(
    // @ts-ignore
    () => (async () => isAppReady && (await SplashScreen.hideAsync()))(),
    [isAppReady]
  )

  return (
    <AnimatePresence exitBeforeEnter>
      {isSplashAnimationComplete && (
        <View key="main-content" style={{ flex: 1 }}>
          {children}
        </View>
      )}

      {!isSplashAnimationComplete && (
        <View key="splash-screen" style={{ flex: 1 }}>
          <MotiView
            animate={{ opacity: 1 }}
            exitTransition={{ type: "timing", duration: 500 }}
            exit={{ opacity: 0 }}
            onDidAnimate={(_, finished) => finished && setAnimationComplete(true)}
            style={[
              tw`flex-1 justify-center items-center`,
              { backgroundColor: Constants.manifest.splash.backgroundColor },
            ]}
          >
            {/* TODO: Add a simple animation to the logo */}
            <Socii height={177.5} width={177.5} style={{ marginTop: "-47.5%" }} />
          </MotiView>
        </View>
      )}
    </AnimatePresence>
  )
}
