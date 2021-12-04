import { useNavigation } from "@react-navigation/native"
import { useBottomSheetOverlayContext } from "app/components/Chat/context/BottomSheetOverlayContext"
import { useChatOverlayContext } from "app/components/Chat/context/ChatOverlayContext"
import { Contacts } from "app/components/Icons/Contacts"
import { Delete } from "app/components/Icons/Delete"
import { File } from "app/components/Icons/File"
import { GoForward } from "app/components/Icons/GoForward"
import { Mute } from "app/components/Icons/Mute"
import { Notification } from "app/components/Icons/Notification"
import { Picture } from "app/components/Icons/Picture"
import { useStream } from "app/hooks/useStream"
import { useStreamChatTheme } from "app/hooks/useStreamChatTheme"
import { useRouter } from "app/navigation/use-router"
import React, { useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const styles = StyleSheet.create({
  actionContainer: {
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  actionLabelContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 36,
    height: 72,
    width: 72,
  },
  backButton: {
    left: 0,
    paddingLeft: 16,
    position: "absolute",
    top: 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  displayName: {
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 16,
  },
  itemText: {
    fontSize: 14,
    paddingLeft: 16,
  },
  onlineIndicator: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  onlineStatus: {
    fontSize: 12,
    paddingLeft: 8,
  },
  onlineStatusContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 16,
    paddingTop: 8,
  },
  spacer: {
    height: 8,
  },
  userInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  userName: {
    fontSize: 14,
  },
  userNameContainer: {
    alignSelf: "stretch",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
})

const Spacer = () => {
  const {
    colors: { grey_gainsboro },
  } = useStreamChatTheme()
  return <View style={[styles.spacer, { backgroundColor: grey_gainsboro }]} />
}

export const OneOnOneDetailsScreen = () => {
  const {
    colors: { accent_green, accent_red, black, border, grey, white, white_smoke },
  } = useStreamChatTheme()
  const router = useRouter()
  const { client, channel } = useStream()
  const { setOverlay } = useChatOverlayContext()
  const { setData } = useBottomSheetOverlayContext()

  const member = Object.values(channel.state.members).find(
    channelMember => channelMember.user?.id !== client?.user?.id
  )

  const user = member?.user
  const [muted, setMuted] = useState(
    client?.mutedUsers &&
      client?.mutedUsers?.findIndex(mutedUser => mutedUser.target.id === user?.id) > -1
  )
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    client?.mutedChannels &&
      client.mutedChannels.findIndex(
        mutedChannel => mutedChannel.channel?.id === channel.id
      ) > -1
  )

  /**
   * Opens confirmation sheet for deleting the conversation
   */
  const openDeleteConversationConfirmationSheet = () => {
    if (!client?.user?.id) return
    setData({
      confirmText: "DELETE",
      onConfirm: deleteConversation,
      subtext: "Are you sure you want to delete this conversation?",
      title: "Delete Conversation",
    })
    setOverlay("confirmation")
  }

  /**
   * Leave the group/channel
   */
  const deleteConversation = async () => {
    await channel.delete()
    setOverlay("none")
    router.push("/chat")
  }

  if (!user) return null

  return (
    <SafeAreaView style={[{ backgroundColor: white }, styles.container]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View style={[styles.userNameContainer, { borderTopColor: border }]}>
          <Text style={[styles.userName, { color: black }]}>@{user.id}</Text>
          <Text style={[styles.userName, { color: grey }]}>{user.name}</Text>
        </View>

        <Spacer />
        <Spacer />
        <TouchableOpacity
          style={[styles.actionContainer, { borderBottomColor: border }]}
        >
          <View style={styles.actionLabelContainer}>
            <Notification fill={grey} height={24} width={24} />
            <Text style={[styles.itemText, { color: black }]}>Notifications</Text>
          </View>
          <View>
            <Switch
              onValueChange={async () => {
                if (notificationsEnabled) await channel.unmute()
                else await channel.mute()
                setNotificationsEnabled(previousState => !previousState)
              }}
              trackColor={{ false: white_smoke, true: accent_green }}
              value={notificationsEnabled}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionContainer, { borderBottomColor: border }]}
        >
          <View style={styles.actionLabelContainer}>
            <Mute height={24} width={24} />
            <Text style={[styles.itemText, { color: black }]}>Mute user</Text>
          </View>
          <View>
            <Switch
              onValueChange={async () => {
                if (muted) {
                  const r = await client?.unmuteUser(user.id)
                  console.warn(r)
                } else {
                  const r = await client?.muteUser(user.id)
                  console.warn(r)
                }
                setMuted(previousState => !previousState)
              }}
              trackColor={{ false: white_smoke, true: accent_green }}
              value={muted}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("ChannelImagesScreen", {
            //   channel,
            // })
          }}
          style={[styles.actionContainer, { borderBottomColor: border }]}
        >
          <View style={styles.actionLabelContainer}>
            <Picture fill={grey} />
            <Text style={[styles.itemText, { color: black }]}>Photos and Videos</Text>
          </View>
          <View>
            <GoForward fill={grey} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("ChannelFilesScreen", {
            //   channel,
            // })
          }}
          style={[styles.actionContainer, { borderBottomColor: border }]}
        >
          <View style={styles.actionLabelContainer}>
            <File pathFill={grey} />
            <Text style={[styles.itemText, { color: black }]}>Files</Text>
          </View>
          <View>
            <GoForward fill={grey} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push(`/groups/shared/${user.id}`)}
          style={[styles.actionContainer, { borderBottomColor: border }]}
        >
          <View style={styles.actionLabelContainer}>
            <Contacts fill={grey} />
            <Text style={[styles.itemText, { color: black }]}>Shared Groups</Text>
          </View>
          <View>
            <GoForward fill={grey} />
          </View>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity
          onPress={openDeleteConversationConfirmationSheet}
          style={[styles.actionContainer, { borderBottomColor: border }]}
        >
          <View style={styles.actionLabelContainer}>
            <Delete fill={accent_red} height={24} width={24} />
            <Text style={[styles.itemText, { color: accent_red }]}>Delete contact</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
