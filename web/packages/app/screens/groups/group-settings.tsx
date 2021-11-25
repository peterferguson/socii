import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { CenteredColumn, CenteredRow, UserPhoto } from "app/components"
import { useModal, useStream } from "app/hooks"
import { useDisplayAvatar } from "app/hooks/useDisplayAvatar"
import tw from "app/lib/tailwind"
import { Channel } from "app/models/stream/types"
import { createParam } from "app/navigation/use-param"
import { AddCircle } from "iconsax-react-native"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Avatar, ChannelAvatar, Chat, GroupAvatar } from "stream-chat-expo"

type Query = {
  id: string
}

const { useParam } = createParam<Query>()

export default () => {
  const [groupName] = useParam("id")
  const modalRef = React.useRef<BottomSheetModal>(null)
  const { handlePresent } = useModal(modalRef)
  const [channel, setChannel] = useState<Channel>()
  const { client } = useStream()

  useEffect(() => {
    const filter = { type: "group", id: { $eq: groupName } }
    const sort = [{ last_message_at: -1 }]
    client
      .queryChannels(filter, sort as any, { watch: false, state: true })
      .then(channels => setChannel(channels[0]))
  }, [])

  const displayAvatar = useDisplayAvatar(channel as any, client as any)

  useEffect(() => console.log(displayAvatar), [displayAvatar])

  return (
    <>
      <CenteredColumn style={tw`justify-start m-4`}>
        {displayAvatar?.images && (
          <GroupAvatar
            size={80}
            images={displayAvatar.images}
            names={displayAvatar.names}
          />
        )}
        <Text style={tw`mt-4 text-3xl font-poppins-600`}>{groupName}</Text>
      </CenteredColumn>
      <Text style={tw`ml-4 mt-4 text-xl font-poppins-600`}>Members</Text>
      <CenteredRow style={tw`justify-evenly m-4`}>
        {channel &&
          Object.values(channel.state.members).map(member => {
            const id = member?.user_id
            const name = member?.user.name
            return (
              <View key={id} style={tw`mr-4`}>
                <UserPhoto
                  username={id}
                  overrideOnPress={() => {}}
                  imageStyle={tw`rounded-full w-12 h-12`}
                />
                <Text
                  style={tw`text-center text-xs font-poppins-400 mt-1`}
                  numberOfLines={2}
                >
                  {name.replace(/\s+/g, "\n")}
                </Text>
              </View>
            )
          })}
        <TouchableOpacity onPress={() => {}} style={tw`-mt-0.5`}>
          <AddCircle size="54" color={tw.color("gray-300")} />
          <Text style={tw`text-center text-xs font-poppins-400`}>
            {`Send \n invite`}
          </Text>
        </TouchableOpacity>
      </CenteredRow>
    </>
  )
}
