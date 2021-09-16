import { toggleChannelListMachine } from "@lib/machines/toggleChannelListMachine"
import { useMachine } from "@xstate/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { CreateChatModalDynamic, CustomTriggerProviderDynamic } from "."
import ChannelInner from "./ChannelInner"
import ChannelList from "./ChannelList/ChannelList"
import { CustomAttachmentDynamic } from "./CustomAttachments"
import { Transition } from "@headlessui/react"
import { useDarkMode } from "@hooks/useDarkMode"

const Channel = dynamic(() => import("stream-chat-react").then((mod) => mod.Channel), {
  ssr: false,
}) as any

const Chat = dynamic(() => import("stream-chat-react").then((mod) => mod.Chat), {
  ssr: false,
}) as any

const StreamChat = ({ client }) => {
  const router = useRouter()
  const [theme, ] = useDarkMode()
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
    <Chat client={client} theme={`messaging ${theme}`}>
      <div className="flex flex-col sm:flex-row overscroll-contain">
        <Channel
          channel={groupName && client.channel("group", groupName?.replace(/\s/g, "-"))}
          maxNumberOfFiles={3}
          multipleUploads={true}
          Attachment={CustomAttachmentDynamic}
          TriggerProvider={CustomTriggerProviderDynamic}
        >
          <ChannelInner toggleChannelList={toggleChannelList} />
        </Channel>

        <Transition
          show={["open", "idle"].includes(String(state.value))}
          appear={true}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ChannelList
            userID={client?.userID}
            groupName={groupName}
            send={send}
            toggleChannelList={toggleChannelList}
            onCreateChannel={onCreateChannel}
          />
        </Transition>
      </div>
      {isCreating && (
        <CreateChatModalDynamic isCreating={isCreating} setIsCreating={setIsCreating} />
      )}
    </Chat>
  ) : null
}

export default React.memo(StreamChat)
