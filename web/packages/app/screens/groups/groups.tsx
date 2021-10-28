import React from "react"
import tw from "../../lib/tailwind"
import { View, FlatList, Text } from "react-native"
import GroupColumn from "../../components/GroupColumnCard"
// import { PieCardSkeleton } from "../../components/PieCard"
import { useAuth } from "../../hooks/useAuth"

const GroupPortfolios = (): JSX.Element => {
  const { user } = useAuth()
  return (
    <View
      style={tw`flex-col items-center justify-center mx-4 my-8 sm:my-0 min-h-[500px]`}
    >
      <View style={tw`flex-col sm:flex-row w-full items-center justify-center`}>
        <FlatList
          data={user?.groups}
          keyExtractor={(groupName) => groupName}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: groupName }) => <GroupColumn groupName={groupName} />}
        />
      </View>
    </View>
  )
}

export default GroupPortfolios
