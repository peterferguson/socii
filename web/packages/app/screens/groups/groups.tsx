import React from "react"
import { FlatList, View } from "react-native"
import GroupColumn from "../../components/GroupColumnCard"
import { useAuth } from "../../hooks/useAuth"
import tw from "../../lib/tailwind"

const GroupPortfolios = (): JSX.Element => {
  const { user } = useAuth()

  const data = [...user?.groups, ...user?.groups]

  return (
    <View style={tw`flex-col items-center justify-center mx-4 mt-4`}>
      <View style={tw`flex-col sm:flex-row w-full items-center justify-center`}>
        <FlatList
          data={data}
          keyExtractor={(groupName, index) => `group-${index}-${groupName}`}
          showsVerticalScrollIndicator={false}
          scrollEnabled={data.length > 1}
          renderItem={({ item: groupName }) => <GroupColumn groupName={groupName} />}
        />
      </View>
    </View>
  )
}

export default GroupPortfolios
