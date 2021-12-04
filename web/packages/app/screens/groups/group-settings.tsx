import { BottomSheetModal } from "@gorhom/bottom-sheet"
import {
  CenteredColumn,
  CenteredRow,
  UserPhoto,
  AddGroupMemberModal,
  SkeletonCircle,
} from "app/components"
import { useGroupChatChannel, useModal, useStream } from "app/hooks"
import { useDisplayAvatar } from "app/hooks/useDisplayAvatar"
import tw from "app/lib/tailwind"
import { createParam } from "app/navigation/use-param"
import { AddCircle } from "iconsax-react-native"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { GroupAvatar, Avatar } from "stream-chat-expo"

type Query = {
  id: string
}

const { useParam } = createParam<Query>()

export default () => {
  const [groupName] = useParam("id")
  const { client } = useStream()
  const channel = useGroupChatChannel(groupName)
  const [members, setMembers] = useState(null)
  const [invitees, setInvitees] = useState(null)

  const addMembersModalRef = React.useRef<BottomSheetModal>(null)
  const { handlePresent: openAddMemberModal } = useModal(addMembersModalRef)

  const displayAvatar = useDisplayAvatar(channel as any, client as any)

  useEffect(() => {
    if (channel?.state?.members) {
      setMembers(Object.values(channel.state.members).filter(member => !member.invited))
      setInvitees(Object.values(channel.state.members).filter(member => member.invited))
    }
  }, [channel?.state?.members])

  return (
    <>
      <CenteredColumn style={tw`justify-start m-4`}>
        {displayAvatar?.images ||
          (displayAvatar?.names && (
            <GroupAvatar
              size={80}
              images={displayAvatar.images}
              names={displayAvatar.names}
            />
          ))}
        {displayAvatar?.image ||
          (displayAvatar?.name && (
            <Avatar size={80} image={displayAvatar.image} name={displayAvatar.name} />
          ))}
        <Text style={tw`mt-4 text-3xl font-poppins-600`}>{groupName}</Text>
      </CenteredColumn>
      <Text style={tw`ml-4 mt-4 text-xl font-poppins-600`}>Members</Text>
      <CenteredRow style={tw`justify-evenly m-4`}>
        {members ? (
          members.map(member => {
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
          })
        ) : (
          <View style={tw`mr-4`}>
            <SkeletonCircle radius={48} />
          </View>
        )}
        <TouchableOpacity onPress={openAddMemberModal} style={tw`-mt-0.5`}>
          <AddCircle size="54" color={tw.color("gray-300")} />
          <Text style={tw`text-center text-xs font-poppins-400`}>
            {`Send \n invite`}
          </Text>
        </TouchableOpacity>
      </CenteredRow>
      <CenteredColumn style={tw`items-start justify-start ml-4`}>
        <Text style={tw`my-4 text-xl font-poppins-600`}>Pending invites</Text>
        {invitees ? (
          invitees
            .filter(member => member.invited)
            .map(member => {
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
            })
        ) : (
          <View style={tw`mr-4`}>
            <SkeletonCircle radius={48} />
          </View>
        )}
      </CenteredColumn>
      <AddGroupMemberModal modalRef={addMembersModalRef} groupName={groupName} />
    </>
  )
}
