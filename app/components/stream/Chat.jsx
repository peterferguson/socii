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

import React, { useState, useEffect, useContext } from "react"

import { isBrowser } from "@utils/helper"

export default function StreamChat({ client, theme = "light", groupName = null }) {
  const [isCreating, setIsCreating] = useState(false)
  const [mobile, setMobile] = useState(false)
  const { setActiveChannel } = useChatContext()
  // const [showNotificationBanner, setShowNotificationBanner] = useState(false);

  const onClose = () => setIsCreating(false)
  const onCreateChannel = () => setIsCreating(!isCreating)
  const toggleMobile = () => setMobile(!mobile)

  useEffect(() => {
    const listChannels = async () => {
      console.log(client)
      const filter = { type: "messaging", members: { $in: [client?.userID] } }
      const sort = [{ last_message_at: -1 }]

      const channels = await client?.queryChannels(filter, sort, {
        watch: true, // this is the default
        state: true,
      })

      if (groupName) {
        console.log(groupName)
        console.log(channels)
        const groupChannel = channels?.filter(
          ({ id }) => id === groupName?.split(" ").join("-")
        )
        console.log(groupChannel)
      }

      if (setActiveChannel) setActiveChannel(channels[0])
    }
    listChannels()
  }, [client, client?.userID, setActiveChannel, groupName])

  // // TODO: REFACTOR to a reducer
  // useEffect(() => {
  //   const initChat = async () => {
  //     const groupChatName = groupName?.split(" ").join("-")

  //     if (mounted && groupChatName) {
  //       console.log(groupChatName)
  //       setActiveChannel(
  //         await client.channel("messaging", groupChatName, {
  //           image: getRandomImage(getInitials(groupName)),
  //           name: `${groupName} Group Chat`,
  //         })
  //       )
  //     }
  //   }
  //   initChat()
  // }, []) // eslint-disable-line react-hooks/exhaustive-dep

  return (
    <>
      {isBrowser && client && (
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
            client={client}
            mobile={mobile}
            onClose={onClose}
            onCreateChannel={onCreateChannel}
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
      )}
    </>
  )
}

const StreamChannelList = ({ client, mobile, onCreateChannel, onClose }) => (
  <div
    className={`absolute inset-y-0 right-0 transform ${
      mobile ? "-translate-x-full w-0" : "md:translate-x-0"
    }  md:relative  transition duration-500 ease-in-out`}
  >
    <ChannelList
      filters={{ type: "messaging", members: { $in: [client.userID] } }}
      sort={{ last_message_at: -1 }}
      options={{ state: true, presence: true, limit: 10 }}
      List={(props) => (
        <MessagingChannelList {...props} onCreateChannel={onCreateChannel} />
      )}
      Preview={(props) => (
        <MessagingChannelPreview {...props} closeIsCreating={onClose} />
      )}
    />
  </div>
)

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
