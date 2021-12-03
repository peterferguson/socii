import { DrawerActions } from "@react-navigation/native"
import HeaderTitle from "app/components/Headers/HeaderTitle"
import { NewDirectMessageIcon } from "app/components/Icons/NewDirectMessage"
import { UserPhoto } from "app/components/UserPhoto"
import { useStream } from "app/hooks/useStream"
import { useStreamChatTheme } from "app/hooks/useStreamChatTheme"
import createStackNavigator from "app/navigation/create-stack-navigator"
import { ChatStackParams } from "app/navigation/types"
import { useRouter } from "app/navigation/use-router"
import { ChannelListScreen, NewDirectMessageScreen } from "app/screens/chat/index"
import { headerScreenOptions } from "app/utils/headerScreenOptions"
import React from "react"
import tw from "app/lib/tailwind"
import { Pressable } from "react-native"

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
            options={({ navigation }) => ({
              headerLeft: () => (
                <UserPhoto
                  overrideOnPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              ),
              headerTitle: () => <HeaderTitle title={"Chats"} />,
              headerRight: () => {
                const {
                  colors: { accent_blue },
                } = useStreamChatTheme()
                const router = useRouter()

                return (
                  <Pressable onPress={() => router.push("/chat/new-direct")}>
                    <NewDirectMessageIcon
                      active
                      color={tw.color("brand-black")}
                      height={24}
                      width={24}
                    />
                  </Pressable>
                )
              },
            })}
          />
          <ChatStack.Screen
            name="newDirectMessageScreen"
            component={NewDirectMessageScreen}
            options={({ navigation }) => ({
              headerTitle: () => <HeaderTitle title={"New Chat"} />,
            })}
          />
        </ChatStack.Group>
      )}
    </ChatStack.Navigator>
  )
}

export default ChatNavigator
