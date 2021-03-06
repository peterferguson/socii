import { useAuth } from "@hooks/useAuth"
import Link from "next/link"
import React from "react"

interface AuthCheckProps {
  children: JSX.Element
  fallback?: JSX.Element
}

export default function AuthCheck({ children, fallback }: AuthCheckProps) {
  const { user } = useAuth()
  const username = user ? user.username : ""

  return username
    ? children
    : fallback || (
        <div className="flex items-center justify-center w-full h-full mx-auto">
          <Link href="/enter">
            <a className="text-3xl text-center underline text-brand font-primary align-center">
              Please sign in to view this content
            </a>
          </Link>
        </div>
      )
}
