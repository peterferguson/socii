import React, { useCallback } from "react"

import { TabBarIcon } from "app/navigation/tab-bar-icon"
import type { NextNavigationProps } from "app/navigation/types"
import { BottomTab } from "./types"
import { useRouter } from "app/navigation/use-router"

export function BottomTabNavigator({ Component, pageProps }: NextNavigationProps) {
  const router = useRouter()

  const component = useCallback(
    (props) => <Component {...pageProps} {...props} />,
    [Component, pageProps]
  )

  return (
    <BottomTab.Navigator
      initialRouteName="groups"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#7e7f81",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "black",
          zIndex: 1,
        },
        lazy: true,
      }}
    >
      <BottomTab.Screen
        name="enter"
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            router.push("/")
          },
        }}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      >
        {component}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="groups"
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            router.push("/groups")
          },
        }}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="disc" color={color} />,
        }}
      >
        {component}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="chat"
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            router.push("/chat")
          },
        }}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="message-circle" color={color} />,
        }}
      >
        {component}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="stocks"
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            router.push("/stocks")
          },
        }}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="smile" color={color} />,
        }}
      >
        {component}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  )
}
