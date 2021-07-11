import firebase from "@lib/firebase"

export default interface FirebaseUser extends firebase.UserInfo {
  provider: string
  emailVerified: boolean
  token: string
  expirationTime: string
}