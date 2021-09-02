import { Logo } from "@components"
import { useAuth } from "@hooks/useAuth"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React from "react"
const Dropdown = dynamic(() => import("components/Dropdown"))

export default function Navigation({ showOptions }) {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <div className="absolute top-0 z-50 flex flex-row w-full mx-auto bg-transparent h-[72px]">
      <div className="flex items-center justify-center mx-auto">
        <Logo className="text-4xl" />
      </div>
      <div className="flex-grow" />
      {showOptions &&
        (user ? (
          <Dropdown />
        ) : (
          <button
            className="flex-none btn btn-transition"
            onClick={() => router.push("/enter")}
          >
            Login
          </button>
        ))}
    </div>
  )
}
