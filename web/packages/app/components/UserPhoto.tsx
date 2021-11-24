import { useAuth } from "app/hooks/useAuth"
import React from "react"
import { ViewStyle, ImageStyle, TouchableOpacity, Image } from "react-native"
import tw from "app/lib/tailwind"

export const UserPhoto: React.FC<{
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle
  overrideOnPress?: () => void
}> = ({
  overrideOnPress = undefined,
  containerStyle = tw`flex-1 items-center justify-center`,
  imageStyle = tw`w-7 h-7 rounded-full mr-2`,
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
          style={imageStyle}
        />
      )}
    </TouchableOpacity>
  )
}
