import { ClientOnly, Logo } from "@components"
import { useHasMounted } from "@hooks"
import { useAuth } from "@hooks/useAuth"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
const Dropdown = dynamic(() => import("components/Dropdown"))

export default function Navigation({ showOptions }) {
  const { user, loading } = useAuth()
  const username = user ? user.username : ""
  const router = useRouter()
  const hasMounted = useHasMounted()

  useEffect(() => {
    console.log("nav ", username)
  }, [username])

  return (
    <div className="absolute top-0 z-50 flex flex-row w-full mx-auto bg-transparent h-[72px]">
      <div className="flex items-center justify-center mx-auto">
        <Logo className="text-4xl" />
      </div>
      <div className="flex-grow" />
      <ClientOnly>
        {hasMounted
          ? showOptions &&
            (username && !loading ? (
              <Dropdown />
            ) : (
              <button
                className="flex-none btn btn-transition"
                onClick={() => router.push("/enter")}
              >
                Login
              </button>
            ))
          : null}
      </ClientOnly>
    </div>
  )
}
