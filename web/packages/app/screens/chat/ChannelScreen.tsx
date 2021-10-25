import { useHeaderHeight } from "@react-navigation/elements"
import React, { useEffect } from "react"
import { SafeAreaView, View } from "react-native"
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from "stream-chat-expo"
import { useStream } from "../../hooks"
import { ChannelScreenProps } from "../../navigation/types"
import { useRouter } from "../../navigation/use-router"
import { streami18n } from "./ChannelList"

const ChannelScreen = ({ navigation, route }: ChannelScreenProps) => {
  const { channelId } = route.params
  const router = useRouter()
  const { client: chatClient, channel, setThread, thread } = useStream()
  const headerHeight = useHeaderHeight()
  const { setTopInset } = useAttachmentPickerContext()

  useEffect(() => setTopInset(headerHeight), [headerHeight])

  return (
    <SafeAreaView>
      <Chat client={chatClient} i18nInstance={streami18n}>
        <Channel
          channel={channel}
          keyboardVerticalOffset={headerHeight}
          thread={thread}
        >
          <View style={{ flex: 1 }}>
            <MessageList
              onThreadSelect={(thread) => {
                setThread(thread)
                router.push(`/channel/thread/${thread.id}`)
              }}
            />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  )
}

export default ChannelScreen
