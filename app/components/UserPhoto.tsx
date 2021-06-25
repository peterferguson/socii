import { firestore } from "@lib/firebase"
import { getRandomTailwindColor } from "@utils/helper"
import React, { useEffect, useRef } from "react"

type UserPhotoProps = {
  username?: string
  className?: string
  photoURL?: string
}

export default function UserPhoto({
  username,
  className = "w-12 h-12 m-4 rounded-full",
  photoURL = "",
}: UserPhotoProps) {
  const photo = useRef<string>(photoURL)

  useEffect(() => {
    const getPhotoURL: () => Promise<string> = async () => {
      const query = firestore
        .collection("users")
        .where("username", "==", username)
        .limit(1)
      return (await query.get()).docs[0].data()?.photoURL
    }
    if (!photoURL && username) getPhotoURL().then((r) => (photo.current = r))
  }, [photoURL, username])

  return !photo.current ? (
    <div
      className={`${className} flex items-center justify-center bg-${getRandomTailwindColor()} m-auto font-poppins`}
    >
      {username?.[0]}
    </div>
  ) : (
    <img src={photo.current} className={`${className}`} />
  )
}
