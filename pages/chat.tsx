import React from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  InfiniteScrollPaginator,
  MessageInput,
  MessageInputFlat,
  MessageList,
  MessageTeam,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

const apiKey = process.env.REACT_APP_STREAM_KEY;
const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicGV0ZXJmZXJndXNvbiJ9.xlZ7Odi4JAwXI-6-uNan3buTIC9iE3BARc1VsOqsEFU"

const filters = { type: "messaging" };
const sort = { last_message_at: -1 };
const theme = "messaging dark";

const Paginator = (props) => (
  <InfiniteScrollPaginator threshold={300} {...props} />
);

const chatClient = StreamChat.getInstance(apiKey);

chatClient.connectUser(
  {
    id: 'peterferguson',
    name: 'Peter Ferguson'
  },
  userToken,
);

const App = () => (
  <Chat client={chatClient} theme={theme}>
    <ChannelList filters={filters} sort={sort} Paginator={Paginator} />
    <Channel>
      <Window>
        <ChannelHeader />
        <MessageList Message={MessageTeam} />
        <MessageInput Input={MessageInputFlat} />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default App;
