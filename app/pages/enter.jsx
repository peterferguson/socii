import Logo from "@components/logo"
import { signInOptions } from "@lib/constants"
import { UserContext } from "@lib/context"
import { auth, firestore, userFirstName } from "@lib/firebase"
import { handleEnterKeyDown, validateEmail } from "@utils/helper"
import debounce from "lodash.debounce"
import router from "next/router"
import React, { useCallback, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { FiCheck, FiMail, FiX } from "react-icons/fi"
import { useMediaQuery } from "react-responsive"

// ? Should we REQUIRE that the user login with email
// TODO: Add user info to users colleciton on sign up
// TODO: Implement passwordless login
// TODO: Implement account linking
// TODO: Implement invite system
// TODO: Implement a route for invitees which has the invited email so we can bypass the auth verification & attach the email to whatever auth user is provided

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
  }, [username])

  const [verified, setVerified] = useState(null)

  const is1Col = !useMediaQuery({ minWidth: 640 })

  return (
    <main className="h-screen bg-brand-natural-light">
      {/* <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-xl py-3 mx-6 sm:mx-auto">
          <div className="px-6 py-8 bg-white border border-gray-200 shadow-lg sm:px-4 rounded-3xl \ bg-clip-padding bg-opacity-60">
            <div className="max-w-md mx-auto">
              <div className="w-full p-8 text-3xl font-bold text-center font-work-sans">
                <div className="">Been Invited?</div>
                Sign Up!
              </div>
              <div className="flex flex-col">
                <span className="py-2 font-bold font-work-sans leading text-md">
                  Email
                </span>
                <EmailSignUp verified={verified} setVerified={setVerified} />
              </div>
              <div className="leading-6 sm:text-lg sm:leading-7"></div>
              <div className="w-full py-3 text-center border-b border-gray-400 h-3.5">
                <span className="py-0 text-gray-400 px-2.5 bg-gray-50">
                  Or continue with
                </span>
              </div>
              {!user && <SignInButtons verified={verified} />}
            </div>
          </div>
        </div>
      </div> */}
      <div className="relative flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-black/10"></div>
        <div className="z-10 w-full max-w-md p-10 bg-white space-y-8 rounded-xl">
          <div className="text-center">
            <h2 className="mt-6 text-4xl font-bold text-gray-900 font-poppins">
              Welcome to <Logo />
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Please link your account with one of the following providers:
            </p>
          </div>
          {is1Col && (
            <div className="flex flex-row items-center justify-center space-x-6">
              <span className="inline-flex items-center justify-center font-bold bg-white rounded-full cursor-pointer text-facebook w-11 h-11 hover:shadow-lg transition ease-in duration-300">
                <FaFacebook className="w-11 h-11" />
              </span>
              <span className="inline-flex items-center justify-center  font-bold text-white bg-white border border-gray-300 rounded-full cursor-pointer w-11 h-11 hover:shadow-lg transition ease-in duration-300">
                <FcGoogle className="w-8 h-8" />
              </span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center mx-auto space-y-6">
            <span className="relative flex items-center justify-center w-full mx-auto bg-white rounded-full cursor-pointer h-11 ">
              <FaFacebook className="absolute w-8 h-8 text-white left-[4.25rem]" />
              <span className="flex items-center justify-center w-8/12 mx-auto text-sm text-white rounded-full h-11 bg-facebook hover:shadow-lg transition ease-in duration-300">
                Connect with Facebook
              </span>
            </span>
            <span className="relative flex items-center justify-center w-full mx-auto bg-white rounded-full cursor-pointer h-11 ">
              <FcGoogle className="absolute w-8 h-8 text-white left-[4.25rem]" />
              <span className="flex items-center justify-center w-8/12 mx-auto text-sm font-thin text-black bg-white border border-gray-100 rounded-full h-11 hover:shadow-lg transition ease-in duration-300">
                Connect with Google
              </span>
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

// * Sign in with Google button
function SignInButtons({ verified }) {
  const signInPopUp = async (authProvider) => await auth.signInWithPopup(authProvider)

  return (
    <div className="flex justify-center p-8 space-x-8">
      {signInOptions.map((option, index) => {
        return (
          <option.logo
            key={`logo-${index}`}
            className={`w-14 h-14 justify-center rounded m-2 p-2 \
            border-solid border-2 border-gray-900 ${
              verified ? "btn-transition cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={() => (verified ? signInPopUp(option.provider) : null)}
          />
        )
      })}
    </div>
  )
}

// * Email sign up form
function EmailSignUp({ verified, setVerified }) {
  const [email, setEmail] = useState(undefined)

  const validateUser = useCallback(
    debounce(async (email) => {
      const inviteRef = firestore
        .collectionGroup("invites")
        .where("email", "==", email)
        .limit(1)

      const userRef = firestore.collection("users").where("email", "==", email).limit(1)

      const verified = Promise.all([inviteRef.get(), userRef.get()]).then((values) => {
        const isInvited = !(values?.[0].empty ?? false)
        const isUser = !(values[1].empty ?? false)
        setVerified(isUser || isInvited)
        if (!(isUser || isInvited)) {
          throw "nope"
        }
      })

      toast.promise(verified, {
        loading: "Checking...",
        success: "Hey you have been invited!",
        error:
          "Sorry this is a pre-Alpha (version 0.0) limited release. \
          You have to be invited 😞.",
        // TODO buttons here to ask for an invite?
      })
    }, 250),
    []
  )

  // Step 1 - Verify Invite
  useEffect(() => {
    if (email) {
      validateUser(email)
    }
  }, [email])

  const emailSignInHandler = (email) => {
    auth
      .sendSignInLinkToEmail(email, {
        url: `http://localhost:3000/enter?email?${email}`,
        handleCodeInApp: true,
      })
      .then(() => {
        toast(
          "👋 Thanks for signing up! Please verify your email address and \
            we will see you very soon!"
        )
      })
      .catch((error) => {
        let errorCode = error.code
        let errorMessage = error.message
      })

    if (auth.isSignInWithEmailLink(window.location.href)) {
      if (!email) {
        email = window.prompt("Please provide your email for confirmation")
      }
      auth
        .signInWithEmailLink(email, window.location.href)
        .then((result) => {
          console.log(result.user.uid)
          console.log(result.user.displayName)
        })
        .catch((error) => {})

      // ! The following allows links to another verification type
      // let credential = credentialWithLink(email, window.location.href);

      // // Link the credential to the current user.
      // auth.currentUser
      //   .linkWithCredential(credential)
      //   .then((usercred) => {
      //     // The provider is now successfully linked.
      //     // The phone user can now sign in with their phone number or email.
      //   })
      //   .catch((error) => {
      //     // Some error occurred.
      //   });
    }
  }

  return (
    <form onSubmit={() => emailSignInHandler(email)}>
      <div className="flex flex-none w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-300 rounded appearance-none max-h-14 focus:outline-none focus:bg-gray-50 focus:border-gray-500">
        <FiMail className="w-8 h-full mr-2 text-sm text-gray-400 align-middle bg-gray-100 sm:text-base pt-0.5" />
        <input
          autoFocus
          className="flex flex-grow w-2/3 -mt-1 bg-gray-100 border-none appearance-none sm:w-full focus:outline-none focus:ring-0"
          type="email"
          placeholder="warren@buffet.com"
          onChange={(e) => {
            validateEmail(e.target.value)
              ? setEmail(e.target.value)
              : setEmail(undefined)
          }}
        />
        <div
          className={`flex flex-none bg-gray-100 text-sm sm:text-tiny ${
            validateEmail(email) && verified
              ? "text-green-400 btn-transition"
              : "text-red-400"
          } p-0.5 align-middle`}
          onKeyDown={(e) => handleEnterKeyDown(e, () => emailSignInHandler(email))}
        >
          {validateEmail(email) && verified ? (
            <FiCheck className="w-6 h-6" onClick={() => emailSignInHandler(email)} />
          ) : (
            <FiX className="w-6 h-6" />
          )}
        </div>
      </div>
      <button
        type="submit"
        className={`${
          verified ? "btn-transition cursor-pointer" : "cursor-not-allowed"
        } rounded bg-brand hover:bg-brand active:bg-brand-dark w-full \
        text-white my-4 py-3 px-4 leading-tight font-bold`}
        onClick={() => emailSignInHandler(email)}
      >
        Sign in
      </button>
    </form>
  )
}
