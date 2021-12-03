import React from "react"
import { Chat } from "stream-chat-expo"
import { usePaginatedUsers, useStream } from "../hooks"
import { SearchUsersContext } from "./SearchUsersContext"

export const SearchUsersProvider: React.FC<{
  value?: SearchUsersContext
}> = ({ children, value }) => {
  const paginatedUsers = usePaginatedUsers()

  const { client, clientReady } = useStream()
  const searchContext = {
    ...paginatedUsers,
    ...value,
  }
  return (
    <SearchUsersContext.Provider value={searchContext as SearchUsersContext}>
      {/* @ts-ignore */}
      {clientReady ? <Chat client={client}>{children}</Chat> : children}
    </SearchUsersContext.Provider>
  )
}
