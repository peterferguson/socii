import { toggleChannelListMachine } from "@lib/machines/toggleChannelListMachine"
import { useMachine } from "@xstate/react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { CreateChatModalDynamic, CustomTriggerProviderDynamic } from "."
import ChannelInner from "./ChannelInner"
import ChannelList from "./ChannelList"
import { CustomAttachmentDynamic } from "./CustomAttachments"
import { Transition } from "@headlessui/react"

const Channel = dynamic(() => import("stream-chat-react").then((mod) => mod.Channel), {
  ssr: false,
}) as any

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

        <Transition show={["open", "idle"].includes(String(state.value))} appear={true}>
          {/* Sliding sidebar */}
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/* ... */}
            <ChannelList
              userID={client?.userID}
              groupName={groupName}
              state={state}
              toggleChannelList={toggleChannelList}
              onCreateChannel={onCreateChannel}
            />
          </Transition.Child>
        </Transition>
      </div>
      {isCreating && (
        <CreateChatModalDynamic isCreating={isCreating} setIsCreating={setIsCreating} />
      )}
    </Chat>
  ) : null
}

export default React.memo(StreamChat)
