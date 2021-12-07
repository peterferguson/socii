import { useHeaderHeight } from "@react-navigation/elements"
import { CustomAttachment } from "app/components/CustomAttachments"
import { useStream } from "app/hooks"
import { useRouter } from "app/navigation/use-router"
import React, { useEffect } from "react"
import { SafeAreaView, View } from "react-native"
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
} from "stream-chat-expo"
import { streami18n } from "./ChannelList"
import { Message } from "app/components/Chat/Message"

const ChannelScreen = () => {
  const router = useRouter()
  const { client: chatClient, channel, setThread, thread } = useStream()
  const headerHeight = useHeaderHeight()
  const { setTopInset } = useAttachmentPickerContext()

  useEffect(() => setTopInset(headerHeight), [headerHeight])

  return (
    <SafeAreaView>
      <Chat client={chatClient as any} i18nInstance={streami18n}>
        <Channel
          channel={channel as any}
          Attachment={CustomAttachment}
          keyboardVerticalOffset={headerHeight}
          thread={thread as any}
        >
          <View style={{ flex: 1 }}>
            <MessageList
              // Message={Message}
              onThreadSelect={thread => {
                setThread(thread)
                router.push(`/thread/${thread.id}`)
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
