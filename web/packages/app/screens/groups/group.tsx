import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { useCallback, useState } from "react"
import { ScrollView, View } from "react-native"
import type { UserResponse } from "stream-chat"
import { Chat } from "stream-chat-expo"
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
} from "../../components"
import { SearchUsersProvider } from "../../contexts"
import { useAuth, useSearchUsers, useStream } from "../../hooks"
import { useModal } from "../../hooks/useModal"
import {
  getUserWithUsername,
  inviteInvestorToGroup,
} from "../../lib/firebase/client/db"
import tw from "../../lib/tailwind"
import { createParam } from "../../navigation/use-param"
import ModalHeader from "../../components/ModalHeader"

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
        <CenteredColumn
          style={tw.style(`bg-white w-full`, {
            height: scrollPositions[modalPosition],
          })}
        >
          <UserSearch groupName={groupName} />
        </CenteredColumn>
      </View>
    </Modal>
  )
}

const UserSearch: React.FC<{ groupName: string }> = ({ groupName }) => {
  const { user } = useAuth()
  const { client: chatClient } = useStream()

  return (
    <>
      {user?.streamToken ? (
        // @ts-ignore
        <Chat client={chatClient}>
          <SearchUsersProvider>
            <AddSelectedMembersToGroup groupName={groupName} />
            <UserSearchInput onSubmit={() => {}} />
            <UserSearchResults />
          </SearchUsersProvider>
        </Chat>
      ) : (
        <LoadingIndicator color={tw.color("brand")} size={50} />
      )}
    </>
  )
}

const AddSelectedMembersToGroup: React.FC<{ groupName: string }> = ({ groupName }) => {
  const { selectedUsers } = useSearchUsers()

  const handlePress = useCallback(
    () => addMembersToGroup(groupName, selectedUsers),
    [groupName]
  )

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
  // ! The id will come from stream and should be the username
  users.map(async ({ id: username }: { id: string }) => {
    const userDetails = await getUserWithUsername(username)
    const { uid, groups, alpacaAccountId } = userDetails.data()
    if (groups.includes(groupName)) return

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
