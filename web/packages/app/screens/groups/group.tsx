import React from "react"
import { View } from "react-native"
import GroupColumn from "../../components/GroupColumnCard"
import tw from "../../lib/tailwind"
import { createParam } from "../../navigation/use-param"

type Query = {
  id: string
}

const { useParam } = createParam<Query>()

export default () => {
  const [groupName] = useParam("id")
  return (
    <View style={tw`flex-col m-4`}>
      <GroupColumn groupName={groupName} />
    </View>
  )
}
