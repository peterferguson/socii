import { SlashSearchKey } from "@components/SearchKey"
import { signOut, userFirstName } from "@lib/firebase"
import { useOnClickOutside } from "@lib/hooks"
import { useMediaQuery } from "react-responsive"
import Logo from "@components/Logo"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { VscSignOut } from "react-icons/vsc"

function Searchbar({ setShowSearchCard }) {
  return (
    <div className="container relative left-0 z-50 flex w-3/4 h-full">
      <div
        className="relative flex items-center w-full h-full lg:w-64 group"
        onClick={() => setShowSearchCard(true)}
      >
        <HiOutlineSearch className="relative w-5 h-5 text-gray-400 left-8" />
        <input
          type="text"
          className="block w-full pl-10 pr-4 leading-normal text-gray-400 bg-gray-100 border-none py-1.5 rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand ring-opacity-90 dark:bg-gray-800"
          placeholder="Search"
        />
        <div className="absolute z-50 flex items-center justify-center w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
          <SlashSearchKey />
        </div>
      </div>
    </div>
  )
}

function HeaderProfilePhoto({ user }) {
  const [clicked, setClicked] = useState(false)
  const router = useRouter()
  const ref = useRef(null)

  const handleClickOutside = () => setClicked(false)

  const handleClickInside = () => signOut(router, userFirstName(user))

  useOnClickOutside(ref, handleClickOutside)

  // TODO: Add a transition to the logo -> logout
  return clicked ? (
    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
      <div
        ref={ref}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer"
        onClick={handleClickInside}
      >
        <VscSignOut className="w-6 h-6 m-auto text-brand-dark" />
      </div>
    </div>
  ) : (
    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
      {user ? (
        <Image
          src={user?.photoURL || ""}
          alt="profile picture"
          className="object-cover w-10 h-10 mx-auto rounded-full cursor-pointer"
          onClick={() => setClicked(true)}
          height={40}
          width={40}
        />
      ) : (
        <div className="animate-ping"></div>
      )}
    </div>
  )
}

export default function NavHeader({ user, setShowSearchCard }) {
  const is1Col = !useMediaQuery({ minWidth: 640 })
  return (
    <header className="sticky z-40 items-center w-full h-16 bg-white shadow-lg top-2 left-8 dark:bg-gray-700 rounded-2xl">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          {is1Col && <Logo className="text-2xl" />}
          <Searchbar setShowSearchCard={setShowSearchCard} />
          <HeaderProfilePhoto user={user} />
        </div>
      </div>
    </header>
  )
}
