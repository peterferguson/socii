import { BottomSheetModal } from "@gorhom/bottom-sheet"
import {
  Button,
  CenteredColumn,
  ChatWithGroupButton,
  GroupActivities,
  GroupColumnCard,
  LoadingIndicator,
  Modal,
  SelectedUsers,
  UserSearchInput,
  UserSearchResults,
} from "app/components"
import { ModalHeader } from "app/components/Modal"
import { SearchUsersProvider } from "app/contexts"
import { useModal, useSearchUsers, useStream } from "app/hooks"
import { getUserWithUsername, inviteInvestorToGroup } from "app/lib/firebase/db"
import tw from "app/lib/tailwind"
import { createParam } from "app/navigation/use-param"
import React, { useCallback, useEffect, useState } from "react"
import { Keyboard, ScrollView, View } from "react-native"
import type { StreamChat, UserResponse } from "stream-chat"

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

const AddGroupMemberModal: React.FC<{
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

const UserSearch: React.FC<{
  groupName: string
  modalRef: React.MutableRefObject<BottomSheetModal>
  // TODO We need to fix the contexts no longer working in the UserSearch component.
  // ? They seem to work fine in the parent components & the providers are parents.
  client: StreamChat
}> = ({ groupName, modalRef, client, ...props }) => {
  // TODO: Animate the change in position of the loading indicator in line with the snap
  // TODO: position of the modal. Probably easiest to do this with moti
  return (
    <>
      {client?.user ? (
        <SearchUsersProvider>
          <AddSelectedMembersToGroup groupName={groupName} modalRef={modalRef} />
          <UserSearchInput onSubmit={() => {}} />
          <UserSearchResults />
        </SearchUsersProvider>
      ) : (
        <LoadingIndicator color={tw.color("brand")} size={50} />
      )}
    </>
  )
}

const AddSelectedMembersToGroup: React.FC<{
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

const addMembersToGroup = async (groupName: string, users: UserResponse[]) => {
  console.log("Adding members to group", groupName, users)

  // ! The id will come from stream and should be the username
  users.map(async ({ id: username }: { id: string }) => {
    const userDetails = await getUserWithUsername(username)
    const { uid, groups, alpacaAccountId } = userDetails.data()
    if (groups.includes(groupName)) {
      console.log("User already in group", username)
      return
    }

    // - Add user to group awaiting approval of invite
    inviteInvestorToGroup(groupName, username, uid, alpacaAccountId)

    // TODO: We did this only because the user was not accepting the invite
    // ! We should remove this once we have a better way for users to accept invites
    // ! In which place they can edit their groups ... no need for a function
    //   // - Update list for user
    //   updateUserData({
    //     uid: uid,
    //     updateData: { groups: [...groups, groupName] },
    //   })
  })
}
