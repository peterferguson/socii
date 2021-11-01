import React, { useEffect } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { useStream } from "../hooks"
import tw from "../lib/tailwind"
import { useRouter } from "../navigation/use-router"
import { GroupMemberProfilePhotos } from "./GroupMemberProfilePhotos"

export const ChatWithGroupFooter = ({ groupName }: { groupName: string }) => {
  const router = useRouter()
  const { client: chatClient, setChannel } = useStream()
  useEffect(
    () => chatClient?.user && setChannel(chatClient.channel("group", groupName)),
    [setChannel, groupName, chatClient?.user]
  )

  return (
    <TouchableOpacity
      onPress={() => router.push(`/channel/${groupName}`)}
      style={tw.style(`bg-brand-black flex-row items-center justify-between`, {
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
      })}
    >
      <Text
        style={tw`text-left p-3 font-poppins-300 text-xs text-brand-gray dark:text-brand-black`}
      >
        Chat with {groupName}
      </Text>
      <View style={tw`flex-row items-center justify-center p-1`}>
        <GroupMemberProfilePhotos
          groupName={groupName}
          photoStyles={tw`w-6 h-6 rounded-full mx-0.5 my-2 border border-white`}
        />
      </View>
    </TouchableOpacity>
  )
}

export const ChatWithGroupHeader = ({ groupName }: { groupName: string }) => {
  const router = useRouter()
  const { client: chatClient, setChannel } = useStream()
  useEffect(
    () => chatClient?.user && setChannel(chatClient.channel("group", groupName)),
    [setChannel, groupName, chatClient?.user]
  )

  return (
    <TouchableOpacity
      onPress={() => router.push(`/channel/${groupName}`)}
      style={tw.style(`bg-brand-black flex-row items-center justify-between`, {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
      })}
    >
      <Text
        style={tw`text-left p-3 font-poppins-300 text-xs text-brand-gray dark:text-brand-black`}
      >
        Chat with {groupName}
      </Text>
      <View style={tw`flex-row items-center justify-center p-1`}>
        <GroupMemberProfilePhotos
          groupName={groupName}
          photoStyles={tw`w-6 h-6 rounded-full mx-0.5 my-2 border border-white`}
        />
      </View>
    </TouchableOpacity>
  )
}

export const ChatWithGroupButton = ({ groupName }: { groupName: string }) => {
  const router = useRouter()
  const { client: chatClient, setChannel } = useStream()
  useEffect(
    () => chatClient?.user && setChannel(chatClient.channel("group", groupName)),
    [setChannel, groupName, chatClient?.user]
  )

  return (
    <TouchableOpacity
      onPress={() => router.push(`/channel/${groupName}`)}
      style={tw.style(`bg-brand-black flex-row items-center justify-between my-4 p-1`, {
        borderRadius: 16,
      })}
    >
      <Text
        style={tw`text-left p-3 font-poppins-300 text-xs text-brand-gray dark:text-brand-black`}
      >
        Chat with {groupName}
      </Text>
      <View style={tw`flex-row items-center justify-center p-1`}>
        <GroupMemberProfilePhotos
          groupName={groupName}
          photoStyles={tw`w-6 h-6 rounded-full mx-0.5 my-2 border border-white`}
        />
      </View>
    </TouchableOpacity>
  )
}
