import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Add } from "iconsax-react-native"
import React, { useCallback, useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"
import Button from "../../components/Button"
import { ChatWithGroupButton } from "../../components/ChatWithGroup"
import GroupActivities from "../../components/GroupActivities/GroupActivities"
import GroupColumn from "../../components/GroupColumnCard"
import LoadingIndicator from "../../components/LoadingIndicator"
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
        <AddGroupMemberModal modalRef={modalRef} />
      </ScrollView>
    </View>
  )
}

const AddGroupMemberModal = ({ modalRef }) => {
  const [modalPosition, setModalPosition] = useState(1)
  const scrollPositions = ["25%", "50%", "90%"]

  const handleSheetChanges = useCallback((index: number) => setModalPosition(index), [])

  // TODO: Animate the change in position of the loading indicator in line with the snap
  // TODO: position of the modal. Probably easiest to do this with moti
  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      detach
      onChange={handleSheetChanges}
    >
      <View style={tw`flex-1 items-center pt-2`}>
        <ModalHeader modalRef={modalRef} label={"Add a new member 🥳"} />
        <View
          style={tw.style(`flex-col w-full items-center justify-center`, {
            height: scrollPositions[modalPosition],
          })}
        >
          <LoadingIndicator color={tw.color("brand")} size={50} />
        </View>
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
          <Add
            size="24"
            color={tw.color("brand-black")}
            style={{ transform: [{ rotate: "45deg" }] }}
          />
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
