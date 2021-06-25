import Link from "next/link"
import { UserContext } from "@lib/context"
import React, { useContext } from "react"

interface AuthCheckProps {
  children: JSX.Element
  fallback?: JSX.Element
}

export default function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { username } = useContext(UserContext)

  return username
    ? children
    : fallback || (
        <div className="flex items-center justify-center w-screen h-screen mx-auto bg-gray-50">
          <Link href="/enter">
            <a className="text-3xl text-center underline text-brand-light font-poppins align-center">
              Please sign in to view this content
            </a>
          </Link>
        </div>
      )
}
