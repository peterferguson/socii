import { usePaginatedUsers } from "../hooks/usePaginatedUsers"
import { SearchUsersContext, SearchUsersContextValue } from "./SearchUsersContext"

export const SearchUsersProvider: React.FC<{
  value?: SearchUsersContextValue
}> = ({ children, value }) => {
  const paginatedUsers = usePaginatedUsers()

  const searchContext = {
    ...paginatedUsers,
    ...value,
  }
  return (
    <SearchUsersContext.Provider value={searchContext as SearchUsersContextValue}>
      {children}
    </SearchUsersContext.Provider>
  )
}
