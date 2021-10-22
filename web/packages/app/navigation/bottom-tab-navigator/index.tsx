import { TabBarIcon } from "app/navigation/tab-bar-icon"
import EnterNavigator from "app/pages/enter"
import GroupsNavigator from "app/pages/groups"
import StocksNavigator from "app/pages/stocks/index"
import React from "react"
import tw from "../../lib/tailwind"
import { NextNavigationProps } from "../types"
import { BottomTab } from "./types"

export function BottomTabNavigator(props: NextNavigationProps) {
  return (
    <BottomTab.Navigator
      initialRouteName="enter"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tw`bg-brand-gray dark:bg-brand-black`.color as string,
        tabBarInactiveTintColor: tw`bg-brand-gray dark:bg-[#7e7f81]`.color as string,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          ...tw`bg-brand-gray dark: bg-brand-black`,
          // backgroundColor: "white",
          // borderTopColor: tw.color("brand"),
          zIndex: 1,
        },
        lazy: true,
      }}
    >
      <BottomTab.Screen
        name="enter"
        component={EnterNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="groups"
        component={GroupsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="stocks"
        component={StocksNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="globe" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}
