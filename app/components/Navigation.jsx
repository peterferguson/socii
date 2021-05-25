import { UserContext } from "@lib/context"
import Logo from "@components/Logo"
import { userFirstName, signOut } from "@lib/firebase"
import { FaGlobeEurope, FaBitcoin } from "react-icons/lib/FA"
import { VscSignOut } from "react-icons/lib/vsc"
import {
  HiOutlineUserGroup,
  HiOutlineChat,
  HiOutlineCog,
  HiMenu,
  HiOutlineAtSymbol,
  HiOutlineSearch,
  HiOutlineChevronRight,
  HiOutlineChartPie,
} from "react-icons/lib/HI"
import { Transition, Popover } from "@headlessui/react"

import React, { useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"
export default function Navigation(props) {
  const { username } = useContext(UserContext)
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 flex flex-none w-full mx-auto max-w-8xl bg-gray-50">
      <div className="p-4">
        <Logo className="text-4xl" />
      </div>
      <SearchBar {...props} />
      {username ? (
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
    <div className="flex items-center justify-between flex-1 px-4 h-18 \ sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
      <button
        type="button"
        className="flex items-center w-full py-2 font-medium group leading-6 space-x-3 sm:space-x-4 \ hover:text-gray-600 transition-colors duration-200 focus:outline-none"
        onClick={() => setShowSearchCard(true)}
      >
        <HiOutlineSearch className="w-6 h-6 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
        <span className="text-gray-400">
          Search<span className="hidden text-gray-400 sm:inline">: TSLA</span>
        </span>
        <span className="hidden text-sm text-gray-400 border border-gray-300 sm:block leading-5 py-0.5 px-1.5 rounded-md">
          <span className="sr-only">Press </span>
          <kbd className="font-sans">
            <abbr title="Command" className="no-underline">
              ⌘
            </abbr>
          </kbd>
          <span className="sr-only"> and </span>
          <kbd className="font-sans">K</kbd>
          <span className="sr-only"> to search</span>
        </span>
      </button>
    </div>
  )
}

function Dropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // const [openSettings, setOpenSettings] = useState(false);
  const { user, username } = useContext(UserContext)
  const router = useRouter()

  // TODO: Add bitcoin svg to navigate to crypto page
  const dropdownItems = [
    {
      name: "Invites",
      description: "Invite your friends to the alpha",
      href: "/user/invites",
      icon: HiOutlineAtSymbol,
    },
    {
      name: "Stocks",
      description: "Search the our stock universe",
      href: "/stock",
      icon: ({ className }) => <FaGlobeEurope className={`-mb-1 ${className}`} />,
    },
    {
      name: "Crypto",
      description: "Search the our crypto universe",
      href: "/crypto",
      icon: ({ className }) => <FaBitcoin className={`-mb-1 ${className}`} />,
      disabled: true,
    },
    {
      name: "Porfolio",
      description: "Keep track of your growth",
      href: `/user/${username}`,
      icon: HiOutlineChartPie,
    },
    {
      name: "Chat",
      description: "Chat with friends about investments!",
      href: "/chat",
      icon: ({ className }) => <HiOutlineChat className={`-mb-1 ${className}`} />,
    },
    {
      name: "Groups",
      description: "View all of your Groups",
      href: "",
      icon: HiOutlineUserGroup,
      rightIcon: HiOutlineChevronRight,
      disabled: true,
      // onClick: () => setOpenSettings(!openSettings),
    },
    {
      name: "Settings",
      description: "Adjust your settings",
      href: "",
      icon: HiOutlineCog,
      rightIcon: HiOutlineChevronRight,
      disabled: true,
    },
  ]

  const grayedDropdownItems = [
    {
      name: "Sign Out",
      description: "",
      href: "",
      icon: VscSignOut,
      onClick: () => signOut(router, userFirstName(user)),
    },
  ]

  return (
    <Popover className="relative z-50 inline-block p-4 text-left">
      {({ open }) => (
        <>
          <Popover.Button className="items-center justify-center w-full h-full focus:outline-none">
            <HiMenu className=" w-6 h-6 text-brand-light" />
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-10 px-6 mt-20 w-max -top-0.5 right-2 sm:px-0 lg:max-w-3xl"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white grid gap-8 p-7">
                  {dropdownItems.map((item) => (
                    <DropdownItem key={`key-${item.name}`} item={item} />
                  ))}
                </div>
                <div className="p-4 bg-gray-50">
                  {grayedDropdownItems.map((item) => (
                    <DropdownItem key={`key-${item.name}`} item={item} open={open} />
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

const closePopover = (open) => (open = !open)

function DropdownItem({ item }) {
  const onClickHandler = () => {
    if ("onClick" in item) item?.onClick()
    return closePopover(open)
  }
  return (
    <>
      <Link href={item.href}>
        <a
          key={item.name}
          onClick={() => onClickHandler()}
          className="z-0 flex items-center p-2 -m-3 rounded-lg transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none"
        >
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
            <item.icon className={"w-6 h-6 mr-2 text-brand"} aria-hidden="true" />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          {item.rightIcon && (
            <item.rightIcon
              className="flex-none w-6 h-6 text-brand-light"
              aria-hidden="true"
            />
          )}
        </a>
      </Link>
      {/* {item?.disabled && (
        <>
          <div className="z-10 h-12 -mt-20 font-extrabold text-right uppercase w-30 backdrop-filter backdrop-blur-sm font-poppin text-opacity-40">
            Coming soon{" "}
          </div>
        </>
      )} */}
    </>
  )
}
