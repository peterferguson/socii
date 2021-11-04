import React from "react"
import { Image, TouchableOpacity, View } from "react-native"
import { useAuth } from "../../hooks/useAuth"
import tw from "../../lib/tailwind"
import HeaderText from "../Text/HeaderText"
import { useRouter } from "../../navigation/use-router"

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
