import { createUser } from "@lib/db"
import {
  auth,
  FacebookAuthProvider,
  firestore,
  GoogleAuthProvider,
} from "@lib/firebase"
import { formatUser } from "@utils/formatUser"
import { userFirstName } from "@utils/userFirstName"
import firebase from "firebase"
import Router from "next/router"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { UrlObject } from "url"

//Ref https://docs.react2025.com/firebase/use-auth

export const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [userGroups, setUserGroups] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (rawUser: firebase.User | null) => {
    console.log("handleUser called", new Date())
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { token, expirationTime, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      setUser(user)
      setLoading(false)
      return user
    } else {
      setUser(false)
      setLoading(false)
      return false
    }
  }

  // const signinWithEmail = async (email: string, password: string, redirect: string | UrlObject) => {
  //   setLoading(true)
  //   const response = await auth.signInWithEmailAndPassword(email, password)
  //   handleUser(response.user)
  //   if (redirect) {
  //     Router.push(redirect)
  //   }
  // }
  // const signinWithTwitter = (redirect) => {
  //   setLoading(true)
  //   return auth.signInWithPopup(new TwitterAuthProvider()).then((response) => {
  //     handleUser(response.user)
  //     if (redirect) {
  //       Router.push(redirect)
  //     }
  //   })
  // }
  const signinWithFacebook = async (redirect: string | UrlObject) => {
    setLoading(true)
    const response = await auth.signInWithPopup(new FacebookAuthProvider())
    handleUser(response.user)
    if (redirect) {
      Router.push(redirect)
    }
  }
  const signinWithGoogle = async (redirect: string | UrlObject) => {
    setLoading(true)
    const response = await auth.signInWithPopup(new GoogleAuthProvider())
    handleUser(response.user)
    if (redirect) {
      Router.push(redirect)
    }
  }

  const signout = async (redirect: string | UrlObject = "/") => {
    await auth.signOut()
    const firstname = userFirstName(user)
    toast.dismiss()
    toast(`Bye for now ${firstname}!`, { icon: "👋" })
    handleUser(null)
    Router.push(redirect)
  }

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const getUserData = () => {
      // allows us to turn off the realtime data feed when finished
      const userRef = firestore.collection("users").doc(user.uid)
      const unsubscribe = userRef.onSnapshot((doc) => {
        const userData = doc.data()
        setUsername(userData?.username)
        setUserGroups(userData?.groups)
      })

      return unsubscribe
    }
    if (user) getUserData()
  }, [user])

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
    if (currentUser) {
      const token = await currentUser.getIdToken(false)
      return `${token}`
    } else {
      return ""
    }
  }

  return {
    user,
    username,
    userGroups,
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
