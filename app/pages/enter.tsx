import Logo from "@components/Logo"
import { getUsernameWithEmail } from "@lib/firebase/client/db/getUsernameWithEmail"
import FirebaseUser from "@models/FirebaseUser"
import { loginRedirect } from "@utils/loginRedirect"
import { useAuth } from "hooks/useAuth"
import React, { useEffect, useRef, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { isInvited } from "../lib/firebase/client/db/isInvited"
import { NotInvitedDynamic } from "../components/NotInvited"
import { useRouter } from "next/router"
import { WelcomeSplash } from "@components/WelcomeSplash"

// ? Should we REQUIRE that the user login with email
// TODO: Implement account linking
// TODO: Implement a route for invitees which has the invited email so we can bypass the auth verification & attach the email to whatever auth user is provided
// TODO: Implement Apple login on iOS devices

export default function Enter() {
  const { user, username, userGroups, signinWithGoogle, signout } = useAuth()
  const [verified, setVerified] = useState(null)
  const email = useRef(null)
  const router = useRouter()

  useEffect(
    () => {
      if (user) {
        email.current = user.email
        isVerified(user).then((r) => setVerified(r))
        verified && loginRedirect(user.displayName, username, userGroups)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )
  useEffect(() => {
    verified === false &&
      setTimeout(() => {
        setVerified(null)
        signout("", false)
      }, 20000)
  }, [signout, verified])

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      !verified && signout("", false)
    })
  }, [verified, router, username, signout])

  return (
    <main className="h-full bg-brand-light">
      <div className="relative flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-black/10" /> 
        <div className="relative w-full h-full max-w-md p-40 shadow-lg -bottom-1 max-h-lg space-y-8 bg-gradient-to-tr from-brand to-[#3fba] transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl" />
        {verified == null ? (
            <EnterCard signinWith={signinWithGoogle} />
          ):(
            verified === true ? (
              <WelcomeSplash/>
              ):(
              <NotInvitedDynamic email={email.current} />)
            )
        }
      </div>
    </main>
  )
}

const EnterCard = ({ signinWith }) => (
  <div className="absolute z-10 w-full max-w-md p-10 bg-white space-y-8 rounded-xl">
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="mt-6 text-4xl font-bold text-gray-900 font-primary">Welcome to</h2>
      <Logo className="text-5xl" />
      <p className="mt-2 text-base text-gray-600 font-primary">
        Please link your account with one of the following providers:
      </p>
    </div>
    <div className="flex flex-col items-center justify-center mx-auto space-y-6">
      <span
        className="flex items-center justify-center w-full mx-auto bg-white rounded-full cursor-pointer h-11 "
        onClick={() => signinWith("")}
      >
        <button className="w-8/12 p-1 text-xs font-thin text-black bg-white border border-gray-200 rounded-full sm:text-sm grid grid-cols-7 place-items-center h-11 hover:shadow-lg transition ease-in duration-300">
          <FcGoogle className="w-4 h-4 ml-1 text-white sm:w-8 sm:h-8" />
          <span className="col-span-4 col-start-3">Connect with Google</span>
        </button>
      </span>
    </div>
  </div>
)

const isVerified = async (user: FirebaseUser) => {
  const invited = await isInvited(user.email)
  const username = await getUsernameWithEmail(user.email)
  return invited || !!username
}
