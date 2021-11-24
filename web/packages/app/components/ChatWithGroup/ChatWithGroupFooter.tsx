import React, { useEffect } from "react"
import { Text, View } from "react-native"
import { useStream } from "app/hooks"
import tw from "app/lib/tailwind"
import { useRouter } from "app/navigation/use-router"
import GroupMemberProfilePhotos from "../GroupMemberProfilePhotos"
import { CardButton } from "../CardButton"

const ChatWithGroupFooter = ({ groupName }: { groupName: string }) => {
  const router = useRouter()
  const { client: chatClient, setChannel } = useStream()
  useEffect(
    () => chatClient?.user && setChannel(chatClient.channel("group", groupName)),
    [setChannel, groupName, chatClient?.user]
  )

  return (
    <CardButton
      onPress={() => router.push(`/channel/${groupName}`)}
      buttonType="BOTTOM"
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
    </CardButton>
  )
}

export default ChatWithGroupFooter
