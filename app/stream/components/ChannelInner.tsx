import { useAuth } from "@hooks"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { useChannelActionContext, useChannelStateContext } from "stream-chat-react"
import { MessagingChannelHeaderDynamic, MessagingInputDynamic } from "."

const MessageInput = dynamic(
  () => import("stream-chat-react").then((mod) => mod.MessageInput) as any,
  { ssr: false }
) as any
const MessageList = dynamic(
  () => import("stream-chat-react").then((mod) => mod.MessageList) as any,
  { ssr: false }
) as any

const Thread = dynamic(
  () => import("stream-chat-react").then((mod) => mod.Thread as any),
  {
    ssr: false,
  }
) as any

const Window = dynamic(() => import("stream-chat-react").then((mod) => mod.Window), {
  ssr: false,
}) as any

const ChannelInner = ({ toggleChannelList }) => {
  const { user } = useAuth()
  const username = user ? user.username : ""
  const { addNotification } = useChannelActionContext()
  const { channel, messages } = useChannelStateContext()

  const [filteredMessages, setFilteredMessages] = useState(messages)

  // - notifies the channel if a message has been updated
  useEffect(() => {
    const clickToAddNotification = (event) => {
      const { message } = event
      const attachment = message?.attachments[0]
      if (attachment?.type === "receipt") {
        const orderStatus = attachment.orderExecutionStatus
        const tradeId = attachment.tradeId
        const side = tradeId.split("-")[1]
        const tickerSymbol = attachment.tickerSymbol
        if (orderStatus)
          addNotification(
            `${tickerSymbol} ${side} order ${
              orderStatus === "filled" ? "succeeded" : "failed"
            }`,
            orderStatus === "filled" ? "success" : "error"
          )
      }
    }

    channel.on("message.updated", clickToAddNotification)

    return () => {
      channel.off("message.updated", clickToAddNotification)
    }
  }, [addNotification, channel])

  useEffect(() => {
    setFilteredMessages(
      // ! Remove ephermal messages
      messages.filter(
        (msg) =>
          !(
            msg?.onlyForMe ? ![user?.uid].includes(String(msg?.onlyForMe)) : false ||  
            (((msg.attachments.some(({ type }) => type === "buy" || type === "sell") &&
              msg.user.id !== username) ||
            ["complete", "cancelled"].includes(msg?.status))) ||
            (msg.command_info?.name && !msg.attachments.length)
          )
      )
    )
  }, [messages, user?.uid, username])

  // TODO scroll input into view: using utils/scrollToRef (source: https://www.codegrepper.com/code-examples/javascript/react+scroll+to+focused+input)

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
      <Thread Input={MessagingInputDynamic} />
    </>
  )
}

export default ChannelInner
