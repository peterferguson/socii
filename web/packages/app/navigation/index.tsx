import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { NavigationContainer, useLinkTo } from "@react-navigation/native"
import { BottomTabNavigator } from "app/navigation/bottom-tab-navigator"
import { linking } from "app/navigation/linking"
import type { NextNavigationProps } from "app/navigation/types"
import Router from "next/router"
import React, { useEffect, useMemo, useReducer } from "react"
import { Platform } from "react-native"
import { AuthProvider } from "../contexts/AuthProvider"
import { useDarkMode } from "../hooks/useDarkMode"
import tw from "../lib/tailwind"

function LinkTo() {
  const linkTo = useLinkTo()

  useEffect(function trigger() {
    if (Platform.OS === "web" && Router) {
      const handler = (path: string) => {
        linkTo(path)
      }
      Router.events.on("routeChangeComplete", handler)

      return () => Router.events.off("routeChangeComplete", handler)
    }
  }, [])

  return null
}

function useLinkingConfig() {
  const [enabled, disableWebLinkingAfterInitialState] = useReducer(() => false, true)

  return {
    linking: useMemo(() => ({ ...linking, enabled }), []),
    onReady: Platform.select({ web: disableWebLinkingAfterInitialState }),
  }
}

export function Navigation({ Component, pageProps }: NextNavigationProps) {
  const [theme] = useDarkMode()
  const darkMode = theme === "dark"
  const linkingConfig = useLinkingConfig()

  return (
    <NavigationContainer
      linking={linkingConfig.linking}
      onReady={linkingConfig.onReady}
      theme={{
        dark: darkMode,
        colors: {
          primary: tw.color("brand"),
          background: tw`bg-brand-gray dark:bg-brand-black`.color as string,
          card: tw`bg-brand-gray dark:bg-brand-black`.color as string,
          text: tw`text-white dark:text-black`.color as string,
          border: "rgb(39, 39, 41)",
          notification: "rgb(255, 69, 58)",
        },
      }}
      documentTitle={{
        enabled: true,
        formatter: (options) => (options?.title ? `${options.title}` : "socii"),
      }}
    >
      <AuthProvider>
        <LinkTo />
        <BottomSheetModalProvider>
          <BottomTabNavigator Component={Component} pageProps={pageProps} />
        </BottomSheetModalProvider>
        {/* <Notifications /> */}
      </AuthProvider>
    </NavigationContainer>
  )
}
