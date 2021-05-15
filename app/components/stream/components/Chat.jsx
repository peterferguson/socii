import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";

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
} from "@components/stream/components";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "@lib/context";
import { useHasMounted } from "@lib/hooks";
import { getInitials, getRandomImage, isBrowser } from "@utils/helper";

export default function StreamChat({ theme = "light" }) {
  const { username, streamClient } = useContext(UserContext);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      {isBrowser && username && streamClient && (
        <Chat client={streamClient} theme={`messaging ${theme}`}>
          <StreamChannelList
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
          <StreamChatWindow
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        </Chat>
      )}
    </>
  );
}

export function StreamChatWindow({
  toggleMobile = () => {},
  theme = "light",
  isCreating = false,
  setIsCreating = () => {},
  groupName = null,
}) {
  const onClose = () => setIsCreating(false);
  const { username, streamClient } = useContext(UserContext);

  // TODO: Fix the group chat on group page

  const [channel, setChannel] = useState(undefined);
  const mounted = useHasMounted();

  const groupChatName = groupName?.split(" ").join("-");

  function ChannelChildren() {
    return (
      <>
        {isCreating && (
          <CreateChannel toggleMobile={toggleMobile} onClose={onClose} />
        )}
        <Window>
          <MessagingChannelHeader theme={theme} toggleMobile={toggleMobile} />
          <MessageList
            messageActions={[
              "edit",
              "delete",
              "flag",
              "mute",
              "react",
              "reply",
            ]}
            Message={CustomMessage}
            TypingIndicator={TypingIndicator}
          />
          <MessageInput focus Input={MessagingInput} />
        </Window>
        <MessagingThread />
      </>
    );
  }

  useEffect(() => {
    const initChat = async () => {
      if (mounted && groupChatName) {
        setChannel(
          await streamClient.channel("messaging", groupChatName, {
            image: getRandomImage(getInitials(groupName)),
            name: `${groupName} Group Chat`,
          })
        );
      }
    };
    initChat();
  }, [mounted, username, streamClient.user]);

  if (channel) {
    return (
      <Chat client={streamClient} theme={`messaging ${theme}`}>
        <div>
          <Channel
            channel={channel}
            maxNumberOfFiles={10}
            multipleUploads={true}
            Attachment={CustomAttachment}
          >
            <ChannelChildren />
          </Channel>
        </div>
      </Chat>
    );
  }
  return (
    <div>
      <Channel
        maxNumberOfFiles={10}
        multipleUploads={true}
        Attachment={CustomAttachment}
      >
        <ChannelChildren />
      </Channel>
    </div>
  );
}

export function StreamChannelList({
  toggleMobile = () => {},
  isCreating,
  setIsCreating,
}) {
  const onCreateChannel = () => setIsCreating(!isCreating);
  const onClose = () => setIsCreating(false);
  return (
    <div id="mobile-channel-list" onClick={toggleMobile}>
      <ChannelList
        filters={{ type: "messaging" }}
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
  );
}
