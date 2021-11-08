import * as Google from "expo-auth-session/providers/google"
import Constants from "expo-constants"
import * as WebBrowser from "expo-web-browser"
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import React from "react"
import { auth } from "../lib/firebase"

// - The unauthenticated user flow is handled differently than before.
// - We will now have a separate stack navigator for the unauthenticated user flow.
// - Thus we will not use the redirection logic from before.

WebBrowser.maybeCompleteAuthSession()
const CLIENT_ID = Constants.manifest.extra.firebase.clientId

export const useGoogleSignInPopUp = () => {
  const [_, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID,
  })

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params

      signInWithCredential(auth, GoogleAuthProvider.credential(id_token))
    }
  }, [response])

  return promptAsync
}
