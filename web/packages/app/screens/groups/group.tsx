import { BottomSheetModal } from "@gorhom/bottom-sheet"
import {
  Button,
  ChatWithGroupButton,
  GroupActivities,
  GroupColumnCard,
} from "app/components"
import { useModal } from "app/hooks"
import tw from "app/lib/tailwind"
import { createParam } from "app/navigation/use-param"
import React from "react"
import { ScrollView, View } from "react-native"
import { AddGroupMemberModal } from "../../components/AddGroupMemberModal"

type Query = {
  id: string
}

const { useParam } = createParam<Query>()

export default () => {
  const [groupName] = useParam("id")

  const modalRef = React.useRef<BottomSheetModal>(null)

  const { handlePresent } = useModal(modalRef)

  return (
    <View style={tw`flex-col m-4`}>
      <ScrollView>
        <GroupColumnCard groupName={groupName} />
        <Button label={"Add a friend"} onPress={handlePresent} />
        <ChatWithGroupButton groupName={groupName} />
        <GroupActivities groupName={groupName} />
        <AddGroupMemberModal modalRef={modalRef} groupName={groupName} />
      </ScrollView>
    </View>
  )
}
