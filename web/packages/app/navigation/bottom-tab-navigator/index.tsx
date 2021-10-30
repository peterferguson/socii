import { TabBarIcon } from "app/navigation/tab-bar-icon"
import ChatNavigator from "app/pages/chat/index"
import EnterNavigator from "app/pages/enter"
import GroupsNavigator from "app/pages/groups/index"
import StocksNavigator from "app/pages/stocks/index"
import React from "react"
import BottomTabBar from "../../components/BottomTabBar"
import { useAuth } from "../../hooks"
import tw from "../../lib/tailwind"
import { NextNavigationProps } from "../types"
import { BottomTab } from "./types"

export function BottomTabNavigator(props: NextNavigationProps) {
  const { user } = useAuth()
  return (
    <BottomTab.Navigator
      initialRouteName="enter"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tw`bg-brand-gray dark:bg-brand-black`.color as string,
        tabBarInactiveTintColor: tw`bg-brand-gray dark:bg-[#7e7f81]`.color as string,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { ...tw`bg-brand-gray dark: bg-brand-black`, zIndex: 1 },
        lazy: true,
      }}
    >
      <BottomTab.Screen
        name="groups"
        component={GroupsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      {user?.username ? (
        <BottomTab.Screen
          name="chat"
          component={ChatNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="message-circle" color={color} />
            ),
          }}
        />
      ) : (
        // TODO: Replace this with user portfolio when implemented
        <BottomTab.Screen
          name="enter"
          component={EnterNavigator}
          options={{
            tabBarLabel: user?.username ? "home" : "enter",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
      )}
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
