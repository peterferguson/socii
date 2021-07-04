import Logo from "@components/Logo"
import { UserContext } from "@lib/context"
import {
  auth,
  facebookAuthProvider,
  googleAuthProvider,
  userFirstName,
} from "@lib/firebase"
import router from "next/router"
import React, { useContext, useEffect } from "react"
import toast from "react-hot-toast"
import { FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useMediaQuery } from "react-responsive"

// ? Should we REQUIRE that the user login with email
// TODO: Add user info to users colleciton on sign up
// TODO: Implement account linking
// TODO: Implement invite system
// TODO: Implement a route for invitees which has the invited email so we can bypass the auth verification & attach the email to whatever auth user is provided
// TODO: Implement Apple login on iOS devices

export default function Enter(props) {
  const { user, username } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      toast.dismiss()
      // TODO: If a user already belongs to a group redirect there first
      // TODO: Check the group first since if they are in a group they will already have a username
      router.push(`/user/${username ? username : "create"}`)
      toast.success(`Welcome ${userFirstName(user)}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  // const [verified, setVerified] = useState(null)

  const is1Col = !useMediaQuery({ minWidth: 640 })

  const signInPopUp = async (authProvider) => await auth.signInWithPopup(authProvider)
  return (
    <main className="h-screen bg-brand-natural-light">
      <div className="relative flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-black/10"></div>
        <div className="z-10 w-full max-w-md p-10 bg-white space-y-8 rounded-xl">
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-bold text-gray-900 font-primary">
              Welcome to <Logo />
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Please link your account with one of the following providers:
            </p>
          </div>
          {is1Col ? (
            <div className="flex flex-row items-center justify-center space-x-6">
              <span
                className="inline-flex items-center justify-center  font-bold text-white bg-white border border-gray-300 rounded-full cursor-pointer w-11 h-11 hover:shadow-lg transition ease-in duration-300"
                onClick={() => signInPopUp(googleAuthProvider)}
              >
                <FcGoogle className="w-8 h-8" />
              </span>
              <span
                className="inline-flex items-center justify-center font-bold bg-white rounded-full cursor-pointer text-facebook w-11 h-11 hover:shadow-lg transition ease-in duration-300"
                onClick={() => signInPopUp(facebookAuthProvider)}
              >
                <FaFacebook className="w-11 h-11" />
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mx-auto space-y-6">
              <span
                className="relative flex items-center justify-center w-full mx-auto bg-white rounded-full cursor-pointer h-11 "
                onClick={() => signInPopUp(googleAuthProvider)}
              >
                <FcGoogle className="absolute w-8 h-8 text-white left-[4.25rem]" />
                <span className="flex items-center justify-center w-8/12 mx-auto text-sm font-thin text-black bg-white border border-gray-100 rounded-full h-11 hover:shadow-lg transition ease-in duration-300">
                  Connect with Google
                </span>
              </span>
              <span
                className="relative flex items-center justify-center w-full mx-auto bg-white rounded-full cursor-pointer h-11"
                onClick={() => signInPopUp(facebookAuthProvider)}
              >
                <FaFacebook className="absolute w-8 h-8 text-white left-[4.25rem]" />
                <span className="flex items-center justify-center w-8/12 mx-auto text-sm text-white rounded-full h-11 bg-facebook hover:shadow-lg transition ease-in duration-300">
                  Connect with Facebook
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// TODO: Re-implement email verification
// // * Email sign up form
// function EmailSignUp({ verified, setVerified }) {
//   const [email, setEmail] = useState(undefined)

//   const validateUser = useCallback(
//     debounce(async (email) => {
//       const inviteRef = firestore
//         .collectionGroup("invites")
//         .where("email", "==", email)
//         .limit(1)

//       const userRef = firestore.collection("users").where("email", "==", email).limit(1)

//       const verified = Promise.all([inviteRef.get(), userRef.get()]).then((values) => {
//         const isInvited = !(values?.[0].empty ?? false)
//         const isUser = !(values[1].empty ?? false)
//         setVerified(isUser || isInvited)
//         if (!(isUser || isInvited)) {
//           throw "nope"
//         }
//       })

//       toast.promise(verified, {
//         loading: "Checking...",
//         success: "Hey you have been invited!",
//         error:
//           "Sorry this is a pre-Alpha (version 0.0) limited release. \
//           You have to be invited 😞.",
//         // TODO buttons here to ask for an invite?
//       })
//     }, 250),
//     []
//   )

//   // Step 1 - Verify Invite
//   useEffect(() => {
//     if (email) {
//       validateUser(email)
//     }
//   }, [email])
// }
