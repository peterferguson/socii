import type {
  StreamChat as sStreamChat,
  Channel as sChannel,
  LiteralStringForUnion,
} from "stream-chat"

export type AttachmentType = UnknownType & {
  file_size?: number | string
  mime_type?: string
}

export type ChannelType = UnknownType & {
  image?: string
}

export type CommandType = LiteralStringForUnion

export type EventType = UnknownType

export type MessageType = UnknownType

export type ReactionType = UnknownType

export type UserType = UnknownType & {
  image?: string
}

export type UnknownType = Record<string, unknown>

export type Channel = sChannel<
  AttachmentType,
  ChannelType,
  LiteralStringForUnion,
  UnknownType,
  UnknownType,
  UnknownType,
  UserType
>
export type StreamChat = sStreamChat<
  AttachmentType,
  ChannelType,
  LiteralStringForUnion,
  UnknownType,
  UnknownType,
  UnknownType,
  UserType
>
