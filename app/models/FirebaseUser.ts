import { UserInfo } from "firebase/auth"
export default interface FirebaseUser extends Omit<UserInfo, "photoURL"> {
  photoUrl?: string
  emailVerified?: boolean
  token?: string
  expirationTime?: string
  username?: string
  groups?: string[]
  alpacaACH?: string
  alpacaAccountId?: string
  streamToken?: string
  fcmToken?: string
  invited?: boolean
}
