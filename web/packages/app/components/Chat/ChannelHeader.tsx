import { useChannelMembersStatus } from "app/hooks/useChannelMembersStatus"
import { useStream } from "app/hooks/useStream"
import { useRouter } from "app/navigation/use-router"
import React from "react"
import { TouchableOpacity } from "react-native"
import {
  ChannelAvatar,
  useAttachmentPickerContext,
  useChannelPreviewDisplayName,
  useChatContext,
  useTypingString,
} from "stream-chat-expo"
import { NetworkDownIndicator } from "./NetworkDownIndicator"
import { ScreenHeader } from "./ScreenHeader"

const ChannelHeader: React.FC<{ channel: any }> = ({ channel }) => {
  const { closePicker } = useAttachmentPickerContext()
  const membersStatus = useChannelMembersStatus(channel)
  const displayName = useChannelPreviewDisplayName(channel, 30)
  const { isOnline } = useChatContext()
  const { client } = useStream()
  const typing = useTypingString()

  const router = useRouter()

  if (!channel || !client) return null

  const isOneOnOneConversation =
    channel &&
    Object.values(channel.state.members).length === 2 &&
    channel.id?.indexOf("!members-") === 0

  return (
    <ScreenHeader
      RightContent={() => (
        <TouchableOpacity
          onPress={() => {
            closePicker()
            console.log("/channel/[channelId]", `/channel/${channel.id}`)
            if (isOneOnOneConversation) router.push(`/one-on-one-details/${channel.id}`)
            else router.push(`/group-details/${channel.id}`)
          }}
        >
          <ChannelAvatar channel={channel} />
        </TouchableOpacity>
      )}
      showUnreadCountBadge
      Subtitle={isOnline ? undefined : NetworkDownIndicator}
      subtitleText={typing ? typing : membersStatus}
      titleText={displayName}
    />
  )
}

export default ChannelHeader
