import { createContext } from "react"

export const UserContext = createContext({
  user: null,
  username: null,
  userGroups: null,
})

export const SelectedGroupContext = createContext({
  selectedGroup: null,
  changeSelectedGroup: (selectedGroup) => {},
})

export const StreamContext = createContext({ streamClient: null })
