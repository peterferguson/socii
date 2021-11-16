import { useAuth } from "app/hooks/useAuth"
import tw from "app/lib/tailwind"
import React from "react"
import { Image, View, TouchableOpacity, TextStyle, ViewStyle } from "react-native"
import HeaderText from "../Text/HeaderText"

const HeaderTitle: React.FC<{
  headerTitle: string
  text?: string
  containerStyle?: ViewStyle
  textStyle?: TextStyle
}> = ({ headerTitle, text, containerStyle, textStyle }) => {
  const { user, signout } = useAuth()

  if (!text) text = headerTitle

  return (
    <View style={containerStyle}>
      <HeaderText text={text} style={textStyle} />
      {user && (
        <TouchableOpacity
          style={tw`flex flex-col items-center justify-center`}
          onPress={() => signout("", false)}
        >
          {user?.photoUrl && (
            <Image
              source={user?.photoUrl ? { uri: user.photoUrl } : null}
              style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}
export default HeaderTitle
