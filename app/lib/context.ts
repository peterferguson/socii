import User from "@models/User"
import { createContext } from "react"
import { StreamChat } from "stream-chat"

export const userContext = createContext({
  user: null,
  username: null,
  userGroups: null,
  loading: false,
  // signinWithEmail,
  // signinWithGitHub,
  // signinWithTwitter,
  signinWithFacebook: null,
  signinWithGoogle: null,
  signout: null,
  getFreshToken: null,
} as User)

interface SelectedGroup {
  selectedGroup: string
  changeSelectedGroup: (group: string) => void
}

// TODO: Not sure this is the correct use of a context ... I think it is not!
// FIXME: This seems to be responsible for memory leaks
export const selectedGroupContext = createContext({
  selectedGroup: null,
  changeSelectedGroup: null,
} as SelectedGroup)

interface Stream {
  client: StreamChat
}
export const streamContext = createContext({ client: null } as Stream)
