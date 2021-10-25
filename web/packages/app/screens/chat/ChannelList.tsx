import React, { useMemo } from "react"
import { View } from "react-native"
import "react-native-gesture-handler"
import { ChannelList, Chat, Streami18n } from "stream-chat-expo"
import { useStream } from "../../hooks/useStream"
import tw from "../../lib/tailwind"
import { useRouter } from "../../navigation/use-router"

export const streami18n = new Streami18n({
  language: "en",
})

const ChannelListScreen = ({ navigation }) => {
  const { client: chatClient, setChannel } = useStream()
  console.log("ChannelListScreen", chatClient.userID)
  const router = useRouter()
  const filters = { members: { $in: [chatClient?.userID] } }
  const options = { state: true, watch: true, presence: true, limit: 5 }
  // const sort = { last_message_at: -1 }

  const memoizedFilters = useMemo(() => filters, [])

  return (
    <Chat client={chatClient} i18nInstance={streami18n}>
      <View style={tw`h-full bg-brand-gray dark:bg-brand-black`}>
        <ChannelList
          filters={memoizedFilters}
          onSelect={(channel) => {
            setChannel(channel)
            router.push(`/chat/${channel.id}`)
          }}
          options={options}
          // sort={sort}
        />
      </View>
    </Chat>
  )
}

export default ChannelListScreen
