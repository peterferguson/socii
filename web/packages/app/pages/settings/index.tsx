import React from "react"
import createStackNavigator from "app/navigation/create-stack-navigator"
import {SettingsScreen} from "app/screens/settings/index"
import {ProfileSettingsScreen} from "app/screens/settings/index"
import { NextNavigationProps, SettingsStackParams } from "../../navigation/types"
import tw from "../../lib/tailwind"
import HeaderContainer from "../../components/Headers/HeaderContainer"
import FAQSettingsScreen from "../../screens/settings/FAQSettings"
import PersonalSettingsScreen from "../../screens/settings/personalSettings"
import NotificationSettingsScreen from "../../screens/settings/notificationSettings"

const SettingsStack = createStackNavigator<SettingsStackParams>()

function SettingsNavigator(props: NextNavigationProps) {
  return (
    <SettingsStack.Navigator
      
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
          options={{ 
            title: "Your Profile", 
            headerTitle: "Your Profile"
          
          }}
        />
        <SettingsStack.Screen
          name="personalSettings"
          component={PersonalSettingsScreen}
          options={{ 
            title: "Personal Settings", 
            headerTitle: () => (
              <HeaderContainer headerTitle="Personal Settings" text="Personal Settings" />
            ),
        }}
        />
        <SettingsStack.Screen
          name="notificationSettings"
          component={NotificationSettingsScreen}
          options={{ 
            title: "Notifications", 
            headerTitle: () => (
              <HeaderContainer headerTitle="Notifications" text="Notifications" />
            ),
        }}
        />
        <SettingsStack.Screen
          name="FAQSettings"
          component={FAQSettingsScreen}
          options={{ 
            title: "FAQ", 
            headerTitle: () => (
              <HeaderContainer headerTitle="FAQSettings" text="FAQ's" />
            ),
        }}
        />
    
    </SettingsStack.Navigator>
  )
}

export default SettingsNavigator
