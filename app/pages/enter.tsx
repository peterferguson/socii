import ClientOnly from "@components/ClientOnly"
import { EnterCard } from "@components/EnterCard"
import { WelcomeSplash } from "@components/WelcomeSplash"
import { useHasMounted } from "@hooks"
import { loginRedirect } from "@utils/loginRedirect"
import { useAuth } from "hooks/useAuth"
import React, { useEffect, useRef, useState } from "react"
import { NotInvitedDynamic } from "@components/NotInvited"
import UnauthenticatedOnly from "@components/UnauthenticatedOnly/UnauthenticatedOnly"

// ? Should we REQUIRE that the user login with email
// TODO: Implement account linking
// TODO: Implement a route for invitees which has the invited email so we can bypass the auth verification & attach the email to whatever auth user is provided
// TODO: Implement Apple login on iOS devices

const Enter = () => {
  const { user, loading, username, userGroups, signinWithGoogle, signout } = useAuth()
  const hasMounted = useHasMounted()
  const email = useRef(user?.email)
  const [forcedSignout, setForcedSignout] = useState(false)

  useEffect(() => {
    if (user?.uid && !forcedSignout) {
      if (user?.invited || username)
        loginRedirect(user?.displayName, username, userGroups)
      else setForcedSignout(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid])

  useEffect(() => {
    if (!loading && forcedSignout) signout("/", false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedSignout, loading])

  return (
    <UnauthenticatedOnly>
      <main className="h-full bg-brand-light">
        <div className="relative flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 bg-black/10" />
          <div className="relative w-full h-full max-w-md p-40 shadow-lg -bottom-1 max-h-lg space-y-8 bg-gradient-to-tr from-brand to-brand-teal transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl" />
          <ClientOnly>
            {hasMounted ? (
              user ? (
                user.invited || username ? (
                  <WelcomeSplash />
                ) : (
                  <NotInvitedDynamic email={email.current} />
                )
              ) : forcedSignout ? (
                <NotInvitedDynamic email={email.current} />
              ) : (
                <EnterCard signinWith={signinWithGoogle} />
              )
            ) : null}
          </ClientOnly>
        </div>
      </main>
    </UnauthenticatedOnly>
  )
}

export default Enter
