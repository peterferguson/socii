import { getApp } from "@firebase/app"
import { EmailAuthProvider, getAuth, RecaptchaVerifier } from "firebase/auth"
import { initialize } from "../firebase"

let app
try {
  app = getApp()
} catch (e) {
  app = initialize()
}

export const auth = getAuth(app)

export const recaptchaVerifier = RecaptchaVerifier
export const credentialWithLink = EmailAuthProvider.credentialWithLink
