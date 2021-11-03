import LoadingIndicator from "../../components/LoadingIndicator"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React from "react"
import { ScrollView, Text, View, Pressable } from "react-native"
import Button from "../../components/Button"
import { ChatWithGroupButton } from "../../components/ChatWithGroup"
import GroupActivities from "../../components/GroupActivities/GroupActivities"
import GroupColumn from "../../components/GroupColumnCard"
import Modal from "../../components/Modal"
import { useModal } from "../../hooks/useModal"
import tw from "../../lib/tailwind"
import { createParam } from "../../navigation/use-param"
import { Add } from "iconsax-react-native"

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
        <AddGroupMemberModal modalRef={modalRef} />
      </ScrollView>
    </View>
  )
}

const AddGroupMemberModal = ({ modalRef }) => {
  return (
    <Modal modalRef={modalRef} detach>
      <View style={tw`flex-1 items-center pt-2`}>
        <ModalHeader modalRef={modalRef} label={"Add a new member 🥳"} />
        <LoadingIndicator color={tw.color("brand")} size={50} />
      </View>
    </Modal>
  )
}

const ModalHeader = ({ modalRef, label }) => {
  const { handleDismiss } = useModal(modalRef)
  return (
    <>
      <View style={tw`flex-row items-center justify-between w-11/12`}>
        <Text style={tw`font-poppins-600  text-brand-black dark:text-brand-black`}>
          {label}
        </Text>
        <Pressable onPress={handleDismiss}>
          <Add size="24" color={tw.color("brand-black")} style={{ transform: [{ rotate: "45deg" }] }} />
        </Pressable>
      </View>
      <View
        style={tw.style(`border-brand-black/20 pt-2 w-full h-1`, {
          borderBottomWidth: 0.5,
        })}
      />
    </>
  )
}
