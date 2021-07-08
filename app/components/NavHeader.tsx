import Logo from "@components/Logo"
import { signOut } from "@lib/firebase"
import Router from "next/router"
import React from "react"
import { HiOutlineChevronDown, HiOutlineMail } from "react-icons/hi"
import { VscSignOut } from "react-icons/vsc"
import { useMediaQuery } from "react-responsive"
import HeaderButton from "./HeaderButton"
import HeaderDropdownButton from "./HeaderDropdownButton"
import { ProfilePhoto } from "./ProfilePhoto"
import { Searchbar } from "./Searchbar"

const dropdownItems = [
  {
    name: "Log Out",
    onClick: () => signOut(Router),
    notificationCount: 0,
    leftIcon: () => <VscSignOut className="w-6 h-6" />,
  },
]

interface INavHeader {
  setShowSearchCard: React.Dispatch<React.SetStateAction<Boolean>>
  showChat: boolean
  setShowChat: React.Dispatch<React.SetStateAction<Boolean>>
}

export default function NavHeader({
  setShowSearchCard,
  showChat,
  setShowChat,
}: INavHeader) {
  const is1Col = !useMediaQuery({ minWidth: 640 })
  return (
    <header className="sticky z-40 items-center w-full h-16 bg-white shadow-lg top-2 left-8 dark:bg-gray-700 rounded-2xl">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          {is1Col && <Logo className="text-2xl" />}
          <Searchbar setShowSearchCard={setShowSearchCard} />
          <div className="flex justify-end w-1/4 space-x-1 sm:space-x-2">
            {!is1Col && <ProfilePhoto />}
            <HeaderButton
              name="Messages"
              icon={() => <HiOutlineMail className="w-6 h-6" />}
              onClick={() => setShowChat(!showChat)}
              hasNotifications={true}
            />
            <HeaderDropdownButton
              name="Settings Dropdown"
              icon={() => <HiOutlineChevronDown className="w-6 h-6" />}
              items={dropdownItems}
            />
          </div>
        </div>
      </div>
    </header>
  )
}