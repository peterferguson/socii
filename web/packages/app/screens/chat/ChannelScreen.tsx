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
import { CustomAttachment } from "app/components/CustomAttachments"
import { useStream } from "app/hooks"
import { ChannelScreenProps } from "app/navigation/types"
import { useRouter } from "app/navigation/use-router"
import { streami18n } from "./ChannelList"

const ChannelScreen = ({ navigation, route }: ChannelScreenProps) => {
  const { channelId } = route.params
  const router = useRouter()
  const { client: chatClient, channel, setChannel, setThread, thread } = useStream()
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
