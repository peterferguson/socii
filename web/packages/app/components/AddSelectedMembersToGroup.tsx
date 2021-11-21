import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Button, CenteredColumn, SelectedUsers } from "app/components"
import { useModal, useSearchUsers } from "app/hooks"
import tw from "app/lib/tailwind"
import React, { useCallback, useEffect } from "react"
import { Keyboard } from "react-native"
import { addMembersToGroup } from "../utils/addMembersToGroup"

export const AddSelectedMembersToGroup: React.FC<{
  groupName: string
  modalRef: React.MutableRefObject<BottomSheetModal>
}> = ({ groupName, modalRef }) => {
  const { selectedUsers, reset } = useSearchUsers()

  const { handleDismiss, handleExpand } = useModal(modalRef)

  // - iOS keyboard opening doesnt move the modal to the top ... so handling this manually
  useEffect(() => {
    const keyboardListener = Keyboard.addListener("keyboardDidShow", _keyboardDidShow)
    return () => keyboardListener.remove()
  }, [])

  const _keyboardDidShow = handleExpand

  const handlePress = useCallback(() => {
    addMembersToGroup(groupName, selectedUsers)
    Keyboard.dismiss()
    reset()
    handleDismiss()
  }, [groupName, selectedUsers, reset])

  return (
    <CenteredColumn style={tw`items-center pt-2`}>
      {selectedUsers.length > 0 && (
        <Button label={"Add Selected Members to Group"} onPress={handlePress} />
      )}
      <SelectedUsers />
    </CenteredColumn>
  )
}
