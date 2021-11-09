import React from "react"
import { Text, View } from "react-native"
import { UserResponse } from "stream-chat"
import { Avatar } from "stream-chat-expo"
import tw from "../../lib/tailwind"
import { CenteredColumn } from "../Centered"

const UserResult: React.FC<{ user: UserResponse }> = ({ user }) => {
  return (
    <View style={tw`flex-1 flex-row items-center`}>
      <Avatar
        image={user.image as string}
        name={user.name}
        online={user.online}
        size={40}
      />
      <CenteredColumn style={tw`items-start`}>
        <Text
          style={tw`pl-4 text-brand-black dark:text-white capitalize font-poppins-600`}
        >
          {user.name}
        </Text>
        <Text style={tw`pl-4 text-xs text-gray-500 font-poppins-400`}>{user.id}</Text>
      </CenteredColumn>
    </View>
  )
}

export default UserResult
