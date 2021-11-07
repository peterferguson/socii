import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { NavigationContainer, useLinkTo } from "@react-navigation/native"
import { linking } from "app/navigation/linking"
import { RootNavigator } from "app/navigation/root-navigator"
import type { NextNavigationProps } from "app/navigation/types"
import Router from "next/router"
import React, { useEffect, useMemo, useReducer } from "react"
import { Platform } from "react-native"
import { OverlayProvider } from "stream-chat-expo"
import { AuthProvider } from "../contexts/AuthProvider"
import { StreamProvider } from "../contexts/StreamProvider"
import { useDarkMode } from "../hooks/useDarkMode"
import { useStreamChatTheme } from "../hooks/useStreamChatTheme"
import tw from "../lib/tailwind"

function LinkTo() {
  const linkTo = useLinkTo()

  useEffect(function trigger() {
    if (Platform.OS === "web" && Router) {
      const handler = (path: string) => linkTo(path)

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
  const [themeMode] = useDarkMode()
  const darkMode = themeMode === "dark"
  const linkingConfig = useLinkingConfig()
  const theme = useStreamChatTheme()

  return (
    <NavigationContainer
      linking={linkingConfig.linking}
      onReady={linkingConfig.onReady}
      theme={{
        dark: darkMode,
        colors: {
          primary: tw.color("brand-black"),
          background: tw`bg-brand-gray dark:bg-brand-black`.color as string,
          card: tw`bg-brand-gray dark:bg-brand-black`.color as string,
          text: tw`text-white dark:text-black`.color as string,
          border: "rgb(39, 39, 41)",
          notification: "rgb(255, 69, 58)",
        },
      }}
      documentTitle={{
        enabled: true,
        formatter: options => (options?.title ? `${options.title}` : "socii"),
      }}
    >
      <AuthProvider>
        <StreamProvider>
          <OverlayProvider
            // bottomInset={bottom}
            // i18nInstance={streami18n}
            value={{ style: theme }}
            translucentStatusBar={true}
          >
            <LinkTo />
            <BottomSheetModalProvider>
              <RootNavigator Component={Component} pageProps={pageProps} />
            </BottomSheetModalProvider>
            {/* <Notifications /> */}
          </OverlayProvider>
        </StreamProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
