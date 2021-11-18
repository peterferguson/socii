import { useAuth } from "app/hooks/useAuth"
import React from "react"
import { ViewStyle, TouchableOpacity, Image } from "react-native"
import tw from "app/lib/tailwind"

export const UserPhoto: React.FC<{
  containerStyle?: ViewStyle
  overrideOnPress?: () => void
}> = ({
  overrideOnPress = undefined,
  containerStyle = tw`flex-1 items-center justify-center`,
}) => {
  const { user, signout } = useAuth()

  if (!user) return null
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => (overrideOnPress ? overrideOnPress() : signout("", false))}
    >
      {/* TODO: Update this to instead display some default if photo is not present */}
      {user?.photoUrl && (
        <Image
          source={user?.photoUrl ? { uri: user.photoUrl } : null}
          style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
        />
      )}
    </TouchableOpacity>
  )
}
