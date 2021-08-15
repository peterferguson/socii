import { useAuth } from "@hooks"
import { toggleChannelListMachine } from "@lib/machines/toggleChannelListMachine"
import { useMachine } from "@xstate/react"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { useChannelActionContext, useChannelStateContext } from "stream-chat-react"
import {
  MessagingChannelHeaderDynamic,
  MessagingInputDynamic,
  MessagingThreadDynamic,
} from "."

const MessageInput = dynamic(
  () => import("stream-chat-react").then((mod) => mod.MessageInput) as any,
  { ssr: false }
) as any
const MessageList = dynamic(
  () => import("stream-chat-react").then((mod) => mod.MessageList) as any,
  { ssr: false }
) as any

const Window = dynamic(() => import("stream-chat-react").then((mod) => mod.Window), {
  ssr: false,
}) as any

const ChannelInner = () => {
  const { username } = useAuth()
//   const { addNotification } = useChannelActionContext()
  const { channel, messages } = useChannelStateContext()

  const [filteredMessages, setFilteredMessages] = useState(messages)

  const [_state, send] = useMachine(toggleChannelListMachine)

  const toggleChannelList = () => send("TOGGLE")

  // - notifies the channel if a message has been updated
//   useEffect(() => {
//     const clickToAddNotification = () => {
//       addNotification("A message has been edited!", "success")
//     }

//     channel.on("message.updated", clickToAddNotification)

//     return () => {
//       channel.off("message.updated", clickToAddNotification)
//     }
//   }, [addNotification, channel])

  useEffect(() => {
    setFilteredMessages(
      // ! Remove ephermal messages
      messages.filter(
        (msg) =>
          !(
            (msg.attachments.some(({ type }) => type === "buy") &&
              msg.user.id !== username) ||
            msg?.status === "submitted"
          )
      )
    )
  }, [messages, username])

  return (
    <>
      <Window>
        <MessagingChannelHeaderDynamic toggleChannelList={toggleChannelList} />
        <MessageList
          messageActions={["edit", "delete", "flag", "mute", "react", "reply"]}
          messageLimit={5}
          messages={filteredMessages}
        />
        <MessageInput Input={MessagingInputDynamic} />
      </Window>
      <MessagingThreadDynamic />
    </>
  )
}

export default React.memo(ChannelInner)
