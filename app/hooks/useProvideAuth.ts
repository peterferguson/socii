import { auth } from "@lib/firebase/client/auth"
import { setUserState } from "@lib/firebase/client/db/setUserState"
import { storeFailedLogin } from "@lib/firebase/client/db/storeFailedLogin"
import { formatUser } from "@utils/formatUser"
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
import { useCallback, useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import { UrlObject } from "url"
import { getUsernameWithEmail } from "@lib/firebase/client/db/getUsernameWithEmail"
import { isInvited } from "@lib/firebase/client/db/isInvited"
import FirebaseUser from "@models/FirebaseUser"

//Ref https://docs.react2025.com/firebase/use-auth

export const useProvideAuth = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<FirebaseUser>(null)
  const [username, setUsername] = useState<string>(null)
  const [userGroups, setUserGroups] = useState<string[]>(null)
  const invited = useRef<boolean>(null)

  const handleUser = async (rawUser: User | null) => {
    console.log("handleUser called", new Date())
    console.log("rawUser", rawUser)
    const formattedUser = rawUser ? await formatUser(rawUser) : null
    formattedUser === null
      ? setUser(null)
      : setUser((prevUser) => ({ ...prevUser, ...formattedUser }))

    setLoading(false)
    formattedUser && console.log("handleUser Succeeded", new Date())
    return formattedUser
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

  const signout = async (
    redirect: string | UrlObject = "/",
    showToast: boolean = true
  ) => {
    await signOut(auth)
    console.log("signed out")
    const firstname = userFirstName(user?.displayName)
    toast.dismiss()
    showToast && toast(`Bye for now ${firstname}!`, { icon: "👋" })
    setUser(null)
    redirect !== "" && Router.push(redirect)
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    let unsubscribe
    if (user?.email && !invited.current) {
      setLoading(true)
      getUsernameWithEmail(user.email).then((username) => {
        setUsername(username)
        invited.current = !!username
        if (!invited.current)
          isInvited(user.email).then((r) => {
            invited.current = r
            setUser((prevUser) => ({ ...prevUser, invited: invited.current }))
            setLoading(false)
          })
        else {
          console.log("got here")
          unsubscribe = setUserState(user.uid, setUsername, setUserGroups, setUser)
          setLoading(false)
          return () => unsubscribe?.()
        }
      })
    }
  }, [user?.email, user?.uid])

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
