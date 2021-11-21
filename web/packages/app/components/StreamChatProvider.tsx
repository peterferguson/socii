import { useStream } from "app/hooks/useStream"
import { Chat } from "stream-chat-expo"

const StreamChatProvider = ({ children }) => {
  const { client } = useStream()
  // @ts-ignore
  return client?.user ? <Chat client={client}>{children}</Chat> : children
}

export default StreamChatProvider
