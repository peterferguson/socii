import User from "@models/User"
import { createContext } from "react"

export const authContext = createContext({
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
