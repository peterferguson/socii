import HeaderTitle from "app/components/Headers/HeaderTitle"
import { useStream } from "app/hooks/useStream"
import createStackNavigator from "app/navigation/create-stack-navigator"
import { ChatStackParams } from "app/navigation/types"
import { ChannelListScreen } from "app/screens/chat/index"
import { headerScreenOptions } from "app/utils/headerScreenOptions"
import React from "react"

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
              headerTitle: () => <HeaderTitle headerTitle={"Chats"} />,
            }}
          />
        </ChatStack.Group>
      )}
    </ChatStack.Navigator>
  )
}

export default ChatNavigator
