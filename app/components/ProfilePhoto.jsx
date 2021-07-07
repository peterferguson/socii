import Image from "next/image"
import React, { useContext } from "react"
import Router from "next/router"
import { UserContext } from "@lib/context"

export function ProfilePhoto() {
  // TODO: Add a transition to the logo -> logout
  const { user, username } = useContext(UserContext)
  return (
    <div className="relative flex items-center justify-end w-1/4 ml-5 mr-1 sm:mr-0 sm:right-auto">
      {user ? (
        <Image
          src={user?.photoURL || ""}
          alt="profile picture"
          className="object-cover w-10 h-10 mx-auto rounded-full cursor-pointer"
          onClick={() => Router.push(`user/${username}`)}
          height={40}
          width={40}
        />
      ) : (
        <div className="animate-ping"></div>
      )}
    </div>
  )
}
