import HeaderTitle from "app/components/Headers/HeaderTitle"
import { useStream } from "app/hooks"
import { BottomTabNavigator } from "app/navigation/bottom-tab-navigator"
import { ChannelScreen, ThreadScreen } from "app/screens/chat/index"
import React from "react"
import SettingsNavigator from "../../pages/settings"
import { headerScreenOptions } from "../../utils/headerScreenOptions"
import { MainStack } from "../main-navigator/types"
import { NextNavigationProps } from "../types"

export const MainNavigator = (props: NextNavigationProps) => {
  const { clientReady } = useStream()
  return (
    <MainStack.Navigator
      initialRouteName={"withBottomBar"}
      screenOptions={{ headerShown: false, ...headerScreenOptions }}
    >
      <MainStack.Screen
        name="withBottomBar"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {clientReady && ( // TODO: Add screen for logging in users in chat navigator
        <MainStack.Group>
          <MainStack.Screen
            name="channel"
            component={ChannelScreen}
            options={({ route }) => ({
              headerTitle: () => (
                <HeaderTitle
                  title={route.params.channelId ? route.params.channelId : "Chat"}
                />
              ),
            })}
          />
          <MainStack.Screen
            name="thread"
            component={ThreadScreen}
            options={{
              title: "Chat Thread",
              headerTitle: () => <HeaderTitle title={"Chat Thread"} />,
            }}
          />
        </MainStack.Group>
      )}
      <MainStack.Screen
        name="settings"
        component={SettingsNavigator}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  )
}
