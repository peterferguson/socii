import React from "react"
import { Image, Pressable, View } from "react-native"
import { useAuth } from "../../hooks/useAuth"
import tw from "../../lib/tailwind"
import { userFirstName } from "../../utils/userFirstName"
import HeaderText from "../Text/HeaderText"

const EnterHeader = ({ headerTitle }) => {
  const { user, signout } = useAuth()

  return user ? (
    <View style={tw`flex-1 flex-row pr-4 items-center justify-between`}>
      <HeaderText text={`Welcome ${userFirstName(user?.displayName)}`} />
      <Pressable
        style={tw`flex flex-col items-center justify-center`}
        onPress={() => signout("", false)}
      >
        {user?.photoUrl ? (
          <Image
            source={user?.photoUrl ? { uri: user.photoUrl } : null}
            style={{ width: 28, height: 28, borderRadius: 14 }}
          />
        ) : (
          <HeaderText text={`${user.displayName} logout?`} />
        )}
      </Pressable>
    </View>
  ) : (
    <HeaderText text={headerTitle} />
  )
}

export default EnterHeader
