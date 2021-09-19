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
        "mb-2 mx-5 rounded-lg cursor-pointer flex justify-between max-w-[158px] items-center pl-2",
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
          height={48}
          width={48}
          className="pl-2 rounded-full"
        />
      ) : (
        <AvatarGroup memberNames={members} />
      )}
      <div className="flex flex-col items-center w-full m-2 overflow-ellipsis">
        <div className="flex items-center justify-between h-4 m-0 mb-1">
          <span className="m-0  text-base font-medium text-black font-secondary  overflow-ellipsis whitespace-nowrap">
            {channel.data.name || getChannelName(members, channelName)}
          </span>
          <span className="pl-1 m-0 overflow-hidden text-tiny font-secondary text-trueGray-600 whitespace-nowrap">
            {getTimeStamp(channel)}
          </span>
        </div>
        <span className="h-4 m-0 text-center text-tiny text-trueGray-600 font-secondary overflow-ellipsis">
          {latestMessage || "Send a message"}
        </span>
      </div>
    </div>
  )
}

export default MessagingChannelPreview
