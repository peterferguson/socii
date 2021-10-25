import createStackNavigator from "app/navigation/create-stack-navigator"
import { ChannelStackParams, ChatStackParams } from "app/navigation/types"
import { ChannelListScreen, ChannelScreen, ThreadScreen } from "app/screens/chat/index"
import React from "react"
import HeaderContainer from "../../components/Headers/HeaderContainer"
import { useStream } from "../../hooks/useStream"
import tw from "../../lib/tailwind"

export const ChatStack = createStackNavigator<ChatStackParams>()
export const ChannelStack = createStackNavigator<ChannelStackParams>()

function ChatNavigator() {
  const { clientReady } = useStream()
  return (
    <ChatStack.Navigator
      screenOptions={{
        animationEnabled: true,
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
      {clientReady && ( // TODO: Add screen for logging in users in chat navigator
        <ChatStack.Group>
          <ChatStack.Screen
            name="channelListScreen"
            component={ChannelListScreen}
            options={{
              title: "Chat",
              headerTitle: () => <HeaderContainer headerTitle={"Chats"} />,
            }}
          />
        </ChatStack.Group>
      )}
    </ChatStack.Navigator>
  )
}

export function ChatNavigatorNoBottomTab() {
  const { clientReady } = useStream()
  return (
    <ChannelStack.Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: true,
        headerTintColor: tw.color("brand"),
        headerStyle: {
          // Similar to `headerShadowVisible` but for web
          // @ts-ignore
          borderBottomWidth: 0,
          ...tw`bg-brand-gray dark:bg-brand-black opacity-100`,
        },
      }}
    >
      {clientReady && ( // TODO: Add screen for logging in users in chat navigator
        <ChannelStack.Group>
          <ChannelStack.Screen
            name="channelScreen"
            component={ChannelScreen}
            options={({ route }) => ({
              title: route.params.channelId,
              headerTitle: () => (
                <HeaderContainer headerTitle={"Chat"} text={route.params.channelId} />
              ),
            })}
          />
          <ChannelStack.Screen
            name="threadScreen"
            component={ThreadScreen}
            options={{
              title: "Chat Thread",
              headerTitle: () => <HeaderContainer headerTitle={"Chat Thread"} />,
            }}
          />
        </ChannelStack.Group>
      )}
    </ChannelStack.Navigator>
  )
}

export default ChatNavigator
