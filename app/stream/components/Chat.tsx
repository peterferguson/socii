import { toggleChannelListMachine } from "@lib/machines/toggleChannelListMachine"
import { useMachine } from "@xstate/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {
  CreateChatModalDynamic,
  CustomTriggerProviderDynamic,
  MessagingChannelListDynamic,
  MessagingChannelPreviewDynamic,
} from "."
import ChannelInner from "./ChannelInner"
import { CustomAttachmentDynamic } from "./CustomAttachments"

const Channel = dynamic(() => import("stream-chat-react").then((mod) => mod.Channel), {
  ssr: false,
}) as any
const ChannelList = dynamic(
  () => import("stream-chat-react").then((mod) => mod.ChannelList) as any,
  { ssr: false }
) as any
const Chat = dynamic(() => import("stream-chat-react").then((mod) => mod.Chat), {
  ssr: false,
}) as any

const StreamChat = ({ client }) => {
  const router = useRouter()
  let { groupName } = router.query

  groupName = Array.isArray(groupName) ? groupName[0] : groupName

  const [isCreating, setIsCreating] = useState(false)
  const [state, send] = useMachine(toggleChannelListMachine)

  const toggleChannelList = () => send("TOGGLE")

  // - Do not show channel list on group page
  useEffect(() => {
    if (groupName && state.value === "open") send("TOGGLE")
  }, [groupName, send, state.value])

  const onCreateChannel = () => setIsCreating(!isCreating)

  // TODO: Replace light with theme when dark theme is implemented
  return client ? (
    <Chat client={client} theme={`messaging light`}>
      <div className="flex flex-col sm:flex-row">
        <Channel
          channel={
            groupName && client.channel("messaging", groupName?.replace(/\s/g, "-"))
          }
          maxNumberOfFiles={3}
          multipleUploads={true}
          Attachment={CustomAttachmentDynamic}
          TriggerProvider={CustomTriggerProviderDynamic}
        >
          <ChannelInner toggleChannelList={toggleChannelList} />
        </Channel>
        <StreamChannelList
          userID={client?.userID}
          groupName={groupName}
          state={state}
          toggleChannelList={toggleChannelList}
          onCreateChannel={onCreateChannel}
        />
      </div>
      {isCreating && (
        <CreateChatModalDynamic isCreating={isCreating} setIsCreating={setIsCreating} />
      )}
    </Chat>
  ) : null
}

export function StreamChannelList({
  userID,
  onCreateChannel,
  groupName,
  state,
  toggleChannelList,
}) {
  const filter = { type: "messaging", members: { $in: [userID] } }
  const options = { state: true, watch: true, presence: true, limit: 5 }
  const sort = { last_message_at: -1, updated_at: -1, cid: 1 }

  return (
    <div
      className={`
        ${
          "absolute inset-y-0 left-0  mx-4 transform md:relative transition duration-300 ease-in-out z-50" &&
          state.value === "closed"
            ? "-translate-x-full hidden"
            : "translate-x-0"
        }
        `}
    >
      <ChannelList
        filters={filter}
        sort={sort}
        options={options}
        showChannelSearch={true}
        customActiveChannel={groupName?.replace(/\s/g, "-") || ""}
        List={(props) => (
          <MessagingChannelListDynamic {...props} onCreateChannel={onCreateChannel} />
        )}
        Preview={(props) => (
          <MessagingChannelPreviewDynamic
            {...props}
            toggleChannelList={toggleChannelList}
          />
        )}
      />
    </div>
  )
}

export default React.memo(StreamChat)
