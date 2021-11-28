import React from "react"

import { useChannelPreviewDisplayAvatar } from "./hooks/useChannelPreviewDisplayAvatar"
import { useChannelPreviewDisplayPresence } from "./hooks/useChannelPreviewDisplayPresence"

import { Avatar } from "../Avatar/Avatar"
import { GroupAvatar } from "../Avatar/GroupAvatar"

import type { ChannelPreviewProps } from "./ChannelPreview"

import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
  UnknownType,
} from "app/models/stream/types"

export type ChannelAvatarProps<
  At extends UnknownType = AttachmentType,
  Ch extends UnknownType = ChannelType,
  Co extends string = CommandType,
  Ev extends UnknownType = EventType,
  Me extends UnknownType = MessageType,
  Re extends UnknownType = ReactionType,
  Us extends UnknownType = UserType
> = Pick<ChannelPreviewProps<At, Ch, Co, Ev, Me, Re, Us>, "channel">

/**
 * This UI component displays an avatar for a particular channel.
 */
export const ChannelAvatar = <
  At extends UnknownType = AttachmentType,
  Ch extends UnknownType = ChannelType,
  Co extends string = CommandType,
  Ev extends UnknownType = EventType,
  Me extends UnknownType = MessageType,
  Re extends UnknownType = ReactionType,
  Us extends UnknownType = UserType
>(
  props: ChannelAvatarProps<At, Ch, Co, Ev, Me, Re, Us>
) => {
  const { channel } = props

  const displayAvatar = useChannelPreviewDisplayAvatar(channel)
  const displayPresence = useChannelPreviewDisplayPresence(channel)

  if (displayAvatar.images) {
    return (
      <GroupAvatar
        images={displayAvatar.images}
        names={displayAvatar.names}
        size={40}
      />
    )
  }

  return (
    <Avatar
      image={displayAvatar.image}
      name={displayAvatar.name}
      online={displayPresence}
      size={40}
    />
  )
}
