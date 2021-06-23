/* eslint-disable react/display-name */
import AuthCheck from "@components/AuthCheck"
import {
  CreateChannel,
  CustomTriggerProvider,
  MessagingChannelHeader,
  MessagingChannelList,
  MessagingChannelPreview,
  MessagingInput,
} from "@components/stream"
import dynamic from "next/dynamic"
import { boolean, string } from "prop-types"
import React, { useState } from "react"
import { useMediaQuery } from "react-responsive"
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  useChatContext,
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

StreamChat.propTypes = {
  theme: string,
  groupName: string,
}

export default function StreamChat({ client, theme = "light", groupName = "" }) {
  const is1Col = !useMediaQuery({ minWidth: 800 })
  const [isCreating, setIsCreating] = useState(false)
  const [hideChannelList, setHideChannelList] = useState(false)

  const onClose = () => setIsCreating(false)
  const onCreateChannel = () => setIsCreating(!isCreating)
  const toggleHideChannelList = () => setHideChannelList(!hideChannelList)


  return (
    <AuthCheck>
      <Chat client={client} theme={`messaging ${theme}`}>
        {!groupName && (
          <StreamChannelList
            hideChannelList={hideChannelList}
            onClose={onClose}
            onCreateChannel={onCreateChannel}
            groupName={groupName}
            is1Col={is1Col}
          />
        )}
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
          <Window
            hideOnThread={true}
            onClick={hideChannelList ? toggleHideChannelList : null}
          >
            {isCreating && (
              <CreateChannel
                toggleHideChannelList={toggleHideChannelList}
                onClose={onClose}
              />
            )}
            <MessagingChannelHeader
              toggleHideChannelList={!groupName ? toggleHideChannelList : null}
            />
            <MessageList
              onClick={hideChannelList ? toggleHideChannelList : null}
              messageActions={["edit", "delete", "flag", "mute", "react", "reply"]}
              TypingIndicator={TypingIndicator}
              // messageLimit={5} // TODO: Implement messageLimit to save on api calls
            />
            <MessageInput autoFocus Input={MessagingInput} />
          </Window>
          <MessagingThread />
        </Channel>
      </Chat>
    </AuthCheck>
  )
}

StreamChannelList.propTypes = {
  hideChannelList: boolean,
  onCreateChannel: () => {},
  onClose: () => {},
  groupName: string,
  is1Col: boolean,
}

function StreamChannelList({
  hideChannelList,
  onCreateChannel,
  onClose,
  groupName,
  is1Col,
}) {
  const { client } = useChatContext()
  const filter = { members: { $in: [client?.userID] } }
  const sort = [{ last_message_at: -1 }]
  const options = { state: true, presence: true, limit: 5 }
  return (
    <div
      className={`absolute inset-y-0 left-0 transform md:relative transition duration-300 ease-in-out
        ${
          !is1Col
            ? hideChannelList
              ? "-translate-x-full hidden"
              : "translate-x-0 z-40"
            : hideChannelList
            ? "hidden"
            : "absolute inset-y-0 left-96 z-40"
        }
        `}
    >
      <ChannelList
        filter={filter}
        sort={sort}
        options={options}
        showChannelSearch={true}
        customActiveChannel={groupName?.split(" ").join("-") || ""}
        // channelRenderFilterFn={channelFilter}
        List={(props) => (
          <MessagingChannelList {...props} onCreateChannel={onCreateChannel} />
        )}
        Preview={(props) => (
          <MessagingChannelPreview
            {...props}
            closeIsCreating={onClose}
            hideChannelList={hideChannelList}
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
*
*
*/
