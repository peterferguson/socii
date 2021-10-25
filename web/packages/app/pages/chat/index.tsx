import createStackNavigator from "app/navigation/create-stack-navigator"
import { ChatStackParams } from "app/navigation/types"
import { ChannelListScreen } from "app/screens/chat/index"
import React from "react"
import HeaderContainer from "../../components/Headers/HeaderContainer"
import { useStream } from "../../hooks/useStream"
import tw from "../../lib/tailwind"
import { headerScreenOptions } from "../../utils/headerScreenOptions"

export const ChatStack = createStackNavigator<ChatStackParams>()

function ChatNavigator() {
  const { clientReady } = useStream()
  return (
    <ChatStack.Navigator screenOptions={headerScreenOptions}>
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

export default ChatNavigator
