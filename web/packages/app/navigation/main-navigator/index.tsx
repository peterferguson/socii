import { useChatOverlayContext } from "app/components/Chat/context/ChatOverlayContext"
import ChannelHeader from "app/components/Chat/ChannelHeader"
import { ScreenHeader } from "app/components/Chat/ScreenHeader"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import { AddUser } from "app/components/Icons/AddUser"
import { useStream, useStreamChatTheme, useChannelMembersStatus } from "app/hooks"
import { BottomTabNavigator } from "app/navigation/bottom-tab-navigator"
import { OneOnOneDetailsScreen } from "app/screens/chat/OneOnOneDetailsScreen"
import { GroupChannelDetailsScreen } from "app/screens/chat/GroupChannelDetailsScreen"
import { ChannelScreen, ThreadScreen } from "app/screens/chat/index"
import React from "react"
import { TouchableOpacity } from "react-native"
import SettingsNavigator from "../../pages/settings"
import { headerScreenOptions } from "../../utils/headerScreenOptions"
import { MainStack } from "../main-navigator/types"
import { NextNavigationProps } from "../types"
import { useChannelPreviewDisplayName } from "stream-chat-expo"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "app/lib/tailwind"

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
              header: () => {
                const {
                  colors: { accent_blue, white },
                } = useStreamChatTheme()
                const { client } = useStream()

                const { setOverlay: setAppOverlay } = useChatOverlayContext()
                const membersStatus = useChannelMembersStatus(channel)
                // @ts-ignore
                const displayName = useChannelPreviewDisplayName(channel, 30)

                /**
                 * Cancels the confirmation sheet.
                 */
                const openAddMembersSheet = () => {
                  if (client?.user?.id) {
                    // @ts-ignore
                    setBottomSheetOverlayData({ channel })
                    setAppOverlay("addMembers")
                  }
                }

                return (
                  <SafeAreaView style={{ backgroundColor: white }}>
                    <ScreenHeader
                      inSafeArea
                      RightContent={() => (
                        <TouchableOpacity onPress={openAddMembersSheet}>
                          <AddUser fill={accent_blue} height={24} width={24} />
                        </TouchableOpacity>
                      )}
                      subtitleText={membersStatus}
                      titleText={displayName}
                    />
                  </SafeAreaView>
                )
              },
            })}
          />
          <MainStack.Screen
            name="groupDetails"
            component={GroupChannelDetailsScreen}
            options={({}) => ({
              header: () => {
                const {
                  colors: { accent_blue, white },
                } = useStreamChatTheme()
                const { client } = useStream()

                const { setOverlay: setAppOverlay } = useChatOverlayContext()
                const membersStatus = useChannelMembersStatus(channel)
                // @ts-ignore
                const displayName = useChannelPreviewDisplayName(channel, 30)

                /**
                 * Cancels the confirmation sheet.
                 */
                const openAddMembersSheet = () => {
                  if (client?.user?.id) {
                    // @ts-ignore
                    setBottomSheetOverlayData({ channel })
                    setAppOverlay("addMembers")
                  }
                }

                return (
                  <SafeAreaView style={{ backgroundColor: white }}>
                    <ScreenHeader
                      inSafeArea
                      RightContent={() => (
                        <TouchableOpacity onPress={openAddMembersSheet}>
                          <AddUser fill={accent_blue} height={24} width={24} />
                        </TouchableOpacity>
                      )}
                      subtitleText={membersStatus}
                      titleText={displayName}
                    />
                  </SafeAreaView>
                )
              },
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
