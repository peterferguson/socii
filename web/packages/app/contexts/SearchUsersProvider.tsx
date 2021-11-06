import { usePaginatedUsers } from "../hooks/usePaginatedUsers"
import { SearchUsersContext } from "./searchUsersContext"

export const SearchUsersProvider: React.FC<{
  value?: SearchUsersContext
}> = ({ children, value }) => {
  const paginatedUsers = usePaginatedUsers()

  const searchContext = {
    ...paginatedUsers,
    ...value,
  }
  return (
    <SearchUsersContext.Provider value={searchContext as SearchUsersContext}>
      {children}
    </SearchUsersContext.Provider>
  )
}
