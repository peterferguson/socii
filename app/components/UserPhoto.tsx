import { useAuth } from "@hooks"
import { getRandomTailwindColor } from "@utils/getRandomTailwindColor"
import React from "react"

export default function UserPhoto({
  className = "w-6 sm:w-8 h-6 sm:h-8 m-4 rounded-full",
}) {
  const { user } = useAuth()

  return !user?.photoUrl ? (
    <div
      className={`${className} flex items-center justify-center bg-${getRandomTailwindColor()} m-auto font-primary`}
    >
      {user?.displayName?.[0]}
    </div>
  ) : (
    <img src={user?.photoUrl} className={`${className}`} />
  )
}
