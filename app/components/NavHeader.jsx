import { useMediaQuery } from "react-responsive"
import Logo from "@components/Logo"
import React from "react"
import { HiCog, HiMail } from "react-icons/hi"
import HeaderButton from "./HeaderButton"
import { HeaderProfilePhoto } from "./HeaderProfilePhoto"
import { Searchbar } from "./Searchbar"

const dropdownItems = [
  {
    name: "Messages",
    href: "#",
    notificationCount: 13,
    leftIcon: () => <HiMail className="w-6 h-6" />,
  },
]

export default function NavHeader({ user, setShowSearchCard }) {
  const is1Col = !useMediaQuery({ minWidth: 640 })
  return (
    <header className="sticky z-40 items-center w-full h-16 bg-white shadow-lg top-2 left-8 dark:bg-gray-700 rounded-2xl">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          {is1Col && <Logo className="text-2xl" />}
          <Searchbar setShowSearchCard={setShowSearchCard} />
          <HeaderProfilePhoto user={user} />
          <HeaderButton
            icon={() => <HiCog className="w-6 h-6" />}
            items={dropdownItems}
          />
        </div>
      </div>
    </header>
  )
}
