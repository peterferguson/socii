import * as Google from "expo-auth-session/providers/google"
import Constants from "expo-constants"
import * as WebBrowser from "expo-web-browser"
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import React from "react"
import { SafeAreaView, View } from "react-native"
import { EnterCard } from "../components/EnterCard"
import { useAuth } from "../hooks/useAuth"
import { auth } from "../lib/firebase"
import tw from "../lib/tailwind"
import { shadowStyle } from "../utils/shadowStyle"

const CLIENT_ID = Constants.manifest.extra.firebase.clientId

// - The unauthenticated user flow is handled differently than before.
// - We will now have a separate stack navigator for the unauthenticated user flow.
// - Thus we will not use the redirection logic from before.

WebBrowser.maybeCompleteAuthSession()

export default function EnterScreen() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID,
  })

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params

      signInWithCredential(auth, GoogleAuthProvider.credential(id_token))
    }
  }, [response])

  const { user, signout } = useAuth()

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View
        style={tw`relative flex items-center justify-center min-h-full px-4 py-12 sm:px-6`}
      >
        {user ? (
          <View style={tw`text-center items-center justify-center flex-1`} />
        ) : (
          <EnterCard signinWith={() => promptAsync()} />
        )}
      </View>
    </SafeAreaView>
  )
}
