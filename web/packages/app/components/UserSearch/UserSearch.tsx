import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { SearchUsersProvider } from "app/contexts"
import { useStream } from "app/hooks/useStream"
import tw from "app/lib/tailwind"
import React from "react"
import { AddSelectedMembersToGroup } from "../AddSelectedMembersToGroup"
import LoadingIndicator from "../LoadingIndicator"
import UserSearchInput from "./UserSearchInput"
import UserSearchResults from "./UserSearchResults"

const UserSearch: React.FC<{
  groupName: string
  modalRef: React.MutableRefObject<BottomSheetModal>
}> = ({ groupName, modalRef, ...props }) => {
  // TODO: Animate the change in position of the loading indicator in line with the snap
  // TODO: position of the modal. Probably easiest to do this with moti
  const { clientReady } = useStream()
  return (
    <>
      {clientReady ? (
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
