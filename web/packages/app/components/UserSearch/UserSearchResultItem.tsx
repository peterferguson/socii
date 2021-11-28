import React from "react"
import { TouchableOpacity } from "react-native"
import { UserResponse } from "stream-chat"
import { useSearchUsers } from "app/hooks"
import tw from "app/lib/tailwind"
import UserResult from "./UserResult"

const UserSearchResultItem: React.FC<{ user: UserResponse }> = ({ user }) => {
  const { toggleUser } = useSearchUsers()

  return (
    <TouchableOpacity
      key={user.id}
      onPress={() => toggleUser(user)}
      style={tw`h-12 my-2 pl-8`}
    >
      <UserResult user={user} />
    </TouchableOpacity>
  )
}

export default UserSearchResultItem
