import { CloseCircle as CloseIcon } from "iconsax-react-native"
import React from "react"
import { TouchableOpacity } from "react-native"
import { useSearchUsers } from "app/hooks"
import tw from "app/lib/tailwind"
import { CenteredColumn, CenteredRow } from "../Centered"
import UserResult from "./UserResult"

const SelectedUsers: React.FC = () => {
  const { selectedUsers, toggleUser } = useSearchUsers()
  return (
    <CenteredColumn style={tw`items-start w-full`}>
      {selectedUsers?.map(user => (
        <CenteredRow
          key={`selected-user-${user.id}`}
          style={tw`items-center justify-between px-4 py-2 w-full`}
        >
          <UserResult user={user} />
          <TouchableOpacity onPress={() => toggleUser(user)}>
            <CloseIcon size={24} color={tw.color("red-500")} />
          </TouchableOpacity>
        </CenteredRow>
      ))}
    </CenteredColumn>
  )
}

export default SelectedUsers
