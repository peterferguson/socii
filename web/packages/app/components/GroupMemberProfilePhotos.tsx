import React, { useEffect, useState } from "react"
import { Image, View } from "react-native"
import { getGroupMemberPhotos } from "app/lib/firebase/db/getGroupMemberPhotos"
import tw from "app/lib/tailwind"

const GroupMemberProfilePhotos = ({
  groupName,
  photoStyles,
}: {
  groupName: string
  photoStyles: any
}) => {
  const [memberPhotos, setMemberPhotos] = useState<string[]>([])

  useEffect(() => {
    groupName &&
      getGroupMemberPhotos(groupName).then(photoUrls => setMemberPhotos(photoUrls))
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

export default GroupMemberProfilePhotos
