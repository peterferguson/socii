import React from "react"
import { Image, Pressable, View, TouchableOpacity } from "react-native"
import { useAuth } from "../../hooks/useAuth"
import tw from "../../lib/tailwind"
import { useRouter } from "../../navigation/use-router"
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
  const router = useRouter()

  if (!text) text = headerTitle

  return user ? (
    <View
      style={tw`flex-1 bg-brand-gray dark:bg-brand-black flex-row pr-4 items-center justify-between`}
    >
      {showBackButton && <Pressable style={tw`flex-1`} onPress={() => router.back()} />}
      <HeaderText text={text} />
      <TouchableOpacity
        style={tw`flex flex-col items-center justify-center`}
        onPress={() => {router.push("/settings/")}}
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
