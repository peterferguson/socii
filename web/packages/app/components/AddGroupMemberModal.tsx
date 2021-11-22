import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { CenteredColumn, Modal } from "app/components"
import { ModalHeader } from "app/components/Modal"
import tw from "app/lib/tailwind"
import React from "react"
import { View } from "react-native"
import { UserSearch } from "./UserSearch"

export const AddGroupMemberModal: React.FC<{
  groupName: string
  modalRef: React.MutableRefObject<BottomSheetModal>
}> = ({ modalRef, groupName }) => {
  const scrollPositions = ["50%", "90%"]

  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      defaultPositionIndex={0}
    >
      <View style={tw`flex-1 items-center pt-2`}>
        <ModalHeader modalRef={modalRef} label={"Add a new member 🥳"} />
        <CenteredColumn style={tw.style(`bg-white w-full h-full`)}>
          <UserSearch groupName={groupName} modalRef={modalRef} />
        </CenteredColumn>
      </View>
    </Modal>
  )
}
