import React from "react"
import { Platform } from "react-native"

import createStackNavigator from "app/navigation/create-stack-navigator"
import { ChannelScreen, ChannelListScreen, ThreadScreen } from "app/screens/chat/index"
import { ChatStackParams } from "app/navigation/types"
import tw from "../../lib/tailwind"
import HeaderContainer from "../../components/Headers/HeaderContainer"
import { useStream } from "../../hooks/useStream"

const ChatStack = createStackNavigator<ChatStackParams>()

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
          <ChatStack.Screen
            name="channelScreen"
            component={ChannelScreen}
            options={{
              title: "Chat",
              headerTitle: () => <HeaderContainer headerTitle={"Chat"} />,
            }}
          />
          <ChatStack.Screen
            name="threadScreen"
            component={ThreadScreen}
            options={{
              title: "Chat Thread",
              headerTitle: () => <HeaderContainer headerTitle={"Chat Thread"} />,
            }}
          />
        </ChatStack.Group>
      )}
    </ChatStack.Navigator>
  )
}

export default ChatNavigator
