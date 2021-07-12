import { UrlObject } from "url"
import FirebaseUser from "./FirebaseUser"

export default interface User {
  user: FirebaseUser
  username: string
  userGroups: string[]
  loading: boolean
  signinWithFacebook: (redirect: string | UrlObject) => {}
  signinWithGoogle: (redirect: string | UrlObject) => {}
  signout: () => {}
  getFreshToken: () => {}
}
