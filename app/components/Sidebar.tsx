import Logo from "@components/Logo"
import React from "react"
import { FaBitcoin, FaGlobeEurope } from "react-icons/fa"
import {
  HiOutlineAtSymbol,
  HiOutlineChartPie,
  HiOutlineChat,
  HiOutlineChevronRight,
  HiOutlineCog,
} from "react-icons/hi"

const navItems = [
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
    name: "Portfolio",
    description: "Keep track of your growth",
    href: `/user/portfolio`,
    icon: HiOutlineChartPie,
  },
  {
    name: "Chat",
    description: "Chat with friends about investments!",
    href: "/chat",
    icon: ({ className }) => <HiOutlineChat className={`-mb-1 ${className}`} />,
  },
  // {
  //   name: "Groups",
  //   description: "View all of your Groups",
  //   href: `/user/${username}`,
  //   icon: HiOutlineUserGroup,
  //   rightIcon: HiOutlineChevronRight,
  //   disabled: true,
  //   // onClick: () => setOpenSettings(!openSettings),
  // },
  {
    name: "Invites",
    description: "Invite your friends to the alpha",
    href: "/user/invites",
    icon: HiOutlineAtSymbol,
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

// - https://www.tailwind-kit.com/components/sidebar
export default function Sidebar() {
  // TODO: Stateful selection of the nav item based on the route
  // - For now this is mocked with a simple enumeration of the list

  return (
    <div className="relative hidden w-20 h-screen my-4 ml-4 shadow-lg md:block lg:w-80">
      <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6">
          <Logo className="text-2xl" />
        </div>
        <nav className="mt-6">
          <div>
            {navItems.map((item, i) => (
              <a
                className={`flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 ${
                  i === 0
                    ? "text-brand-cyan-vivid border-r-4 border-brand bg-gradient-to-r from-white to-brand-natural-light dark:from-gray-700 dark:to-gray-800"
                    : "text-gray-500 dark:text-gray-200 hover:text-brand-cyan"
                }`}
                href="#"
                key={`${item.name}-selector`}
              >
                <item.icon className="mx-auto text-xl lg:mx-0" />
                <span className="hidden mx-4 text-sm font-normal lg:inline-flex">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
