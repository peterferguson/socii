/* eslint-disable no-unused-vars */
import { Popover, Transition } from "@headlessui/react"
import { useAuth } from "@hooks/useAuth"
import Link from "next/link"
import React, { Fragment } from "react"
import { FaBitcoin, FaGlobeEurope } from "react-icons/fa"
import {
  HiMenu,
  HiOutlineChartPie,
  HiOutlineChat,
  HiOutlineChevronRight,
  HiOutlineCog,
  HiOutlineUserGroup,
} from "react-icons/hi"
import { VscSignOut } from "react-icons/vsc"

// TODO: Add bitcoin svg to navigate to crypto page
const dropdownItems = (username) => [
  {
    name: "Groups",
    description: "View all of your Groups",
    href: "/groups",
    icon: HiOutlineUserGroup,
    rightIcon: HiOutlineChevronRight,
    disabled: true,
    // onClick: () => setOpenSettings(!openSettings),
  },
  {
    name: "Stocks",
    description: "Search our stock universe",
    href: "/stocks",
    icon: ({ className }) => <FaGlobeEurope className={`-mb-1 ${className}`} />,
  },
  {
    name: "Crypto",
    description: "Search our crypto universe",
    href: "/crypto",
    icon: ({ className }) => <FaBitcoin className={`-mb-1 ${className}`} />,
    disabled: true,
  },
  {
    name: "Porfolio",
    description: "Keep track of your growth",
    href: username && "/user/portfolio",
    icon: HiOutlineChartPie,
  },
  {
    name: "Chat",
    description: "Chat with friends about investments!",
    href: "/chat",
    icon: ({ className }) => <HiOutlineChat className={`-mb-1 ${className}`} />,
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

const grayedDropdownItems = (signout) => [
  {
    name: "Sign Out",
    description: "",
    href: "",
    icon: VscSignOut,
    onClick: signout,
  },
]

export default function Dropdown() {
  const { user, signout } = useAuth()
  const username = user ? user.username : ""

  return (
    <Popover className="relative z-50 inline-block p-4 text-left">
      {({ open }) => (
        <>
          <Popover.Button className="items-center justify-center w-full h-full focus:outline-none">
            <HiMenu className=" w-6 h-6 text-brand" />
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
              className="absolute z-10 px-3 mt-20 w-max -top-0.5 right-1 sm:right-2 sm:px-0 lg:max-w-3xl"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white grid gap-8 p-7">
                  {dropdownItems(username).map((item) => (
                    <DropdownItem key={`key-${item.name}`} item={item} />
                  ))}
                </div>
                <div className="p-4 bg-gray-50">
                  {grayedDropdownItems(signout).map((item) => (
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
              className="flex-none w-6 h-6 text-brand"
              aria-hidden="true"
            />
          )}
        </a>
      </Link>
      {/* {item?.disabled && (
	      <>
		<div className="z-10 h-12 -mt-20 font-semibold text-right uppercase w-30 backdrop-filter backdrop-blur-sm font-poppin text-opacity-40">
		  Coming soon{" "}
		</div>
	      </>
	    )} */}
    </>
  )
}
