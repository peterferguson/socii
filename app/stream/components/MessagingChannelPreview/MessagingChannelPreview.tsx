import AvatarGroup from "@stream/components/AvatarGroup"
import { getTimeStamp } from "@utils/getTimeStamp"
import { tw } from "@utils/tw"
import Image from "next/image"
import React, { useContext } from "react"
import useMediaQuery from "react-responsive"
import { Channel } from "stream-chat"
import { ChatContext } from "stream-chat-react"

const getChannelName = (members: string | any[], defaultName: string) =>
  !members.length || members.length === 1
    ? members?.[0] || defaultName
    : `${members?.[0] || defaultName}, ${members[1] || defaultName}`

interface IMessagingChannelPreview {
  channel: Channel
  latestMessage?: string | JSX.Element
  setActiveChannel?: (channel: Channel) => void
  toggleChannelList: () => void
}

const MessagingChannelPreview = ({
  channel,
  latestMessage,
  setActiveChannel,
  toggleChannelList,
}: IMessagingChannelPreview) => {
  const { channel: activeChannel, client } = useContext(ChatContext)
  const channelName = channel.cid.split(":").pop().replace(/-/g, " ")
  const is1Col = !useMediaQuery({ minWidth: 640 })

  const members =
    channel?.data?.name?.includes("Chat") || !channelName.includes("members")
      ? // - show all memebers except yourself
        [channelName]
      : // - edge case: use first initial for chat picture for group chats
        Object.values(channel.state.members)
          .filter(({ user }) => user.id !== client.userID)
          .map((member) => member.user.name)

  return (
    <div
      className={tw(
        "grid grid-cols-5 bg-white p-4 shadow",
        "mb-2 mx-5 rounded-lg cursor-pointer max-w-[158px] h-20 pl-2",
        channel?.id === activeChannel?.id
          ? " bg-gradient-to-r from-brand/30 via-brand-cyan/30 to-brand-cyan-green/30 hover:shadow-xl hover:btn-transition"
          : "hover:bg-gray-50 hover:shadow-xl hover:btn-transition",
        "umami--click--chat-channel-preview-channel-option"
      )}
      onClick={() => {
        setActiveChannel(channel)
        is1Col && toggleChannelList()
      }}
    >
      {channel.data.image ? (
        <Image
          src={channel.data.image}
          layout="responsive"
          height={40}
          width={40}
          className="rounded-full"
        />
      ) : (
        <AvatarGroup memberNames={members} size={40} />
      )}
      <div className="flex flex-col items-center w-full overflow-ellipsis col-span-4">
        <div className="flex items-center justify-between w-full h-4 mb-2">
          <div className="text-base font-semibold text-black font-secondary overflow-ellipsis whitespace-nowrap">
            {channel.data.name || getChannelName(members, channelName)}
          </div>
          <div className="pl-1 overflow-hidden text-gray-600 text-tiny font-secondary whitespace-nowrap">
            {getTimeStamp(channel)}
          </div>
        </div>
        <span className="w-full text-gray-400 text-tiniest font-secondary overflow-ellipsis">
          {latestMessage || "Send a message"}
        </span>
      </div>
    </div>
  )
}

export default MessagingChannelPreview
