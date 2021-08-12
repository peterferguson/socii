import { UserInfo } from "firebase/auth"
export default interface FirebaseUser extends UserInfo {
  provider: string
  emailVerified: boolean
  token: string
  expirationTime: string
  alpacaACH: string
  alpacaAccountId: string
}
