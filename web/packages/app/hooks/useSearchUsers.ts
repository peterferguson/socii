import { useContext } from "react"

import { SearchUsersContext } from "../contexts"

export const useSearchUsers = () => useContext(SearchUsersContext) as SearchUsersContext
