import LoadingIndicator from "../../components/LoadingIndicator"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React from "react"
import { ScrollView, Text, View } from "react-native"
import Button from "../../components/Button"
import { ChatWithGroupButton } from "../../components/ChatWithGroup"
import GroupActivities from "../../components/GroupActivities/GroupActivities"
import GroupColumn from "../../components/GroupColumnCard"
import Modal from "../../components/Modal"
import { useModal } from "../../hooks/useModal"
import tw from "../../lib/tailwind"
import { createParam } from "../../navigation/use-param"

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
        <GroupColumn groupName={groupName} />
        <Button label={"Add a friend"} onPress={handlePresent} />
        <ChatWithGroupButton groupName={groupName} />
        <GroupActivities groupName={groupName} />
        <Modal modalRef={modalRef} detach>
          <View style={tw`flex-1 items-center`}>
            <Text>Awesome 🎉</Text>
            <LoadingIndicator color={tw.color("brand")} size={50} />
          </View>
        </Modal>
      </ScrollView>
    </View>
  )
}
