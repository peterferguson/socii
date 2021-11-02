import GroupActivities from "../../components/GroupActivities/GroupActivities"
import React from "react"
import { ScrollView, View, Text } from "react-native"
import { ChatWithGroupButton } from "../../components/ChatWithGroup"
import GroupColumn from "../../components/GroupColumnCard"
import { Tabs } from "../../components/Tabs/Tabs"
import tw from "../../lib/tailwind"
import { createParam } from "../../navigation/use-param"

type Query = {
  id: string
}

const { useParam } = createParam<Query>()

const tabs = [
  {
    label: "Group",
  },
  {
    label: "Members",
  },
]

export default () => {
  const [groupName] = useParam("id")

  return (
    <View style={tw`flex-col m-4`}>
      <ScrollView>
        <GroupColumn groupName={groupName} />
        <ChatWithGroupButton groupName={groupName} />
        <GroupActivities groupName={groupName} />
        {/* <Tabs tabs={tabs} PanelComponents={null} /> */}
      </ScrollView>
    </View>
  )
}
