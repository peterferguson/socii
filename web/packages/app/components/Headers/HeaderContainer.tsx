import React from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { useAuth } from "app/hooks/useAuth"
import tw from "app/lib/tailwind"
import HeaderText from "../Text/HeaderText"

const HeaderContainer = ({
  headerTitle,
  text,
  showBackButton,
}: {
  headerTitle: string
  text?: string
  showBackButton?: boolean
}) => {
  const { user, signout } = useAuth()

  if (!text) text = headerTitle

  return user ? (
    <View
      style={tw`flex-1 bg-brand-gray dark:bg-brand-black flex-row pr-4 items-center justify-between`}
    >
      <HeaderText text={text} />
      <TouchableOpacity
        style={tw`flex flex-col items-center justify-center`}
        onPress={() => signout("", false)}
      >
        {user?.photoUrl ? (
          <Image
            source={user?.photoUrl ? { uri: user.photoUrl } : null}
            style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
          />
        ) : (
          <HeaderText text={`${user.displayName} logout?`} />
        )}
      </TouchableOpacity>
    </View>
  ) : (
    <HeaderText text={headerTitle} />
  )
}

export default HeaderContainer
