import { signInWithPopup, OAuthProvider, UserCredential } from "firebase/auth"
import * as AppleAuthentication from "expo-apple-authentication"
import * as Crypto from "expo-crypto"
import { auth } from "../"
import logger from "app/utils/logger"

export const signInWithApple = async (): Promise<UserCredential | null> => {
  const nonce = Math.random().toString(36).substring(2, 10)

  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce
  )

  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  })

  const { identityToken } = appleCredential

  const provider = new OAuthProvider("apple.com")
  
  provider.addScope("email")
  provider.addScope("name")

  const credential = provider.credential({
    idToken: identityToken!,
    rawNonce: nonce,
  })
  let result: UserCredential | null = null
  try {
    result = await signInWithPopup(auth, credential)
  } catch (e) {
    logger.log(e)
  }
  return result
}
