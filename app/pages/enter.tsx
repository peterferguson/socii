import Logo from "@components/Logo"
import { loginRedirect } from "@utils/loginRedirect"
import { useAuth } from "hooks/useAuth"
import React, { useEffect } from "react"
import { FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useMediaQuery } from "react-responsive"

// ? Should we REQUIRE that the user login with email
// TODO: Add user info to users colleciton on sign up
// TODO: Implement account linking
// TODO: Implement invite system
// TODO: Implement a route for invitees which has the invited email so we can bypass the auth verification & attach the email to whatever auth user is provided
// TODO: Implement Apple login on iOS devices

export default function Enter() {
  const { user, username, userGroups, signinWithFacebook, signinWithGoogle } = useAuth()

  useEffect(
    () => user && loginRedirect(user.displayName, username, userGroups),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  // const [verified, setVerified] = useState(null)

  const is1Col = !useMediaQuery({ minWidth: 640 })

  return (
    <main className="h-full bg-brand-light">
      <div className="relative flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-black/10" />
        <div className="relative w-full h-full max-w-md p-40 shadow-lg -bottom-1 max-h-lg space-y-8 bg-gradient-to-r from-green-400/60 to-brand/60 transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl" />
        <div className="absolute z-10 w-full max-w-md p-10 bg-white space-y-8 rounded-xl">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="mt-6 text-4xl font-bold text-gray-900 font-primary">
              Welcome to
            </h2>
            <Logo className="text-5xl" />
            <p className="mt-2 text-base text-gray-600">
              Please link your account with one of the following providers:
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mx-auto space-y-6">
            <span
              className="relative flex items-center justify-center w-full mx-auto bg-white rounded-full cursor-pointer h-11 "
              onClick={() => signinWithGoogle("")}
            >
              <FcGoogle className="absolute w-5 h-5 text-white sm:w-8 sm:h-8 left-[3.75rem] sm:left-[4.25rem]" />
              <span className="flex items-center justify-center w-8/12 mx-auto text-sm font-thin text-black bg-white border border-gray-200 rounded-full h-11 hover:shadow-lg transition ease-in duration-300">
                Connect with Google
              </span>
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
