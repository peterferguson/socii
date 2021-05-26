import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  useChatContext,
  Window,
} from "stream-chat-react"

import {
  CreateChannel,
  CustomAttachment,
  CustomMessage,
  MessagingChannelHeader,
  MessagingChannelList,
  MessagingChannelPreview,
  MessagingInput,
  MessagingThread,
  TypingIndicator,
} from "@components/stream/components"

import { useMediaQuery } from "react-responsive"
import React, { useState } from "react"

export default function StreamChat({ client, theme = "light", groupName = null }) {
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
      <StreamChannelList
        hideChannelList={hideChannelList}
        onClose={onClose}
        onCreateChannel={onCreateChannel}
        groupName={groupName}
      />
      <Channel
        maxNumberOfFiles={10}
        multipleUploads={true}
        Attachment={CustomAttachment}
      >
        <Window onClick={hideChannelList ? toggleHideChannelList : null}>
          {isCreating && (
            <CreateChannel
              toggleHideChannelList={toggleHideChannelList}
              onClose={onClose}
            />
          )}
          <MessagingChannelHeader
            theme={theme}
            toggleHideChannelList={toggleHideChannelList}
          />
          <MessageList
            onClick={hideChannelList ? toggleHideChannelList : null}
            messageActions={["edit", "delete", "flag", "mute", "react", "reply"]}
            Message={CustomMessage}
            TypingIndicator={TypingIndicator}
          />
          <MessageInput focus Input={MessagingInput} />
        </Window>
        <MessagingThread />
      </Channel>
    </Chat>
  )
}

const StreamChannelList = ({
  hideChannelList,
  onCreateChannel,
  onClose,
  groupName,
}) => {
  const { client } = useChatContext()
  const filter = { members: { $in: [client?.userID] } }
  const sort = [{ last_message_at: -1 }]
  const options = { state: true, presence: true, limit: 5 }
  const is1Cols = useMediaQuery({ minWidth: 800 })
  return (
    <div
      className={
        `absolute inset-y-16 md:inset-y-0 left-none md:left-0 -right-16 md:right-none transform md:relative transition 
        duration-300 ease-in-out 
        ${hideChannelList && is1Cols &&  "-translate-x-full flex h-0"}
        ${!hideChannelList && is1Cols &&  "translate-x-0 z-40"}
        ${hideChannelList && !is1Cols &&  "-translate-x-full hidden"}
        ${!hideChannelList && !is1Cols &&  "translate-x-0 z-40"}
      } `} 
        //  : "hidden md:flex md:h-0"                                         // - toggled off 
        //   : "md:translate-x-0 z-40 md:z-0"               // - toggled on 
      >
      <ChannelList
        filter={filter}
        sort={sort}
        options={options}
        // channelRenderFilterFn={channelFilter}
        customActiveChannel={groupName?.split(" ").join("-") || ""}
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
