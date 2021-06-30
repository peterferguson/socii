import {
  CreateChatModal,
  CustomTriggerProvider,
  MessagingChannelHeader,
  MessagingChannelList,
  MessagingChannelPreview,
  MessagingInput,
} from "@components/stream"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useState, useContext } from "react"
import { useMediaQuery } from "react-responsive"
import {
  Channel,
  ChatContext,
  ChannelList,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react"

const MessagingThread = dynamic(() => import("@components/stream/MessagingThread"), {
  loading: () => <p>...</p>,
  ssr: false,
})
const CustomAttachment = dynamic(() => import("@components/stream/CustomAttachment"), {
  loading: () => <p>...</p>,
  ssr: false,
})
const TypingIndicator = dynamic(() => import("@components/stream/TypingIndicator"), {
  loading: () => <p>...</p>,
  ssr: false,
})

export default function StreamChat({
  client,
  setShowActiveChannel,
  isSidebar = false,
}) {
  let is1Col = !useMediaQuery({ minWidth: 640 })
  is1Col = isSidebar ? true : is1Col

  const router = useRouter()
  const { groupName } = router.query

  const [isCreating, setIsCreating] = useState(false)
  const [hideChannelList, setHideChannelList] = useState(!isSidebar)

  const onCreateChannel = () => setIsCreating(!isCreating)
  const toggleHideChannelList = () => setHideChannelList(!hideChannelList)

  const onlyShowChat = !is1Col || hideChannelList || (hideChannelList && !is1Col)

  // - Truth table
  // is1Col | hideChannelList | ¬is1Col ∨ hideChannelList ∨ (¬is1Col ∧ hideChannelList)
  //    T   |       T         |                       T
  //    T   |       F         |                       F
  //    F   |       T         |                       T
  //    F   |       F         |                       T

  const streamProps = {
    client,
    groupName,
    hideChannelList,
    toggleHideChannelList,
    isSidebar,
  }

  return (
    <>
      <StreamChannelList
        {...streamProps}
        onCreateChannel={onCreateChannel}
        setShowActiveChannel={setShowActiveChannel}
        is1Col={is1Col}
      />
      {onlyShowChat && <StreamChannel {...streamProps} />}
      {isCreating && (
        <CreateChatModal isCreating={isCreating} setIsCreating={setIsCreating} />
      )}
    </>
  )
}

export function StreamChannel({ groupName, isSidebar, toggleHideChannelList }) {
  const { client } = useContext(ChatContext)
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
        maxNumberOfFiles={10}
        multipleUploads={true}
        Attachment={CustomAttachment}
        TriggerProvider={CustomTriggerProvider}
      >
        <Window hideOnThread={true}>
          <MessagingChannelHeader
            toggleHideChannelList={!groupName ? toggleHideChannelList : null}
          />
          <MessageList
            messageActions={["edit", "delete", "flag", "mute", "react", "reply"]}
            TypingIndicator={TypingIndicator}
            // messageLimit={5} // TODO: Implement messageLimit to save on api calls
          />
          <MessageInput Input={MessagingInput} />
        </Window>
        <MessagingThread />
      </Channel>
    </div>
  )
}

export function StreamChannelList({
  hideChannelList,
  onCreateChannel,
  groupName,
  setShowActiveChannel,
  toggleHideChannelList,
  is1Col,
  isSidebar,
}) {
  const { client } = useContext(ChatContext)
  const filter = { members: { $in: [client?.userID] } }
  const sort = [{ last_message_at: -1 }]
  const options = { state: true, presence: true, limit: 5 }
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
        filter={filter}
        sort={sort}
        options={options}
        showChannelSearch={true}
        customActiveChannel={groupName?.split(" ").join("-") || ""}
        List={(props) => (
          <MessagingChannelList {...props} onCreateChannel={onCreateChannel} />
        )}
        Preview={(props) => (
          <MessagingChannelPreview
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

/*
? Convert this functionality to use the headlessui Transition component for clarity?
1 Large screen functionality:
* Channel list shown immediately but togglible. On toggle close with animation 
* & resize message list container
2 Small screen functionality:
* Channel list hidden immediately but togglible. On toggle close with animation 
* & don't resize message list container but allow clicking to toggle
* -
? Large screen & toggled off
- Hide & resize (add hidden & translate out)
? Large screen & toggled on
- reshow (remove hidden & translate in)
? Small screen & toggled off
- Hide (add translate out & z-40)
? Small screen & toggled on
- Show over the top of the chat (translate in & z-40)
*
*/
