import User from "../models/User"
import { createContext } from "react"

export const AuthContext = createContext({
  user: null,
  loading: false,
  // signinWithEmail,
  // signinWithGitHub,
  // signinWithTwitter,
  signinWithFacebook: null,
  signinWithGoogle: null,
  signout: null,
  getFreshToken: null,
} as User)
