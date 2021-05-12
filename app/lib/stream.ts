import { StreamChat } from "stream-chat";

const apiKey = process.env.REACT_APP_STREAM_KEY;

export const streamClient = StreamChat.getInstance(apiKey);
