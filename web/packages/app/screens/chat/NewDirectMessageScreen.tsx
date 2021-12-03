import { NewDirectMessagingSendButton } from "app/components/Chat/NewDirectMessagingSendButton"
import { SelectedUserTag } from "app/components/Chat/SelectedUserTag"
import { UserSearchResults } from "app/components/Chat/UserSearchResults"
import { RoundButton } from "app/components/RoundButton"
import { useSearchUsers } from "app/hooks/useSearchUsers"
import { useStream } from "app/hooks/useStream"
import { useStreamChatTheme } from "app/hooks/useStreamChatTheme"
import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from "app/models/stream/types"
import React, { useEffect, useRef, useState } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { Channel as StreamChatChannel } from "stream-chat"
import {
  Channel,
  Group,
  MessageInput,
  MessageList,
  User,
  UserAdd,
} from "stream-chat-expo"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createGroupButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  createGroupButtonText: {
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 8,
  },
  emptyMessageContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  inputBox: {
    flex: 1,
    fontSize: 14,
    includeFontPadding: false, // for android vertical text centering
    padding: 0, // removal of default text input padding on android
    paddingRight: 16,
    paddingTop: 0, // removal of iOS top padding for weird centering
    textAlignVertical: "center", // for android vertical text centering
  },
  inputBoxContainer: {
    flexDirection: "row",
  },
  noChats: { fontSize: 12 },
  searchContainer: {
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  searchContainerLeft: {
    fontSize: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    textAlignVertical: "center",
  },
  searchContainerMiddle: {
    flex: 1,
    justifyContent: "center",
  },
  searchContainerRight: {
    justifyContent: "flex-end",
    paddingBottom: 16,
    paddingRight: 16,
  },
  selectedUsersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

const EmptyMessagesIndicator = () => {
  const {
    colors: { grey },
  } = useStreamChatTheme()
  return (
    <View style={styles.emptyMessageContainer}>
      <Text style={[styles.noChats, { color: grey }]}>No chats here yet...</Text>
    </View>
  )
}

const NewDirectMessagingScreen: React.FC<any> = ({ navigation }) => {
  const {
    colors: { accent_blue, black, border, grey, white },
  } = useStreamChatTheme()
  const { client } = useStream()

  const {
    onChangeSearchText,
    onFocusInput,
    reset,
    results,
    searchText,
    selectedUserIds,
    selectedUsers,
    toggleUser,
  } = useSearchUsers()

  const messageInputRef = useRef<TextInput | null>(null)
  const searchInputRef = useRef<TextInput>(null)
  const currentChannel =
    useRef<
      StreamChatChannel<
        AttachmentType,
        ChannelType,
        CommandType,
        EventType,
        MessageType,
        ReactionType,
        UserType
      >
    >()
  const isDraft = useRef(true)

  const [focusOnMessageInput, setFocusOnMessageInput] = useState(false)
  const [focusOnSearchInput, setFocusOnSearchInput] = useState(true)
  const [, setMessageInputText] = useState("")

  // When selectedUsers are changed, initiate a channel with those users as members,
  // and set it as a channel on current screen.
  const selectedUsersLength = selectedUsers?.length
  useEffect(() => {
    const initChannel = async () => {
      if (!client?.user?.id) return

      // If there are no selected users, then set dummy channel.
      if (selectedUsers?.length === 0) {
        setFocusOnMessageInput(false)
        return
      }

      const members = [client.user.id, ...selectedUserIds]

      // Check if the channel already exists.
      const channels = await client.queryChannels({
        distinct: true,
        members,
      })

      if (channels.length === 1) {
        // Channel already exist
        currentChannel.current = channels[0]
        isDraft.current = false
      } else {
        // Channel doesn't exist.
        isDraft.current = true

        const channel = client.channel("messaging", {
          members,
        })

        // Hack to trick channel component into accepting channel without watching it.
        channel.initialized = true
        currentChannel.current = channel
      }

      if (messageInputRef.current) {
        messageInputRef.current.focus()
      }
      setFocusOnMessageInput(true)
    }

    initChannel()
  }, [selectedUsersLength])

  const renderUserSearch = ({ inSafeArea }: { inSafeArea: boolean }) => (
    <View
      style={[
        { backgroundColor: white },
        focusOnSearchInput ? styles.container : undefined,
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setFocusOnMessageInput(false)
          setFocusOnSearchInput(true)
          if (searchInputRef.current) {
            searchInputRef.current.focus()
          }
        }}
        style={[
          styles.searchContainer,
          { backgroundColor: white, borderBottomColor: border },
        ]}
      >
        <Text style={[styles.searchContainerLeft, { color: grey }]}>TO:</Text>
        <View style={styles.searchContainerMiddle}>
          <View style={styles.selectedUsersContainer}>
            {selectedUsers?.map((tag, index) => {
              const tagProps = {
                disabled: !focusOnSearchInput,
                index,
                onPress: () => toggleUser(tag),
                tag,
              }

              return <SelectedUserTag key={index} {...tagProps} />
            })}
          </View>
          {focusOnSearchInput && (
            <View style={styles.inputBoxContainer}>
              <TextInput
                onChangeText={onChangeSearchText}
                onFocus={onFocusInput}
                placeholder="Type a name"
                placeholderTextColor={grey}
                ref={searchInputRef}
                style={[
                  styles.inputBox,
                  { color: black, paddingBottom: selectedUsers?.length ? 16 : 0 },
                ]}
                value={searchText}
              />
            </View>
          )}
        </View>
        <View style={styles.searchContainerRight}>
          {selectedUsers?.length === 0 ? (
            <User pathFill={grey} />
          ) : (
            <UserAdd pathFill={grey} />
          )}
        </View>
      </TouchableOpacity>
      {focusOnSearchInput && !searchText && selectedUsers?.length === 0 && (
        <TouchableOpacity
          onPress={() => {
            navigation.push("NewGroupChannelAddMemberScreen")
          }}
          style={styles.createGroupButtonContainer}
        >
          {/* @ts-ignore */}
          <RoundButton>
            <Group pathFill={accent_blue} />
          </RoundButton>
          <Text style={[styles.createGroupButtonText, { color: black }]}>
            Create a Group
          </Text>
        </TouchableOpacity>
      )}
      {results && focusOnSearchInput && (
        <UserSearchResults
          toggleSelectedUser={user => {
            setFocusOnSearchInput(false)
            toggleUser(user)
          }}
        />
      )}
    </View>
  )

  if (!client) return null

  if (!currentChannel.current) {
    return renderUserSearch({ inSafeArea: false })
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: white }]}>
      <Channel<
        AttachmentType,
        ChannelType,
        CommandType,
        EventType,
        MessageType,
        ReactionType,
        UserType
      >
        additionalTextInputProps={{
          onFocus: () => {
            setFocusOnMessageInput(true)
            setFocusOnSearchInput(false)
            if (messageInputRef.current) {
              messageInputRef.current.focus()
            }
          },
        }}
        // @ts-ignore
        channel={currentChannel.current}
        EmptyStateIndicator={EmptyMessagesIndicator}
        enforceUniqueReaction
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300}
        onChangeText={setMessageInputText}
        SendButton={NewDirectMessagingSendButton}
        setInputRef={ref => (messageInputRef.current = ref)}
      >
        {renderUserSearch({ inSafeArea: true })}
        {results &&
          results.length >= 0 &&
          !focusOnSearchInput &&
          focusOnMessageInput && <MessageList />}
        {selectedUsers?.length > 0 && <MessageInput />}
      </Channel>
    </SafeAreaView>
  )
}
export default NewDirectMessagingScreen
