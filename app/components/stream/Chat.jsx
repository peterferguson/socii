import "stream-chat-react/dist/css/index.css"
import "@styles/Chat.module.css"
import {
  CreateChannel,
  CustomAttachment,
  CustomTriggerProvider,
  MessagingChannelHeader,
  MessagingChannelList,
  MessagingChannelPreview,
  MessagingInput,
  MessagingThread,
  TypingIndicator,
} from "@components/stream"

import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  useChatContext,
  Window,
} from "stream-chat-react"
import { useMediaQuery } from "react-responsive"
import React, { useState } from "react"

import { string, boolean } from "prop-types"

StreamChat.propTypes = {
  theme: string,
  groupName: string,
}

export default function StreamChat({ client, theme = "light", groupName = "" }) {
  const [isCreating, setIsCreating] = useState(false)
  const [hideChannelList, setHideChannelList] = useState(false)
  // const [showNotificationBanner, setShowNotificationBanner] = useState(false);

  const onClose = () => setIsCreating(false)
  const onCreateChannel = () => setIsCreating(!isCreating)
  const toggleHideChannelList = () => setHideChannelList(!hideChannelList)

  return (
    <Chat client={client} theme={`messaging ${theme}`}>
      {/* {showNotificationToast && (
        <div class="alert">
        <p>
        socii needs your permission to
        <button onClick={grantPermission}>
        enable desktop notifications to execute trades!
        </button>
        </p>
        </div>
      )} */}
      {!groupName && (
        <StreamChannelList
          hideChannelList={hideChannelList}
          onClose={onClose}
          onCreateChannel={onCreateChannel}
          groupName={groupName}
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
  )
}

StreamChannelList.propTypes = {
  hideChannelList: boolean,
  onCreateChannel: () => {},
  onClose: () => {},
  groupName: string,
}

function StreamChannelList({ hideChannelList, onCreateChannel, onClose, groupName }) {
  const { client } = useChatContext()
  const filter = { members: { $in: [client?.userID] } }
  const sort = [{ last_message_at: -1 }]
  const options = { state: true, presence: true, limit: 5 }
  const is1Cols = useMediaQuery({ minWidth: 800 })
  return (
    <div
      className={`absolute inset-y-16 md:inset-y-0 left-none md:left-0 -right-16 md:right-none transform md:relative transition 
        duration-300 ease-in-out 
        ${hideChannelList && is1Cols && "-translate-x-full flex h-0"}
        ${!hideChannelList && is1Cols && "translate-x-0 z-40"}
        ${hideChannelList && !is1Cols && "-translate-x-full hidden"}
        ${!hideChannelList && !is1Cols && "translate-x-0 z-40"}
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
          <MessagingChannelPreview {...props} closeIsCreating={onClose} />
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

// function grantPermission() {
//   if (Notification.permission === 'granted') {
//     new Notification('You are already subscribed to web notifications');
//     return;
//   }

//   if (
//     Notification.permission !== 'denied' ||
//     Notification.permission === 'default'
//   ) {
//     Notification.requestPermission().then(result => {
//       if (result === 'granted') {
//         new Notification('New message from Stream', {
//           body: 'Nice, notifications are now enabled!',
//         });
//       }
//     });
//   }

//   setShowNotificationBanner(false);
// }
