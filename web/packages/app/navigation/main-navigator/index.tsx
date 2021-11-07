import { ChannelScreen, ThreadScreen } from "app/screens/chat/index"
import React from "react"
import HeaderContainer from "../../components/Headers/HeaderContainer"
import { useStream } from "../../hooks"
import { headerScreenOptions } from "../../utils/headerScreenOptions"
import { BottomTabNavigator } from "../bottom-tab-navigator"
import { NextNavigationProps } from "../types"
import { RootStack } from "./types"

export const RootNavigator = (props: NextNavigationProps) => {
  const { clientReady } = useStream()
  return (
    <RootStack.Navigator
      initialRouteName="withBottomBar"
      screenOptions={{ headerShown: false, ...headerScreenOptions }}
    >
      <RootStack.Screen
        name="withBottomBar"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      {clientReady && ( // TODO: Add screen for logging in users in chat navigator
        <RootStack.Group>
          <RootStack.Screen
            name="channel"
            component={ChannelScreen}
            options={({ route }) => ({
              title: route.params.channelId,
              headerTitle: () => (
                <HeaderContainer headerTitle={"Chat"} text={route.params.channelId} />
              ),
            })}
          />
          <RootStack.Screen
            name="thread"
            component={ThreadScreen}
            options={{
              title: "Chat Thread",
              headerTitle: () => <HeaderContainer headerTitle={"Chat Thread"} />,
            }}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  )
}
