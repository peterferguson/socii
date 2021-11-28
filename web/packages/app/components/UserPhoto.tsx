import React, { useEffect } from "react"
import { ViewStyle, ImageStyle, TouchableOpacity, Image } from "react-native"
import tw from "app/lib/tailwind"
import { getUserPhotoURL } from "app/lib/firebase/db/getUserPhotoURL"
import { Avatar } from "stream-chat-expo"
import { useAuth, useStream } from "app/hooks/"

interface QueriedUser {
  banned: boolean
  created_at: string
  id: string
  last_active: string
  name: string
  online: boolean
  role: string
  shadow_banned: boolean
  updated_at: string
}

// TODO: Implement a Avatar version of this component so we can display presence easily too

export const UserPhoto: React.FC<{
  username?: string
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle
  overrideOnPress?: () => void
}> = ({
  username = null,
  overrideOnPress = undefined,
  containerStyle = tw`items-center justify-center`,
  imageStyle = tw`w-7 h-7 rounded-full`,
}) => {
  const { user, signout } = useAuth()
  // const { client } = useStream()
  if (!(user || username)) return null
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null)
  // const [streamUser, setStreamUser] = React.useState<QueriedUser>(null)

  // useEffect(() => {
  //   client
  //     .queryUsers(
  //       { id: { $in: [user?.username] } },
  //       { last_active: -1 },
  //       { presence: true }
  //     )
  //     .then(users => {
  //       console.log(users)
  //       // @ts-ignore
  //       if (users.length === 0) return
  //       setStreamUser(users[0])
  //     })
  // }, [user?.username])

  React.useEffect(() => {
    if (!username) setPhotoUrl(user.photoUrl)
    else getUserPhotoURL(username).then(setPhotoUrl)
  }, [user, username])

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => (overrideOnPress ? overrideOnPress() : signout("", false))}
    >
      {/* TODO: Update this to instead display some default if photo is not present */}
      {photoUrl && (
        <Image source={photoUrl ? { uri: photoUrl } : null} style={imageStyle} />
      )}
      {/* {streamUser && (
        <Avatar
          // image  ={streamUser.image}
          name={streamUser.name}
          online={true}
          size={40}
        />
      )} */}
    </TouchableOpacity>
  )
}
