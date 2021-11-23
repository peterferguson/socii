import { useProvideSearch } from "app/hooks/useProvideSearch"
import React from "react"
import { SearchContext } from "./SearchContext"

export function SearchProvider({ children }) {
  const value = useProvideSearch()
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
