import dynamic from "next/dynamic"
import React, { useState } from "react"
import { CreateChatModalDynamic, CustomTriggerProviderDynamic } from "."
import ChannelInner from "./ChannelInner"
import ChannelList from "./ChannelList/ChannelList"
import { CustomAttachmentDynamic } from "./CustomAttachments"
import MessagingThreadHeader from "./MessagingThreadHeader/MessagingThreadHeader"

const Channel = dynamic(() => import("stream-chat-react").then((mod) => mod.Channel), {
  ssr: false,
}) as any

// ! This is really the component for the chat page
// TODO: ... create a components/pages folder
const StreamChat = ({ client }) => {
  const [showChannelList, setShowChannelList] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const onCreateChannel = () => setIsCreating(!isCreating)
  const toggleChannelList = () => setShowChannelList(!showChannelList)

  // TODO: Replace light with theme when dark theme is implemented
  if (!client) return null

  return (
    <div className="flex flex-col w-full overflow-hidden sm:w-auto sm:flex-row">
      <Channel
        maxNumberOfFiles={3}
        multipleUploads={true}
        Attachment={CustomAttachmentDynamic}
        ThreadHeader={MessagingThreadHeader}
        TriggerProvider={CustomTriggerProviderDynamic}
      >
        <ChannelInner toggleChannelList={toggleChannelList} />
      </Channel>
      <ChannelList
        toggleChannelList={toggleChannelList}
        showChannelList={showChannelList}
        userID={client?.userID}
        onCreateChannel={onCreateChannel}
      />
      {isCreating && (
        <CreateChatModalDynamic isCreating={isCreating} setIsCreating={setIsCreating} />
      )}
    </div>
  )
}

export default React.memo(StreamChat)
