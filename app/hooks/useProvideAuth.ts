import { auth } from "@lib/firebase/client/auth"
import { setUserState } from "@lib/firebase/client/db/setUserState"
import { storeFailedLogin } from "@lib/firebase/client/db/storeFailedLogin"
import { fcmToken } from "@lib/firebase/client/messaging"
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
      // ! This user refresh causes intermitent permissions errors
      // const { token, expirationTime, ...userWithoutToken } = user

      // createUser(user.uid, userWithoutToken)
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

  // const signinWithEmail = async (email: string, password: string, redirect: string | UrlObject) => {
  //   setLoading(true)
  //   const response = await signInWithEmailAndPassword(auth, email, password)
  //   handleUser(response.user)
  //   if (redirect) {
  //     Router.push(redirect)
  //   }
  // }

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

      console.log(credential)

      email && storeFailedLogin(email, credential)

      toast.error(errorMessage)
    }

    redirect !== "" && Router.push(redirect)
  }

  const signinWithFacebook = (redirect: string | UrlObject) =>
    signinWithProvider(new FacebookAuthProvider())

  const signinWithGoogle = (redirect: string | UrlObject) =>
    signinWithProvider(new GoogleAuthProvider())

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

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (user) {
  //       const token = await firebase
  //         .auth()
  //         .currentUser.getIdToken(/* forceRefresh */ true);
  //       setUser(user);
  //       console.log('refreshed token');
  //     }
  //   }, 30 * 60 * 1000 /*every 30min, assuming token expires every 1hr*/);
  //   return () => clearInterval(interval);
  // }, [user]); // needs to depend on user to have closure on a valid user object in callback fun

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
