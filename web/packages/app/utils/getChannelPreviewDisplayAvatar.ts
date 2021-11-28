import { Channel, StreamChat } from "app/models/stream/types"

export const getChannelPreviewDisplayAvatar = <
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType
>(
  channel: Channel,
  client: StreamChat
) => {
  const currentUserId = client?.user?.id
  const channelData = channel?.data
  const channelName = channelData?.name
  const channelImage = channelData?.image

  if (channelImage) {
    return {
      image: channelImage,
      name: channelName,
    }
  } else if (currentUserId && channel?.state) {
    const members = Object.values(channel.state?.members)
    const otherMembers = members.filter(member => member.user?.id !== currentUserId)

    if (otherMembers.length === 1) {
      return {
        image: otherMembers[0].user?.image,
        name: channelName || otherMembers[0].user?.name,
      }
    }
    return {
      images: otherMembers.slice(0, 4).map(member => member.user?.image || ""),
      names: otherMembers.slice(0, 4).map(member => member.user?.name || ""),
    }
  }
  return {
    name: channelName,
  }
}
