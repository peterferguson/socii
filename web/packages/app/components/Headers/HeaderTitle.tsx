import { useAuth } from "app/hooks/useAuth"
import tw from "app/lib/tailwind"
import React from "react"
import { Image, TouchableOpacity } from "react-native"
import { HeaderContainer } from "."
import HeaderText from "../Text/HeaderText"

const HeaderTitle: React.FC<{
  headerTitle: string
  text?: string
}> = ({ headerTitle, text }) => {
  const { user, signout } = useAuth()

  if (!text) text = headerTitle

  return (
    <HeaderContainer>
      {user ? (
        <>
          <HeaderText text={text} />
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
        </>
      ) : (
        <HeaderText text={headerTitle} />
      )}
    </HeaderContainer>
  )
}
export default HeaderTitle
