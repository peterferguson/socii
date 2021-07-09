import { createContext } from "react"
import { FirebaseUser } from "@lib/firebase"

interface User {
  user: FirebaseUser | null
  username: string | null
  userGroups: string[] | null
}

export const UserContext = createContext({
  user: null,
  username: null,
  userGroups: null,
} as User)

// TODO: Not sure this is the correct use of a context ... I think it is not!
export const SelectedGroupContext = createContext({
  selectedGroup: null,
  changeSelectedGroup: (selectedGroup) => {},
})

export const StreamContext = createContext({ client: null })
