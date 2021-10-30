import React from "react"
import createStackNavigator from "app/navigation/create-stack-navigator"
import {SettingsScreen} from "app/screens/settings/index"
import {ProfileSettingsScreen} from "app/screens/settings/index"
import { NextNavigationProps, SettingsStackParams } from "../../navigation/types"
import tw from "../../lib/tailwind"
import HeaderContainer from "../../components/Headers/HeaderContainer"

const SettingsStack = createStackNavigator<SettingsStackParams>()

function SettingsNavigator(props: NextNavigationProps) {
  return (
    <SettingsStack.Navigator
      initialRouteName="settingsScreen"
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: tw.color("brand"),
        headerStyle: {
          // Similar to `headerShadowVisible` but for web
          // @ts-ignore
          borderBottomWidth: 0,
          ...tw`bg-brand-gray dark:bg-brand-black opacity-100`,
        },
      }}
    >
        <SettingsStack.Screen
          name="settingsScreen"
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerTitle: () => (
              <HeaderContainer headerTitle="Settings" text="Settings" />
            ),
          }}
        /> 
        <SettingsStack.Screen
          name="profileSettings"
          component={ProfileSettingsScreen}
          options={{ title: "Your Profile", headerTitle: "Your Profile" }}
        />
    
    </SettingsStack.Navigator>
  )
}

export default SettingsNavigator
