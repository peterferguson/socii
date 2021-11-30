// ! adapted from https://github.com/GetStream/stream-chat-react-native/blob/develop/examples/SampleApp

// TODO: Fix chat deletion and options

import { useStream } from "app/hooks/useStream"
import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from "app/models/stream/types"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import Swipeable from "react-native-gesture-handler/Swipeable"
import {
  ChannelPreviewMessenger,
  ChannelPreviewMessengerProps,
  Delete,
  MenuPointHorizontal,
  useTheme,
} from "stream-chat-expo"

const styles = StyleSheet.create({
  leftSwipeableButton: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 20,
  },
  rightSwipeableButton: {
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 20,
  },
  swipeableContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
})

export const ChannelPreview: React.FC<
  ChannelPreviewMessengerProps<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >
> = props => {
  const { channel } = props

  const { client } = useStream()
  const {
    theme: {
      colors: { accent_red, white_smoke },
    },
  } = useTheme()

  const otherMembers = channel
    ? Object.values(channel.state.members).filter(
        member => member.user?.id !== client?.user?.id
      )
    : []

  return (
    <Swipeable
      overshootLeft={false}
      overshootRight={false}
      renderRightActions={() => (
        <View style={[styles.swipeableContainer, { backgroundColor: white_smoke }]}>
          <RectButton
            onPress={() => {
              //   setData({ channel, clientId: client.userID, navigation })
              //   setOverlay("channelInfo")
            }}
            style={[styles.leftSwipeableButton]}
          >
            <MenuPointHorizontal />
          </RectButton>
          <RectButton
            onPress={() => {
              //   setDataBottomSheet({
              //     confirmText: "DELETE",
              //     onConfirm: () => {
              //       channel.delete()
              //       setOverlay("none")
              //     },
              //     subtext: `Are you sure you want to delete this ${
              //       otherMembers.length === 1 ? "conversation" : "group"
              //     }?`,
              //     title: `Delete ${otherMembers.length === 1 ? "Conversation" : "Group"}`,
              //   })
              //   setOverlay("confirmation")
            }}
            style={[styles.rightSwipeableButton]}
          >
            <Delete pathFill={accent_red} />
          </RectButton>
        </View>
      )}
    >
      <ChannelPreviewMessenger {...props} />
    </Swipeable>
  )
}