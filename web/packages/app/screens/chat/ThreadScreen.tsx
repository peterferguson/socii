import { useHeaderHeight } from "@react-navigation/elements"
import React from "react"
import { SafeAreaView, View } from "react-native"
import { Channel, Chat, Thread } from "stream-chat-expo"
import { useStream } from "app/hooks"
import { streami18n } from "./ChannelList"

const ThreadScreen = () => {
  const { client: chatClient, channel, setThread, thread } = useStream()
  const headerHeight = useHeaderHeight()

  return (
    <SafeAreaView>
      <Chat client={chatClient} i18nInstance={streami18n}>
        <Channel
          channel={channel}
          keyboardVerticalOffset={headerHeight}
          thread={thread}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            <Thread onThreadDismount={() => setThread(null)} />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  )
}

export default ThreadScreen
