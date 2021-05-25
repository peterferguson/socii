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

import React, { useState } from "react"

export default function StreamChat({ client, theme = "light", groupName = null }) {
  const [isCreating, setIsCreating] = useState(false)
  const [mobile, setMobile] = useState(false)
  // const [showNotificationBanner, setShowNotificationBanner] = useState(false);

  const onClose = () => setIsCreating(false)
  const onCreateChannel = () => setIsCreating(!isCreating)
  const toggleMobile = () => setMobile(!mobile)

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
        mobile={mobile}
        onClose={onClose}
        onCreateChannel={onCreateChannel}
        groupName={groupName}
      />
      <Channel
        maxNumberOfFiles={10}
        multipleUploads={true}
        Attachment={CustomAttachment}
      >
        <Window>
          {isCreating && (
            <CreateChannel toggleMobile={toggleMobile} onClose={onClose} />
          )}
          <MessagingChannelHeader theme={theme} toggleMobile={toggleMobile} />
          <MessageList
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

const StreamChannelList = ({ mobile, onCreateChannel, onClose, groupName }) => {
  const { client } = useChatContext()
  const filter = { type: "messaging", members: { $in: [client?.userID] } }
  const sort = [{ last_message_at: -1 }]

  return (
    <div
      className={`absolute inset-y-0 right-0 transform ${
        mobile ? "-translate-x-full w-0" : "md:translate-x-0"
      }  md:relative  transition duration-1000 ease-in-out`}
    >
      <ChannelList
        filter={filter}
        sort={sort}
        options={{ state: true, presence: true, limit: 10 }}
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
