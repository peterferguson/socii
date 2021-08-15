import AvatarGroup from "@stream/components/AvatarGroup"
import styles from "@styles/MessagingChannelPreview.module.css"
import { getTimeStamp } from "@utils/getTimeStamp"
import React, { useContext } from "react"
import useMediaQuery from "react-responsive"
import { Channel } from "stream-chat"
import { ChatContext } from "stream-chat-react"

const getChannelName = (members: string | any[], defaultName: string) => {
  if (!members.length || members.length === 1)
    return members?.[0]?.user.name || defaultName

  return `${members?.[0]?.user.name || defaultName}, ${
    members[1]?.user.name || defaultName
  }`
}

interface IMessagingChannelPreview {
  channel: Channel
  latestMessage?: string | JSX.Element
  setActiveChannel?: (channel: Channel) => void
  setShowActiveChannel: (bool: boolean) => void
  toggleHideChannelList: () => void
  isSidebar: boolean
}

const MessagingChannelPreview = ({
  channel,
  latestMessage,
  setActiveChannel,
  setShowActiveChannel,
  toggleHideChannelList,
  isSidebar,
}: IMessagingChannelPreview) => {
  const { channel: activeChannel, client } = useContext(ChatContext)
  const channelName = channel.cid.split("-").join(" ")
  const is2Col = !useMediaQuery({ minWidth: 1024 })
  const channelNameAsMember = [{ user: { name: channelName } }]

  let members =
    Object.values(channel.state.members).length - 1 > 0
      ? Object.values(channel.state.members).filter(
          ({ user }) => user.id !== client.userID // - show all memebers except yourself
        )
      : channelNameAsMember

  // - edge case: use first initial for chat picture for group chats
  if (!channelName.includes("members")) members = [{ user: { name: channelName } }]

  return (
    <div
      className={`flex-grow h-16 mb-2 mx-5 rounded-lg cursor-pointer flex justify-between items-center pl-2
        ${
          channel?.id === activeChannel?.id
            ? " bg-gradient-to-r from-brand/30 via-brand-cyan/30 to-brand-cyan-green/30 hover:shadow-xl hover:btn-transition"
            : "hover:bg-blueGray-100 hover:shadow-xl hover:btn-transition"
        }
      `}
      onClick={() => {
        setActiveChannel(channel)
        if (isSidebar) setShowActiveChannel(true)
        if (is2Col && !isSidebar) toggleHideChannelList()
      }}
    >
      {AvatarGroup(members, styles)}
      <div className="flex flex-col items-center w-full mx-2">
        <div className="flex items-center justify-between h-4 m-0 mb-1">
          <span className="m-0 overflow-hidden text-base font-medium text-black font-secondary max-w-[158px] overflow-ellipsis whitespace-nowrap">
            {channel.data.name || getChannelName(members, channelName)}
          </span>
          <span className="pl-1 m-0 text-tiny font-secondary text-trueGray-600">
            {getTimeStamp(channel)}
          </span>
        </div>
        <span className="h-4 m-0 overflow-hidden text-xs text-trueGray-600 font-secondary overflow-ellipsis whitespace-nowrap max-w-[200px]">
          {latestMessage || "Send a message"}
        </span>
      </div>
    </div>
  )
}

export default MessagingChannelPreview
