import { Contacts } from "app/components/Icons/Contacts"
import { useStream, useStreamChatTheme } from "app/hooks"
import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from "app/models/stream/types"
import { createParam } from "app/navigation/use-param"
import { useRouter } from "app/navigation/use-router"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import {
  Avatar,
  ChannelList,
  ChannelListMessenger,
  ChannelListMessengerProps,
  ChannelPreviewMessengerProps,
  getChannelPreviewDisplayAvatar,
  GroupAvatar,
  useChannelPreviewDisplayName,
  useChannelsContext,
} from "stream-chat-expo"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  emptyListSubtitle: {
    marginTop: 8,
    textAlign: "center",
  },
  emptyListTitle: {
    fontSize: 16,
    marginTop: 10,
  },
  groupContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  nameText: {
    fontWeight: "700",
    marginLeft: 8,
  },
  previewContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
})

type CustomPreviewProps = ChannelPreviewMessengerProps<
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType
>

const CustomPreview: React.FC<CustomPreviewProps> = ({ channel }) => {
  const { client, setChannel } = useStream()
  const name = useChannelPreviewDisplayName(channel, 30)
  const router = useRouter()
  const {
    colors: { black, grey, grey_whisper, white_snow },
  } = useStreamChatTheme()

  if (!client) return null

  if (Object.keys(channel.state.members).length === 2) return null

  // @ts-ignore
  const displayAvatar = getChannelPreviewDisplayAvatar(channel, client)

  const switchToChannel = () => {
    setChannel(channel)
    router.push(`/channel/${channel.cid}`)
  }

  return (
    <TouchableOpacity
      onPress={switchToChannel}
      style={[
        styles.previewContainer,
        { backgroundColor: white_snow, borderBottomColor: grey_whisper },
      ]}
    >
      <View style={styles.groupContainer}>
        {displayAvatar.images ? (
          <GroupAvatar
            images={displayAvatar.images}
            names={displayAvatar.names}
            size={40}
          />
        ) : (
          <Avatar image={displayAvatar.image} name={displayAvatar.name} size={40} />
        )}
        <Text style={[styles.nameText, { color: black }]}>{name}</Text>
      </View>
      <Text style={{ color: grey }}>
        {Object.keys(channel.state.members).length} Members
      </Text>
    </TouchableOpacity>
  )
}

const EmptyListComponent = () => {
  const {
    colors: { black, grey, grey_gainsboro },
  } = useStreamChatTheme()
  return (
    <View style={styles.emptyListContainer}>
      <Contacts fill={grey_gainsboro} scale={6} />
      <Text style={[styles.emptyListTitle, { color: black }]}>No shared groups</Text>
      <Text style={[styles.emptyListSubtitle, { color: grey }]}>
        Groups shared with user will appear here
      </Text>
    </View>
  )
}

type ListComponentProps = ChannelListMessengerProps<
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType
>

// If the length of channels is 1, which means we only got 1:1-distinct channel,
// And we don't want to show 1:1-distinct channel in this list.
const ListComponent: React.FC<ListComponentProps> = props => {
  const { channels, loadingChannels, refreshing } = useChannelsContext()

  if (channels.length <= 1 && !loadingChannels && !refreshing)
    return <EmptyListComponent />

  return <ChannelListMessenger {...props} />
}

type Query = {
  userId: string
}

const { useParam } = createParam<Query>()

export const SharedGroupsScreen = () => {
  const [userId] = useParam("userId")
  const { client } = useStream()
  const filters = {
    $and: [{ members: { $in: [client?.user?.id] } }, { members: { $in: [userId] } }],
  } as any
  const options = { watch: false }
  const sort = { last_message_at: -1 } as any

  if (!client?.user) return null

  return (
    <View style={styles.container}>
      <ChannelList
        filters={filters}
        List={ListComponent}
        options={options}
        Preview={CustomPreview}
        sort={sort}
      />
    </View>
  )
}
