import { auth } from "@lib/firebase/client/auth"
import { setUserState } from "@lib/firebase/client/db/setUserState"
import { storeFailedLogin } from "@lib/firebase/client/db/storeFailedLogin"
import { getFCMToken } from "@lib/firebase/client/messaging"
import { formatUser } from "@utils/formatUser"
import { isBrowser } from "@utils/isBrowser"
import { userFirstName } from "@utils/userFirstName"
import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth"
import Router from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { UrlObject } from "url"

//Ref https://docs.react2025.com/firebase/use-auth

export const useProvideAuth = () => {
  const [user, setUser] = useState(undefined)
  const [username, setUsername] = useState(null)
  const [userGroups, setUserGroups] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (rawUser: User | null) => {
    console.log("handleUser called", new Date())
    if (rawUser) {
      const user = await formatUser(rawUser)
      setUser(user)
      setLoading(false)
      console.log("handleUser Succeeded", new Date())
      return user
    } else {
      setUser(false)
      setLoading(false)
      return false
    }
  }

  const signinWithProvider = async (
    provider: AuthProvider,
    redirect: string | UrlObject = ""
  ) => {
    setLoading(true)
    try {
      const { user: rawUser } = await signInWithPopup(auth, provider)
      handleUser(rawUser)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log("signinWithProvider error", errorCode, errorMessage)

      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential =
        provider.providerId === "google.com"
          ? GoogleAuthProvider.credentialFromError(error)
          : FacebookAuthProvider.credentialFromError(error)
      email && storeFailedLogin(email, credential)

      toast.error(errorMessage)
    }

    redirect !== "" && Router.push(redirect)
  }

  const signinWithFacebook = (redirect: string | UrlObject) =>
    signinWithProvider(new FacebookAuthProvider(), redirect)

  const signinWithGoogle = (redirect: string | UrlObject) =>
    signinWithProvider(new GoogleAuthProvider(), redirect)

  const signout = async (redirect: string | UrlObject = "/") => {
    await signOut(auth)
    const firstname = userFirstName(user?.displayName)
    toast.dismiss()
    toast(`Bye for now ${firstname}!`, { icon: "👋" })
    handleUser(null)
    Router.push(redirect)
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    let unsubscribe
    if (user?.uid)
      unsubscribe = setUserState(user.uid, setUsername, setUserGroups, setUser)
    return () => unsubscribe?.()
  }, [user?.uid])

  const getFreshToken = async () => {
    console.log("getFreshToken called", new Date())
    const currentUser = auth.currentUser
    return currentUser ? `${await currentUser.getIdToken(false)}` : ""
  }

  return {
    username: username || "",
    userGroups: userGroups || [],
    user,
    loading,
    // signinWithEmail,
    // signinWithGitHub,
    // signinWithTwitter,
    signinWithFacebook,
    signinWithGoogle,
    signout,
    getFreshToken,
  }
}
