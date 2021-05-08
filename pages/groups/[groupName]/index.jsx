// ! Initial display of the holdings and some metrics of the performance over time

// * A pie option for groups is probably an essential ingredient.
// * This would then need to include some sort of auto-invest feature but again that is
// * part and parcel of an investment group.

// ? This maybe implemented using some sort of stripe subscription that the group can set up
// ? themselves. I.e. Each group can decide their own monthly price ... or maybe a set of prices
// ? for multiple levels of investors within the group. (This may lead to oligarchies if a unit based decision process is in place)
// ? Maybe we should have some system set-up for users to control their decision process & have various options with pros & cons

// TODOs (Page UI Features):
// - Portfolio graph & value card (with close to real-time updates?)
// - Option of comparision against leading markets (and leading groups in segment)
// - Cards of holdings
// - Portfolio Analysis (partnership with the likes of atom or simply wall st?)
// - Investor section with description of joining date (etc... this should not be the focus!)
// -

// TODOs (Backend Features):
// - Firestore collection for groups with subcollections for investors, holdings, ...
// - Real-time db / api calls to update the graph & price card:
// ? Maybe this should be cached & then use the realtime db to store previous pricing data
// ? This would get expensive over time so maybe forget about realtime db and use api calls
// ? to update firestore price & create a collection to store this for each ticker.
// ? Historical data can be valuable when exposed via an api. Plus this could allow us to create
// ? an interface with our users for historical modelling etc for the more tech savvy users.
// ? Simple modelling could be made available for all users, in the sense of simulations of
// ? removing certain trades & replacing them with alternatives. This could allow users to
// ? easily reevaluate their investment thesis in a retrospective manner.
// ! Implementing storage of this data would also save us money in the future since we
// ! would not need to call an api to get this data for historical pricing in simulations
// - Sunburst charts for allocation, diversifaction & over allocation.

import { useRouter } from "next/router";
import ChatApp from "../../chat";

// import "stream-chat-react/dist/css/index.css";
// import LoadingIndicator from "@components/LoadingIndicator";
// import AuthCheck from "@components/AuthCheck";
// import { useContext, useEffect, useState } from "react";
// import { StreamChat } from "stream-chat";
// import {
//   Channel,
//   ChannelList,
//   Chat,
//   MessageInput,
//   MessageList,
//   Window,
// } from "stream-chat-react";

// import {
//   CreateChannel,
//   CustomMessage,
//   MessagingChannelHeader,
//   MessagingChannelList,
//   MessagingChannelPreview,
//   MessagingInput,
//   MessagingThread,
// } from "@components/stream/components";

// import { UserContext } from "@lib/context";

// const apiKey = process.env.REACT_APP_STREAM_KEY;
// const userToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicGV0ZXJmZXJndXNvbiJ9.xlZ7Odi4JAwXI-6-uNan3buTIC9iE3BARc1VsOqsEFU";

// const filters = { type: "messaging" };
// const options = { state: true, presence: true, limit: 10 };
// const sort = {
//   cid: 1,
//   last_message_at: -1,
//   updated_at: -1,
// };

export default function Group() {
  const router = useRouter();

  const groupName = router.query.groupName;

  //   const { user, username } = useContext(UserContext);
  //   const [chatClient, setChatClient] = useState(null);
  //   const [isCreating, setIsCreating] = useState(false);
  //   const [isMobileNavVisible, setMobileNav] = useState(true);
  //   const [theme, setTheme] = useState("light");

  //   useEffect(() => {
  //     const initChat = async () => {
  //       const client = StreamChat.getInstance(apiKey);

  //       if (username) {
  //         await client.connectUser(
  //           { id: username, name: user?.displayName },
  //           userToken
  //         );
  //       }

  //       setChatClient(client);
  //     };

  //     initChat();
  //   }, [username]);

  //   useEffect(() => {
  //     const handleThemeChange = ({ data }) => {
  //       if (data === "light" || data === "dark") {
  //         setTheme(data);
  //       }
  //     };

  //     window.addEventListener("message", handleThemeChange);
  //     return () => window.removeEventListener("message", handleThemeChange);
  //   }, []);

  //   useEffect(() => {
  //     const mobileChannelList = document.querySelector("#mobile-channel-list");
  //     if (isMobileNavVisible && mobileChannelList) {
  //       mobileChannelList.classList.add("show");
  //       document.body.style.overflow = "hidden";
  //     } else if (!isMobileNavVisible && mobileChannelList) {
  //       mobileChannelList.classList.remove("show");
  //       document.body.style.overflow = "auto";
  //     }
  //   }, [isMobileNavVisible]);

  //   if (!chatClient) {
  //     return <LoadingIndicator />;
  //   }

  //   const toggleMobile = () => setMobileNav(!isMobileNavVisible);

  return (
    <div className="flex">
      <div className="w-1/3">{groupName}</div>
      <div className="w-1/3">{groupName}</div>
      <div className="w-1/3">
        <ChatApp mobileView={true}/>
        {/* <AuthCheck>
      {username && (
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
            <Channel maxNumberOfFiles={10} multipleUploads={true}>
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
    </AuthCheck> */}
      </div>
    </div>
  );
}
