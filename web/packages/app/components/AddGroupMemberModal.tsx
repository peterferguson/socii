import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { CenteredColumn, Modal } from "app/components"
import { ModalHeader } from "app/components/Modal"
import { useStream } from "app/hooks"
import tw from "app/lib/tailwind"
import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { UserSearch } from "./UserSearch"

export const AddGroupMemberModal: React.FC<{
  groupName: string
  modalRef: React.MutableRefObject<BottomSheetModal>
}> = ({ modalRef, groupName }) => {
  const [modalPosition, setModalPosition] = useState(1)
  const scrollPositions = ["25%", "50%", "90%"]
  const { client } = useStream()

  const handleSheetChanges = useCallback((index: number) => setModalPosition(index), [])
  return (
    <Modal
      modalRef={modalRef}
      snapToPositions={scrollPositions}
      onChange={handleSheetChanges}
    >
      <View style={tw`flex-1 items-center pt-2`}>
        <ModalHeader modalRef={modalRef} label={"Add a new member 🥳"} />
        <CenteredColumn
          style={tw.style(`bg-white w-full`, {
            height: scrollPositions[modalPosition],
          })}
        >
          <UserSearch groupName={groupName} modalRef={modalRef} client={client} />
        </CenteredColumn>
      </View>
    </Modal>
  )
}
