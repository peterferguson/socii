import ChannelHeader from "app/components/Chat/ChannelHeader"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import { useStream } from "app/hooks"
import { BottomTabNavigator } from "app/navigation/bottom-tab-navigator"
import { SharedGroupsScreen } from "app/screens/chat/SharedGroupsScreen"
import { GroupChannelDetailsScreen } from "app/screens/chat/GroupChannelDetailsScreen"
import { ChannelScreen, ThreadScreen } from "app/screens/chat/index"
import { OneOnOneDetailsScreen } from "app/screens/chat/OneOnOneDetailsScreen"
import React from "react"
import { DetailsScreenHeader } from "../../components/Headers/DetailsScreenHeader"
import SettingsNavigator from "../../pages/settings"
import { headerScreenOptions } from "../../utils/headerScreenOptions"
import { MainStack } from "../main-navigator/types"
import { NextNavigationProps } from "../types"
import { ScreenHeader } from "app/components/Chat/ScreenHeader"

export const MainNavigator = (props: NextNavigationProps) => {
  const { clientReady, channel } = useStream()
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
            options={() => ({
              header: () => <ChannelHeader channel={channel} />,
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
          <MainStack.Screen
            name="oneOnOneDetails"
            component={OneOnOneDetailsScreen}
            options={({}) => ({
              header: () => <DetailsScreenHeader channel={channel} />,
            })}
          />
          <MainStack.Screen
            name="groupDetails"
            component={GroupChannelDetailsScreen}
            options={({}) => ({
              header: () => <DetailsScreenHeader channel={channel} />,
            })}
          />
          <MainStack.Screen
            name="sharedGroups"
            component={SharedGroupsScreen}
            options={({}) => ({
              header: () => <ScreenHeader titleText="Shared Groups" />,
            })}
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
