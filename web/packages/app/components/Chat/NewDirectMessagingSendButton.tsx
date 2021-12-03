import {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from "app/models/stream//types"
import { useRouter } from "app/navigation/use-router"
import React from "react"
import { Alert } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  MessageInputContextValue,
  Search,
  SendRight,
  SendUp,
  UnknownType,
  useChannelContext,
  useMessageInputContext,
  useTheme,
} from "stream-chat-expo"

type NewDirectMessagingSendButtonPropsWithContext<
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
> = Pick<
  MessageInputContextValue<At, Ch, Co, Ev, Me, Re, Us>,
  "giphyActive" | "sendMessage"
> & {
  /** Disables the button */ disabled: boolean
}

const SendButtonWithContext = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  props: NewDirectMessagingSendButtonPropsWithContext<At, Ch, Co, Ev, Me, Re, Us>
) => {
  const { disabled = false, giphyActive, sendMessage } = props
  const {
    theme: {
      colors: { accent_blue, grey_gainsboro },
      messageInput: { sendButton },
    },
  } = useTheme()

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={sendMessage}
      style={[sendButton]}
      testID="send-button"
    >
      {giphyActive && <Search pathFill={accent_blue} />}
      {!giphyActive && disabled && <SendRight pathFill={grey_gainsboro} />}
      {!giphyActive && !disabled && <SendUp pathFill={accent_blue} />}
    </TouchableOpacity>
  )
}

const areEqual = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
>(
  prevProps: NewDirectMessagingSendButtonPropsWithContext<At, Ch, Co, Ev, Me, Re, Us>,
  nextProps: NewDirectMessagingSendButtonPropsWithContext<At, Ch, Co, Ev, Me, Re, Us>
) => {
  const {
    disabled: prevDisabled,
    giphyActive: prevGiphyActive,
    sendMessage: prevSendMessage,
  } = prevProps
  const {
    disabled: nextDisabled,
    giphyActive: nextGiphyActive,
    sendMessage: nextSendMessage,
  } = nextProps

  const disabledEqual = prevDisabled === nextDisabled
  if (!disabledEqual) return false

  const giphyActiveEqual = prevGiphyActive === nextGiphyActive
  if (!giphyActiveEqual) return false

  const sendMessageEqual = prevSendMessage === nextSendMessage
  if (!sendMessageEqual) return false

  return true
}

const MemoizedNewDirectMessagingSendButton = React.memo(
  SendButtonWithContext,
  areEqual
) as typeof SendButtonWithContext

export type SendButtonProps<
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType
> = Partial<NewDirectMessagingSendButtonPropsWithContext<At, Ch, Co, Ev, Me, Re, Us>>

/**
 * UI Component for send button in MessageInput component.
 */
export const NewDirectMessagingSendButton = (
  props: SendButtonProps<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >
) => {
  const { channel } = useChannelContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >()

  const { giphyActive, text } = useMessageInputContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >()

  const router = useRouter()

  const sendMessage = async () => {
    if (!channel) return
    channel.initialized = false
    await channel.query({})
    try {
      await channel.sendMessage({ text })
      router.push(`/channel/${channel.cid}`)
    } catch (e) {
      Alert.alert("Error sending a message")
    }
  }

  return (
    <MemoizedNewDirectMessagingSendButton<
      AttachmentType,
      ChannelType,
      CommandType,
      EventType,
      MessageType,
      ReactionType,
      UserType
    >
      {...{ giphyActive, sendMessage }}
      {...props}
      {...{ disabled: props.disabled || false }}
    />
  )
}
