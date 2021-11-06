import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  User,
  signInWithCredential,
} from "firebase/auth"
import { useEffect, useState } from "react"
// import toast from "react-hot-toast"
// import { UrlObject } from "url"
import { auth } from "../lib/firebase"
import { getUsernameWithEmail } from "../lib/firebase/db/getUsernameWithEmail"
import { setUserState } from "../lib/firebase/db/setUserState"
import { storeFailedLogin } from "../lib/firebase/db/storeFailedLogin"
import FirebaseUser from "../models/FirebaseUser"
import { useRouter } from "../navigation/use-router"
import { checkAlreadyOnWaitlist } from "../utils/checkAlreadyOnWaitlist"
import { formatUser } from "../utils/formatUser"
import { userFirstName } from "../utils/userFirstName"

//Ref https://docs.react2025.com/firebase/use-auth

export const useProvideAuth = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [user, setUser] = useState<FirebaseUser>(null)

  const handleUser = async (rawUser: User | null) => {
    setLoading(true)
    const formattedUser = rawUser ? await formatUser(rawUser) : null
    setUser(formattedUser)
    return formattedUser
  }

  const signinWithProvider = async (provider: AuthProvider, redirect: string = "") => {
    setLoading(true)
    console.log("signinWithProvider provider", provider)
    console.log("signinWithProvider redirect", redirect)
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

      // toast.error(errorMessage)
    }

    redirect !== "" && router.push(redirect)
  }

  const signinWithFacebook = (redirect: string = "") =>
    signinWithProvider(new FacebookAuthProvider(), redirect)

  const signinWithGoogle = (redirect: string = "") =>
    signinWithProvider(new GoogleAuthProvider(), redirect)

  const signout = async (redirect: string = "/", showToast: boolean = true) => {
    await signOut(auth)
    console.log("signed out")
    const firstname = userFirstName(user?.displayName)
    // toast.dismiss()
    // showToast && toast(`Bye for now ${firstname}!`, { icon: "👋" })
    setUser(null)
    redirect !== "" && router.push(redirect)
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser)
    return () => unsubscribe?.()
  }, [])

  useEffect(() => {
    let unsubscribe
    if (user?.uid && !user?.username && !user?.isInvited) {
      getUsernameWithEmail(user?.email).then(usersUsername => {
        setUser(prevUser => ({ ...prevUser, username: usersUsername }))
        // - Dont check for invite if user has username
        if (usersUsername) return
        checkAlreadyOnWaitlist(user.email).then(({ isOnWaitlist, isInvited }) =>
          setUser(prevUser => ({
            ...prevUser,
            isOnWaitlist,
            isInvited,
          }))
        )
      })
      setLoading(false)
    }

    unsubscribe = user?.uid && setUserState(user.uid, setUser)

    return () => unsubscribe?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, user?.uid])

  const getFreshToken = async () => {
    console.log("getFreshToken called", new Date())
    const currentUser = auth.currentUser
    return currentUser ? `${await currentUser.getIdToken(false)}` : ""
  }

  return {
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
