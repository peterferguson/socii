import FirebaseUser from "./FirebaseUser"
import { UrlObject } from "url"

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
