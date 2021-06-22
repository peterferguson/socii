import React from "react"
import { MessageInputContextProvider, useMessageInputContext } from "stream-chat-react"

import { useCommandTrigger } from "stream-chat-react/dist/components/MessageInput/hooks/useCommandTrigger"
import { useEmojiTrigger } from "stream-chat-react/dist/components/MessageInput/hooks/useEmojiTrigger"
import { useUserTrigger } from "stream-chat-react/dist/components/MessageInput/hooks/useUserTrigger"
const options = ["TSLA", "SPOT", "AAPL", "GME", "AMZN"]

const CustomSuggestionItem = (props) => <div>{props.entity.name}</div>

const customTrigger = {
  component: CustomSuggestionItem,
  dataProvider: (query, _, onReady) => {
    const filteredOptions = options
      .filter((option) => option.includes(query))
      .map((option) => ({ name: option }))
    onReady(filteredOptions, query)
  },
  output: (entity) => ({
    caretPosition: "next",
    key: entity.name,
    text: entity.name,
  }),
}

const CustomTriggerProvider = ({ children }) => {
  const currentContext = useMessageInputContext()

  const customTriggers = {
    "$": customTrigger,
    "/": useCommandTrigger(),
    ":": useEmojiTrigger(currentContext.emojiIndex),
    "@": useUserTrigger({
      disableMentions: currentContext.disableMentions,
      mentionAllAppUsers: currentContext.mentionAllAppUsers,
      mentionQueryParams: currentContext.mentionQueryParams,
      onSelectUser: currentContext.onSelectUser,
    }),
  }

  const newContext = {
    ...currentContext,
    autocompleteTriggers: customTriggers,
  }

  return (
    <MessageInputContextProvider value={newContext}>
      {children}
    </MessageInputContextProvider>
  )
}

export default CustomTriggerProvider
