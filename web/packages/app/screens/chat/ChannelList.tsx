import { ChannelPreview } from "app/components/Chat/ChannelPreview"
import { useStream } from "app/hooks/useStream"
import tw from "app/lib/tailwind"
import { useRouter } from "app/navigation/use-router"
import React, { useMemo } from "react"
import { View } from "react-native"
import "react-native-gesture-handler"
import { ChannelList, Streami18n } from "stream-chat-expo"

export const streami18n = new Streami18n({
  language: "en",
})

const ChannelListScreen = ({ navigation }) => {
  const { client: chatClient, setChannel } = useStream()
  const router = useRouter()
  const filters = { members: { $in: [chatClient?.userID] } }
  const options = { state: true, watch: true, presence: true, limit: 5 }
  // const sort = { last_message_at: -1 }

  const memoizedFilters = useMemo(() => filters, [])

  return (
    <View style={tw`h-full bg-brand-gray dark:bg-brand-black`}>
      <ChannelList
        filters={memoizedFilters}
        onSelect={channel => {
          setChannel(channel)
          router.push(`/channel/${channel.id}`)
        }}
        options={options}
        Preview={ChannelPreview}
        // sort={sort}
      />
    </View>
  )
}

export default ChannelListScreen
