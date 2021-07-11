import Logo from "@components/Logo"
import MacSearchKey from "@components/SearchKey"
import { userContext } from "@lib/context"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { HiOutlineSearch } from "react-icons/hi"
const Dropdown = dynamic(() => import("components/Dropdown"))

export default function Navigation(props) {
  const { user } = useContext(userContext)
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 flex flex-row w-full mx-auto bg-gray-50">
      <div className="p-4">
        <Logo className="text-4xl" />
      </div>
      <div className="flex-grow"></div>
      {user ? (
        <Dropdown />
      ) : (
        <button
          className="flex-none btn btn-transition"
          onClick={() => router.push("/enter")}
        >
          Login
        </button>
      )}
    </div>
  )
}

function SearchBar({ setShowSearchCard }) {
  return (
    <div className="flex items-center justify-between flex-1 px-4 h-18 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
      <button
        type="button"
        className="flex items-center w-full py-2 font-medium group leading-6 space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
        onClick={() => setShowSearchCard(true)}
      >
        <HiOutlineSearch className="w-6 h-6 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
        <span className="text-gray-400">
          Search<span className="hidden text-gray-400 sm:inline">: TSLA</span>
        </span>
        <MacSearchKey />
      </button>
    </div>
  )
}
