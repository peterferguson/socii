import React, { useEffect, useState } from "react"
import { Image, View } from "react-native"
import { getGroupMemberPhotos } from "../lib/firebase/client/db/getGroupMemberPhotos"
import tw from "../lib/tailwind"
import { useRouter } from "../navigation/use-router"

export const GroupMemberProfilePhotos = ({
  groupName,
  photoStyles,
}: {
  groupName: string
  photoStyles: any
}) => {
  const [memberPhotos, setMemberPhotos] = useState<string[]>([])

  useEffect(() => {
    groupName &&
      getGroupMemberPhotos(groupName).then((photoUrls) => setMemberPhotos(photoUrls))
  }, [])

  return (
    <View style={tw`flex-row items-center justify-center`}>
      <View style={tw`flex-row items-center justify-center rounded-full`}>
        {memberPhotos?.map((photo, i) => (
          <Image
            key={`${groupName}-member-photo-${i}`}
            source={{ uri: photo }}
            style={photoStyles}
          />
        ))}
      </View>
    </View>
  )
}
