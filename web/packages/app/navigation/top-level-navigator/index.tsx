import React from "react"
import { ChatNavigatorNoBottomTab } from "../../pages/chat"
import { BottomTabNavigator } from "../bottom-tab-navigator"
import createStackNavigator from "../create-stack-navigator.web"
import { NextNavigationProps } from "../types"

const Stack = createStackNavigator()

export const TopLevelNavigator = (props: NextNavigationProps) => {
  return (
    <Stack.Navigator initialRouteName="enter" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WithBottomBar" component={BottomTabNavigator} />
      <Stack.Screen name="channel" component={ChatNavigatorNoBottomTab} />
    </Stack.Navigator>
  )
}
