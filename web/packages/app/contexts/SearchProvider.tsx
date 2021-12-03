import { useProvideSearch } from "app/hooks/useProvideSearch"
import React from "react"
import { SearchContext } from "./SearchContext"
import { SearchUsersProvider } from "./SearchUsersProvider"

export function SearchProvider({ children }) {
  const value = useProvideSearch()
  return (
    <SearchContext.Provider value={value}>
      <SearchUsersProvider>{children}</SearchUsersProvider>
    </SearchContext.Provider>
  )
}
