import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { UserSearchInput, UserSearchResults } from "."
import LoadingIndicator from "../LoadingIndicator"
import { SearchUsersProvider } from "app/contexts"
import tw from "app/lib/tailwind"
import React from "react"
import { StreamChat } from "stream-chat"
import { AddSelectedMembersToGroup } from "../AddSelectedMembersToGroup"

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

export default UserSearch
