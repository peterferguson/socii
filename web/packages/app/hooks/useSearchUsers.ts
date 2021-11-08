import { useContext } from "react"

import { SearchUsersContext } from "../contexts/SearchUsersContext"

export const useSearchUsers = () => useContext(SearchUsersContext) as SearchUsersContext
