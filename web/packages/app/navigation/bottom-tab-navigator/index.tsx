import { TabBarIcon } from "app/navigation/tab-bar-icon"
import HomeNavigator from "app/pages/home"
import PlaylistsNavigator from "app/pages/playlists"
import StocksNavigator from "app/pages/stocks/index"
import React from "react"
import tw from "../../lib/tailwind"
import { NextNavigationProps } from "../types"
import { BottomTab } from "./types"

export function BottomTabNavigator(props: NextNavigationProps) {
  return (
    <BottomTab.Navigator
      initialRouteName="homeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#7e7f81",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          ...tw`bg-brand-black`,
          // backgroundColor: "white",
          // borderTopColor: tw.color("brand"),
          zIndex: 1,
        },
        lazy: true,
      }}
    >
      <BottomTab.Screen
        name="homeTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="playlistsTab"
        component={PlaylistsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="disc" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="stocksTab"
        component={StocksNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="globe" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}
