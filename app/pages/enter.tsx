import ClientOnly from "@components/ClientOnly"
import { EnterCard } from "@components/EnterCard"
import { NotInvitedDynamic } from "@components/NotInvited"
import UnauthenticatedOnly from "@components/UnauthenticatedOnly/UnauthenticatedOnly"
import { WelcomeSplash } from "@components/WelcomeSplash"
import { useHasMounted } from "@hooks"
import { loginRedirect } from "@utils/loginRedirect"
import { useAuth } from "hooks/useAuth"
import React, { useEffect, useRef } from "react"

// TODO: Implement account linking
// TODO: Implement a route for invitees which has the invited email so we can bypass the auth verification & attach the email to whatever auth user is provided
// TODO: Implement Apple login on iOS devices

const Enter = () => {
  const { user, signinWithGoogle } = useAuth()
  const hasMounted = useHasMounted()

  useEffect(() => {
    if (user?.uid && (user?.isInvited || user?.username))
      loginRedirect(user?.displayName, user?.username, user?.groups)
  }, [user?.displayName, user?.groups, user?.isInvited, user?.uid, user?.username])

  return (
    <UnauthenticatedOnly>
      <div className="h-screen bg-brand-light">
        <div className="relative flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0 bg-black/10" />
          <div className="relative w-full h-full max-w-md p-40 shadow-lg -bottom-1 max-h-lg space-y-8 bg-gradient-to-tr from-brand to-brand-teal transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl" />
          <ClientOnly>
            {hasMounted ? (
              user?.uid ? (
                user.isInvited || user?.username ? (
                  <WelcomeSplash />
                ) : (
                  <NotInvitedDynamic />
                )
              ) : (
                <EnterCard signinWith={signinWithGoogle} />
              )
            ) : null}
          </ClientOnly>
        </div>
      </div>
    </UnauthenticatedOnly>
  )
}

export default Enter
