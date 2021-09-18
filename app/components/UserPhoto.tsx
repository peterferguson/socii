import { useAuth } from "@hooks"
import { getInitials } from "@utils/getInitials"
import { getRandomImage } from "@utils/getRandomImage"
import { tw } from "@utils/tw"
import Image from "next/image"
import React from "react"

interface IUserPhotoProps {
  className?: string
  width?: string
  height?: string
}

const DEFAULT_HEIGHT_AND_WIDTH = "32px"

const UserPhoto = ({ height, width, className }: IUserPhotoProps) => {
  const { user } = useAuth()

  return !user ? (
    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
  ) : (
    <Image
      src={user?.photoUrl || getRandomImage(getInitials(user?.displayName))}
      className={tw("rounded-full", className)}
      height={height || DEFAULT_HEIGHT_AND_WIDTH}
      width={width || DEFAULT_HEIGHT_AND_WIDTH}
    />
  )
}

export default UserPhoto
