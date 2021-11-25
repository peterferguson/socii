import {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UnknownType,
  UserType,
} from "app/models/stream/types"
import { getChannelPreviewDisplayAvatar } from "app/utils/getChannelPreviewDisplayAvatar"
import { useEffect, useState } from "react"
import { Channel, StreamChat } from "stream-chat"

/**
 *! Adapted from https://github.com/GetStream/stream-chat-react-native/blob/9e742476082a80c9b25b42117bbb1d69a2b2b63a/package/src/components/ChannelPreview/hooks/useChannelPreviewDisplayAvatar.ts
 *
 * Hook to set the display avatar for channel preview
 * @param {*} channel
 *
 * @returns {object} e.g., { image: 'http://dummyurl.com/test.png', name: 'Uhtred Bebbanburg' }
 */
export const useDisplayAvatar = <
  At extends UnknownType = AttachmentType,
  Ch extends ChannelType = ChannelType,
  Co extends string = CommandType,
  Ev extends UnknownType = EventType,
  Me extends UnknownType = MessageType,
  Re extends UnknownType = ReactionType,
  Us extends UnknownType = UserType
>(
  channel: Channel<At, Ch, Co, Ev, Me, Re, Us>,
  client: StreamChat<At, Ch, Co, Ev, Me, Re, Us>
) => {
  const channelData = channel?.data
  const image = channelData?.image
  const name = channelData?.name
  const id = client?.user?.id

  const [displayAvatar, setDisplayAvatar] = useState(
    getChannelPreviewDisplayAvatar(channel as any, client as any)
  )

  useEffect(() => {
    setDisplayAvatar(getChannelPreviewDisplayAvatar(channel as any, client as any))
  }, [id, image, name])

  return displayAvatar
}
