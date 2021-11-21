import React from "react"
import { Chat } from "stream-chat-expo"
import { usePaginatedUsers, useStream } from "../hooks"
import { SearchUsersContext } from "./SearchUsersContext"

export const SearchUsersProvider: React.FC<{
  value?: SearchUsersContext
}> = ({ children, value }) => {
  const paginatedUsers = usePaginatedUsers()

  const { client } = useStream()
  const searchContext = {
    ...paginatedUsers,
    ...value,
  }
  React.useEffect(() => console.log("client", client), [client])
  return (
    <SearchUsersContext.Provider value={searchContext as SearchUsersContext}>
      {/* @ts-ignore */}
      {client?.user ? <Chat client={client}>{children}</Chat> : children}
    </SearchUsersContext.Provider>
  )
}
