import { useStreamClient } from "@hooks/useStreamClient"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { ChannelFilters, ChannelOptions, ChannelSort } from "stream-chat"
import {
  CreateChatModalDynamic,
  CustomTriggerProviderDynamic,
  MessagingChannelHeaderDynamic,
  MessagingChannelListDynamic,
  MessagingChannelPreviewDynamic,
  MessagingInputDynamic,
  MessagingThreadDynamic,
} from "."
import { CustomAttachmentDynamic } from "./CustomAttachments"

const Channel = dynamic(() => import("stream-chat-react").then((mod) => mod.Channel), {
  ssr: false,
}) as any
const ChannelList = dynamic(
  () => import("stream-chat-react").then((mod) => mod.ChannelList) as any,
  { ssr: false }
) as any
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

const Chat = dynamic(() => import("stream-chat-react").then((mod) => mod.Chat), {
  ssr: false,
}) as any

// interface IStreamChat {
//   client: Client
//   setShowActiveChannel?: () => void
//   isSidebar?: boolean
// }

function StreamChat({
  setShowActiveChannel,
  isSidebar = false,
  // }: IStreamChat) {
}) {
  const { client } = useStreamClient()
  let is1Col = !useMediaQuery({ minWidth: 640 })
  is1Col = isSidebar ? true : is1Col

  const router = useRouter()
  const { groupName } = router.query

  const [isCreating, setIsCreating] = useState(false)
  const [hideChannelList, setHideChannelList] = useState(!isSidebar)

  const onCreateChannel = () => setIsCreating(!isCreating)
  const toggleHideChannelList = () => setHideChannelList(!hideChannelList)

  const onlyShowChat = !is1Col || hideChannelList || (hideChannelList && !is1Col)

  // TODO: Convert to XState Machine
  // - Truth table
  // ! is1Col | hideChannelList | ¬is1Col ∨ hideChannelList ∨ (¬is1Col ∧ hideChannelList)
  // !    T   |       T         |                       T
  // !    T   |       F         |                       F
  // !    F   |       T         |                       T
  // !    F   |       F         |                       T

  const streamProps = {
    client,
    groupName,
    hideChannelList,
    toggleHideChannelList,
    isSidebar,
  }

  // TODO: Replace light with theme when dark theme is implemented
  return (
    client && (
      <Chat client={client} theme={`messaging light`}>
        <StreamChannelList
          {...streamProps}
          onCreateChannel={onCreateChannel}
          setShowActiveChannel={setShowActiveChannel}
          is1Col={is1Col}
        />
        {onlyShowChat && <StreamChannel {...streamProps} />}
        {isCreating && (
          <CreateChatModalDynamic
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        )}
      </Chat>
    )
  )
}

export function StreamChannel({ client, groupName, isSidebar, toggleHideChannelList }) {
  const router = useRouter()
  const isChatOrGroupRoute =
    router.pathname.includes("/chat") || router.pathname.includes("/groups")
  // ! Streams ChannelList requires that the Channel is a child so we hidden
  return (
    <div
      className={`w-full ${isChatOrGroupRoute ? "" : "sm:w-1/2 xl:w-1/3"} ${
        isSidebar ? "hidden" : ""
      }`}
    >
      <Channel
        channel={
          groupName
            ? client.channel("messaging", groupName?.split(" ").join("-"))
            : null
        }
        maxNumberOfFiles={3}
        multipleUploads={true}
        Attachment={CustomAttachmentDynamic}
        TriggerProvider={CustomTriggerProviderDynamic}
      >
        <Window hideOnThread={true}>
          <MessagingChannelHeaderDynamic
            toggleHideChannelList={!groupName ? toggleHideChannelList : null}
          />
          <MessageList
            messageActions={["edit", "delete", "flag", "mute", "react", "reply"]}
            messageLimit={5}
          />
          <MessageInput Input={MessagingInputDynamic} />
        </Window>
        <MessagingThreadDynamic />
      </Channel>
    </div>
  )
}

export function StreamChannelList({
  client,
  hideChannelList,
  onCreateChannel,
  groupName,
  setShowActiveChannel,
  toggleHideChannelList,
  is1Col,
  isSidebar,
}) {
  const filter: ChannelFilters = {
    type: "messaging",
    members: { $in: [client?.userID] },
  }
  const options: ChannelOptions = {
    state: true,
    watch: true,
    presence: true,
    limit: 5,
  }
  const sort: ChannelSort = { last_message_at: -1, updated_at: -1, cid: 1 }

  return (
    <div
      className={`
        ${
          !is1Col
            ? "absolute inset-y-0 left-0 transform md:relative transition duration-300 ease-in-out" &&
              hideChannelList
              ? "-translate-x-full hidden"
              : "translate-x-0 z-40"
            : hideChannelList
            ? "hidden"
            : `${isSidebar ? "" : "absolute inset-0 z-40 -translate-x-full"}`
        }
        `}
    >
      <ChannelList
        filters={filter}
        sort={sort}
        options={options}
        showChannelSearch={true}
        customActiveChannel={groupName?.split(" ").join("-") || ""}
        List={(props) => (
          <MessagingChannelListDynamic {...props} onCreateChannel={onCreateChannel} />
        )}
        Preview={(props) => (
          <MessagingChannelPreviewDynamic
            {...props}
            setShowActiveChannel={setShowActiveChannel}
            toggleHideChannelList={toggleHideChannelList}
            isSidebar={isSidebar}
          />
        )}
      />
    </div>
  )
}

export default React.memo(StreamChat)
