import {
  UserSearch as UserSearchIcon,
  CloseCircle as CloseIcon,
} from "iconsax-react-native"
import React, { useState } from "react"
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg"
import type { UserResponse } from "stream-chat"
import { Avatar, Chat, vw } from "stream-chat-expo"
import { useSearchUsersContext } from "../contexts/searchUsersContext"
import { SearchUsersProvider } from "../contexts/SearchUsersProvider"
import { useAuth } from "../hooks/useAuth"
import { useStream } from "../hooks/useStream"
import { useStreamChatTheme } from "../hooks/useStreamChatTheme"
import tw from "../lib/tailwind"
import { CenteredColumn, CenteredRow } from "./Centered"
import LoadingIndicator from "./LoadingIndicator"

const styles = StyleSheet.create({
  absolute: { position: "absolute" },
  emptyResultIndicator: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 28,
  },
  emptyResultIndicatorText: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 28,
  },
  flex: { flex: 1, width: "100%" },
  gradient: {
    height: 24,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  matches: { fontSize: 12 },
  searchResultContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 12,
  },
  searchResultUserDetails: {
    flex: 1,
    paddingLeft: 8,
  },
  searchResultUserLastOnline: { fontSize: 12 },
  searchResultUserName: { fontSize: 14, fontWeight: "700" },
  sectionHeader: {
    fontSize: 14.5,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  cancelButton: {
    alignSelf: "center",
    padding: 5,
  },
  headerContainer: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
  },
  inputBox: {
    borderRadius: 6,
    borderWidth: 0.5,
    elevation: 2,
    flex: 1,
    margin: 3,
    padding: 15,
  },
})

type UserSearchResultsProps = { groupedAlphabetically?: boolean }

export const UserSearchResults: React.FC<UserSearchResultsProps> = ({
  groupedAlphabetically = true,
}) => {
  const { loading, loadMore, searchText, results } = useSearchUsersContext()

  const {
    colors: { bg_gradient_end, bg_gradient_start, grey },
  } = useStreamChatTheme()

  return (
    <View style={[styles.flex, { backgroundColor: "white" }]}>
      {groupedAlphabetically && results.length > 0 && (
        <View style={searchText ? styles.gradient : undefined}>
          <Svg height={24} style={styles.absolute} width={vw(100)}>
            <Rect fill="url(#gradient)" height={24} width={vw(100)} x={0} y={0} />
            <Defs>
              <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="gradient"
                x1={0}
                x2={0}
                y1={0}
                y2={24}
              >
                <Stop offset={1} stopColor={bg_gradient_start} stopOpacity={1} />
                <Stop offset={0} stopColor={bg_gradient_end} stopOpacity={1} />
              </LinearGradient>
            </Defs>
          </Svg>
          {searchText ? (
            <Text style={[styles.matches, { color: grey }]}>
              {`Matches for "${searchText}"`}
            </Text>
          ) : null}
        </View>
      )}
      {loading && (!results || results.length === 0) && searchText === "" ? (
        <CenteredColumn>
          <LoadingIndicator />
        </CenteredColumn>
      ) : (
        <FlatList
          data={results}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={() => (
            <View style={styles.emptyResultIndicator}>
              <Text style={[{ color: grey }, styles.emptyResultIndicatorText]}>
                {loading ? "Loading..." : "No user matches these keywords..."}
              </Text>
            </View>
          )}
          onEndReached={loadMore}
          renderItem={({ item: user }) => <UserSearchResultItem user={user} />}
        />
      )}
    </View>
  )
}

const UserSearchResultItem: React.FC<{ user: UserResponse }> = ({ user }) => {
  const { toggleUser } = useSearchUsersContext()

  return (
    <TouchableOpacity
      key={user.id}
      onPress={() => toggleUser(user)}
      style={tw`h-12 my-2 pl-8`}
    >
      <UserResult user={user} />
    </TouchableOpacity>
  )
}

const UserResult: React.FC<{ user: UserResponse }> = ({ user }) => {
  return (
    <View style={tw`flex-1 flex-row items-center`}>
      <Avatar
        image={user.image as string}
        name={user.name}
        online={user.online}
        size={40}
      />
      <CenteredColumn style={tw`items-start`}>
        <Text
          style={tw`pl-4 text-brand-black dark:text-brand-white capitalize font-poppins-600`}
        >
          {user.name}
        </Text>
        <Text style={tw`pl-4 text-xs text-gray-500 font-poppins-400`}>{user.id}</Text>
      </CenteredColumn>
    </View>
  )
}

export const UserSearchInput = ({ onSubmit, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const { clearText, searchText, onFocusInput, onChangeSearchText } =
    useSearchUsersContext()

  return (
    <CenteredRow style={tw`w-11/12 px-1 py-3`}>
      {(!isFocused || searchText === "") && (
        <UserSearchIcon
          size="24"
          color={tw.color("brand-black/20")}
          style={tw`absolute left-5`}
        />
      )}
      <TextInput
        autoFocus={false}
        onFocus={() => {
          onFocusInput()
          setIsFocused(true)
        }}
        onChangeText={onChangeSearchText}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={() => {
          onSubmit(searchText)
          clearText()
          setIsFocused(false)
        }}
        placeholder=""
        placeholderTextColor={tw.color("brand-black")}
        returnKeyType="search"
        style={tw`rounded-full border border-brand-black/30 p-4 w-full h-12`}
      />
    </CenteredRow>
  )
}

export const UserSearch = () => {
  const { user } = useAuth()
  const { client: chatClient } = useStream()

  return (
    <>
      {user?.streamToken ? (
        <Chat client={chatClient}>
          <SearchUsersProvider>
            <UserSearchInput onSubmit={() => {}} />
            <SelectedUsers />
            <UserSearchResults groupedAlphabetically={false} />
          </SearchUsersProvider>
        </Chat>
      ) : (
        <LoadingIndicator color={tw.color("brand")} size={50} />
      )}
    </>
  )
}

const SelectedUsers: React.FC = () => {
  const { selectedUsers, removeUser } = useSearchUsersContext()
  return (
    <CenteredColumn style={tw`items-start w-full`}>
      {selectedUsers.map((user) => (
        <CenteredRow
          key={`selected-user-${user.id}`}
          style={tw`items-center justify-between px-4 py-2 w-full`}
        >
          <UserResult user={user} />
          <TouchableOpacity onPress={() => removeUser(user.id)}>
            <CloseIcon size={24} color={tw.color("red-500")} />
          </TouchableOpacity>
        </CenteredRow>
      ))}
    </CenteredColumn>
  )
}
