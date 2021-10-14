import { UrlObject } from "url"
import FirebaseUser from "./FirebaseUser"

export default interface User {
  user: FirebaseUser
  loading: boolean
  signinWithFacebook: (redirect: string | UrlObject) => {}
  signinWithGoogle: (redirect: string | UrlObject) => {}
  signout: (redirect: string | UrlObject, showToast: boolean) => {}
  getFreshToken: () => {}
}
