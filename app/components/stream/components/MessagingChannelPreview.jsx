import styles from "@styles/MessagingChannelPreview.module.css"
import AvatarGroup from "@components/stream/components/AvatarGroup"
import { getTimeStamp } from "@utils/helper";


import React, { useContext } from "react"
import { ChatContext } from "stream-chat-react"

const getChannelName = (members) => {
  const defaultName = "Invest Social"

  if (!members.length || members.length === 1) {
    return members[0]?.user.name || defaultName
  }

  return `${members[0]?.user.name || defaultName}, ${
    members[1]?.user.name || defaultName
  }`
}

const MessagingChannelPreview = (props) => {
  const { channel, latestMessage, setActiveChannel, closeIsCreating } = props

  const { channel: activeChannel, client } = useContext(ChatContext)

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user.id !== client.userID
  )

  return (
    <div
      className={`h-16 mb-2 mx-5 rounded-lg cursor-pointer flex justify-between items-center pl-2
        ${
          channel?.id === activeChannel?.id
            ? "bg-white hover:shadow-xl hover:btn-transition"
            : "hover:bg-white hover:shadow-xl hover:btn-transition"
        }
      `}
      onClick={() => {
        closeIsCreating()
        setActiveChannel(channel)
      }}
    >
      {AvatarGroup(members, styles)}
      <div className="flex flex-col items-center w-full mx-2">
        <div className="flex items-center justify-between h-4 m-0 mb-1">
          <p className="m-0 overflow-hidden text-base font-medium text-black font-work-sans max-w-[158px] overflow-ellipsis whitespace-nowrap">
            {channel.data.name || getChannelName(members)}
          </p>
          <p className="pl-1 m-0 text-tiny font-work-sans text-trueGray-600">
            {getTimeStamp(channel)}
          </p>
        </div>
        <p className="h-4 m-0 overflow-hidden text-xs text-trueGray-600 font-work-sans overflow-ellipsis whitespace-nowrap max-w-[200px]">
          {latestMessage || "Send a message"}
        </p>
      </div>
    </div>
  )
}

export default MessagingChannelPreview
