import Image from "next/image"
import Router from "next/router"
import React from "react"
import { useAuth } from "@hooks/useAuth"

export default function ProfilePhoto() {
  // TODO: Add a transition to the logo -> logout
  const { user, username } = useAuth()
  return (
    <div className="relative flex items-center justify-end w-1/4 ml-5 mr-1 sm:mr-0 sm:right-auto">
      {user?.photoURL ? (
        <Image
          src={user.photoURL}
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
