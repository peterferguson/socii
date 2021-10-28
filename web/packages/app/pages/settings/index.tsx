import React from "react"

import createStackNavigator from "app/navigation/create-stack-navigator"
import {SettingsScreen} from "app/screens/settings/index"
import { MainNavigatorParams } from "../../navigation/main-navigator/types"

const SettingsStack = createStackNavigator<MainNavigatorParams>()

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator
      initialRouteName="settings"
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {
          // Similar to `headerShadowVisible` but for web
          // @ts-ignore
          borderBottomWidth: 0,
        },
      }}
    >
      <SettingsStack.Group>
        <SettingsStack.Screen
          name="settings"
          component={SettingsScreen}
          options={{ title: "Settings", headerTitle: "Settings" }}
        />
      </SettingsStack.Group>
    </SettingsStack.Navigator>
  )
}

export default SettingsNavigator
