import { createContext } from "react"
import { PaginatedUsers } from "../hooks/usePaginatedUsers"

export type SearchUsersContext = PaginatedUsers
export const SearchUsersContext = createContext({} as SearchUsersContext)
