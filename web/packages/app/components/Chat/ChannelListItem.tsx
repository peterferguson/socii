import React from "react"
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native"
import { useTheme } from "@react-navigation/native"
import tw from "app/lib/tailwind"
import { truncate } from "app/utils"

export const ChannelListItem = ({
  channel,
  setActiveChannelId,
  presenceIndicator = true,
  showAvatar = false,
  changeChannel,
  isUnread,
  currentUserId,
}) => {
  /**
   * Prefix could be one of following
   *
   * '#' - if its a normal group channel
   * empty circle - if its direct messaging conversation with offline user
   * green circle - if its direct messaging conversation with with online user
   * Count of members - if its group direct messaging conversations.
   */
  let ChannelPrefix = null
  /**
   * Its the label component or title component to show for channel
   * For channel, its the name of the channel - channel.data.name
   * For direct messaging conversations, its the names of other members of chat.
   */
  let ChannelTitle = null
  let ChannelPostfix = null
  /**
   * Id of other user in oneOnOneConversation. This will be used to decide ChannelTitle
   */
  let otherUserId
  /**
   * Number of unread mentions (@vishal) in channel
   */
  let countUnreadMentions = channel.countUnreadMentions()
  const { colors } = useTheme()

  const isDirectMessagingConversation = !channel.data.name
  const isOneOnOneConversation =
    isDirectMessagingConversation && Object.keys(channel.state.members).length === 2

  //   const channelTitleStyle = isUnread
  //     ? [{ color: colors.boldText }, styles.unreadChannelTitle]
  //     : styles.channelTitle

  if (isOneOnOneConversation) {
    // If its a oneOnOneConversation, then we need to display the name of the other user.
    // For this purpose, we need to find out, among two members of this channel,
    // which one is current user and which one is the other one.
    const memberIds = Object.keys(channel.state.members)
    otherUserId = memberIds[0] === currentUserId ? memberIds[1] : memberIds[0]

    if (presenceIndicator) {
      ChannelPrefix = channel.state.members[otherUserId].user.online ? (
        // If the other user is online, then show the green presence indicator next to his name
        <PresenceIndicator online={true} />
      ) : (
        <PresenceIndicator online={false} />
      )
    }

    if (showAvatar) {
      ChannelPrefix = (
        <Image
          style={styles.oneOnOneConversationImage}
          source={{
            uri: channel.state.members[otherUserId].user.image,
          }}
        />
      )
    }

    ChannelTitle = <Text style={tw`text-xl`}>{truncate(channel.id, 40)}</Text>

    ChannelPostfix = (
      <View style={styles.row}>
        {showAvatar &&
          (channel.state.members[otherUserId].user.online ? (
            // If the other user is online, then show the green presence indicator next to his name
            <PresenceIndicator online={true} />
          ) : (
            <PresenceIndicator online={false} />
          ))}
      </View>
    )
  } else if (isDirectMessagingConversation) {
    ChannelPrefix = (
      <Text style={styles.directMessagingConversationPrefix}>
        {channel.data.member_count - 1}
      </Text>
    )
    ChannelTitle = <Text style={tw`text-xl`}>{truncate(channel, 40)}</Text>
  } else {
    ChannelPrefix = <Text style={styles.channelTitlePrefix}>#</Text>
    ChannelTitle = <Text style={tw`text-xl`}>{truncate(channel, 40)}</Text>
  }

  return (
    <TouchableOpacity
      key={channel.id}
      onPress={() => {
        setActiveChannelId && setActiveChannelId(channel.id)
        changeChannel(channel.id)
      }}
      style={styles.channelRow}
    >
      <View style={styles.channelTitleContainer}>
        {ChannelPrefix}
        {ChannelTitle}
        {ChannelPostfix}
      </View>
      {isDirectMessagingConversation && isUnread && (
        <View style={styles.unreadMentionsContainer}>
          <Text style={styles.unreadMentionsText}>{channel.countUnread()}</Text>
        </View>
      )}
      {(!isDirectMessagingConversation && countUnreadMentions) > 0 && (
        <View style={styles.unreadMentionsContainer}>
          <Text style={styles.unreadMentionsText}>{countUnreadMentions}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export const PresenceIndicator = ({ online, backgroundTransparent = true }) => {
  const { colors } = useTheme()
  return (
    <View
      style={
        online
          ? styles.onlineCircle
          : [
              styles.offlineCircle,
              {
                backgroundColor: backgroundTransparent
                  ? "transparent"
                  : colors.background,
                borderColor: colors.text,
                borderWidth: 1,
              },
            ]
      }
    />
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: "#117A58",
    marginRight: 5,
  },
  offlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: "transparent",
    marginRight: 5,
  },
  channelRow: {
    padding: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    marginRight: 5,
  },
  channelTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadChannelTitle: {
    marginLeft: 0,
    fontWeight: "900",
    padding: 5,
  },
  channelTitle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
    paddingLeft: 5,
  },
  channelTitlePrefix: {
    fontWeight: "300",
    fontSize: 22,
    padding: 0,
  },
  oneOnOneConversationImage: {
    height: 20,
    width: 20,
    borderRadius: 5,
  },
  directMessagingConversationPrefix: {
    height: 13,
    width: 13,
    backgroundColor: "grey",
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
  },
  unreadMentionsContainer: {
    backgroundColor: "red",
    borderRadius: 20,
    alignSelf: "center",
    marginRight: 0,
  },
  unreadMentionsText: {
    color: "white",
    padding: 3,
    paddingRight: 6,
    paddingLeft: 6,
    fontSize: 15,
    fontWeight: "900",
  },
})
