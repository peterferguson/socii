import React from "react"
import { FlatList, Text, View } from "react-native"
import { useSearchUsers } from "app/hooks"
import tw from "app/lib/tailwind"
import { CenteredColumn } from "../Centered"
import LoadingIndicator from "../LoadingIndicator"
import UserSearchResultItem from "./UserSearchResultItem"

const UserSearchResults: React.FC = () => {
  const { loading, loadMore, searchText, results } = useSearchUsers()

  return (
    <View style={tw`bg-white dark:bg-brand-black w-full flex-1`}>
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
            <CenteredColumn style={tw`items-center justify-center p-6`}>
              <Text style={tw`font-poppins-500 text-gray-500`}>
                {loading ? "Loading..." : "No user matches these keywords..."}
              </Text>
            </CenteredColumn>
          )}
          onEndReached={loadMore}
          renderItem={({ item: user }) => <UserSearchResultItem user={user} />}
        />
      )}
    </View>
  )
}

export default UserSearchResults
