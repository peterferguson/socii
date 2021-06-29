import { SlashSearchKey } from "@components/SearchKey"
import { useRouter } from "next/router"
import React, { useState, useRef } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { signOut, userFirstName } from "@lib/firebase"
import { VscSignOut } from "react-icons/vsc"
import { useOnClickOutside } from "@lib/hooks"

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
    <div
      ref={ref}
      className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto"
    >
      <VscSignOut onClick={handleClickInside} />
    </div>
  ) : (
    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
      <a href="#" className="relative block">
        <img
          alt="profile picture"
          src={user?.photoURL}
          className="object-cover w-10 h-10 mx-auto rounded-full"
          onClick={() => setClicked(true)}
        />
      </a>
    </div>
  )
}

export default function NavHeader({ user, setShowSearchCard }) {
  return (
    <header className="z-40 items-center w-full h-16 bg-white shadow-lg dark:bg-gray-700 rounded-2xl">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          <Searchbar setShowSearchCard={setShowSearchCard} />
          <HeaderProfilePhoto user={user} />
        </div>
      </div>
    </header>
  )
}
