import React, { useContext } from "react"
import { PaginatedUsers } from "../hooks/usePaginatedUsers"

export type SearchUsersContextValue = PaginatedUsers
export const SearchUsersContext = React.createContext({} as SearchUsersContextValue)

export const useSearchUsersContext = () =>
  useContext(SearchUsersContext) as unknown as SearchUsersContextValue
