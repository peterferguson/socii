import LoadingIndicator from "@components/LoadingIndicator";
import AuthCheck from "@components/AuthCheck";
import { streamClient } from "@lib/stream";
import { useContext, useEffect, useState } from "react";
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
} from "@components/stream/components";

import { UserContext } from "@lib/context";
import { isBrowser } from "@utils/helper";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = {
  cid: 1,
  last_message_at: -1,
  updated_at: -1,
};

const App = (mobileView = false) => {
  const { user, username, userStreamToken } = useContext(UserContext);
  const [chatClient, setChatClient] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isMobileNavVisible, setMobileNav] = useState(mobileView);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const initChat = async () => {
      const client = streamClient;

      if (username && userStreamToken) {
        await client.connectUser(
          { id: username, name: user?.displayName },
          userStreamToken
        );
      }

      setChatClient(client);
    };

    initChat();
  }, [username, userStreamToken]);

  useEffect(() => {
    const handleThemeChange = ({ data }) => {
      if (data === "light" || data === "dark") {
        setTheme(data);
      }
    };

    window.addEventListener("message", handleThemeChange);
    return () => window.removeEventListener("message", handleThemeChange);
  }, []);

  useEffect(() => {
    const mobileChannelList = document.querySelector("#mobile-channel-list");
    if (isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.add("show");
      document.body.style.overflow = "hidden";
    } else if (!isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }, [isMobileNavVisible]);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  const toggleMobile = () => setMobileNav(!isMobileNavVisible);

  return (
    <AuthCheck>
      {isBrowser && username && userStreamToken && (
        <Chat client={chatClient} theme={`messaging ${theme}`}>
          <div id="mobile-channel-list" onClick={toggleMobile}>
            <ChannelList
              filters={filters}
              sort={sort}
              options={options}
              List={(props) => (
                <MessagingChannelList
                  {...props}
                  onCreateChannel={() => setIsCreating(!isCreating)}
                />
              )}
              Preview={(props) => (
                <MessagingChannelPreview {...props} {...{ setIsCreating }} />
              )}
            />
          </div>
          <div>
            <Channel
              maxNumberOfFiles={10}
              multipleUploads={true}
              Attachment={CustomAttachment}
            >
              {isCreating && (
                <CreateChannel
                  toggleMobile={toggleMobile}
                  onClose={() => setIsCreating(false)}
                />
              )}
              <Window>
                <MessagingChannelHeader
                  theme={theme}
                  toggleMobile={toggleMobile}
                />
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
                  TypingIndicator={() => null}
                />
                <MessageInput focus Input={MessagingInput} />
              </Window>
              <MessagingThread />
            </Channel>
          </div>
        </Chat>
      )}
    </AuthCheck>
  );
};
export default App;
