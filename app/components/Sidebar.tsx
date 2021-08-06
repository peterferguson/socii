import Logo from "@components/Logo"
import Socii from "@components/SociiSVG"
import { useAuth } from "@hooks/useAuth"
import Link from "next/link"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import { FaBitcoin, FaGlobeEurope } from "react-icons/fa"
import {
  HiOutlineAtSymbol,
  HiOutlineChartPie,
  HiOutlineChat,
  HiOutlineChevronRight,
  HiOutlineCog,
  HiOutlineUserGroup,
} from "react-icons/hi"
import { useMediaQuery } from "react-responsive"

// - https://www.tailwind-kit.com/components/sidebar
export default function Sidebar() {
  // TODO: Stateful selection of the nav item based on the route
  // - For now this is mocked with a simple enumeration of the list
  const router = useRouter()
  const { username } = useAuth()
  const is2Col = !useMediaQuery({ minWidth: 1024 })

  return (
    <div className="sticky hidden w-20 h-screen mx-1 shadow-lg top-2 left-2 sm:block lg:w-52">
      <div className="h-full bg-white rounded-2xl dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6 mx-auto">
          {!is2Col ? <Logo className="text-2xl" /> : <Socii className="text-4xl" />}
        </div>
        <nav className="mt-6">
          {navItems(router, username).map((item) => (
            <Link href={item.href} key={`${item.name}-selector`}>
              <a className={`${item.isActive ? "nav-btn-active" : "nav-btn"}`}>
                <item.icon className="mx-auto text-xl lg:mx-0" />
                <span className="hidden mx-4 text-sm font-normal lg:inline-flex">
                  {item.name}
                </span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

const navItems = (router: NextRouter, username: string) => [
  {
    name: "Stocks",
    description: "Search our stock universe",
    href: "/stocks",
    icon: ({ className }) => <FaGlobeEurope className={`-mb-1 ${className}`} />,
    isActive: router.asPath.includes("stocks"),
  },
  {
    name: "Crypto",
    description: "Search our crypto universe",
    href: "/crypto",
    icon: ({ className }) => <FaBitcoin className={`-mb-1 ${className}`} />,
    disabled: true,
    isActive: router.asPath.includes("crypto"),
  },
  {
    name: "Portfolio",
    description: "Keep track of your growth",
    href: `/user/${username}/portfolio`,
    icon: HiOutlineChartPie,
    isActive: router.asPath.includes("portfolio"),
  },
  {
    name: "Chat",
    description: "Chat with friends about investments!",
    href: "/chat",
    icon: ({ className }) => <HiOutlineChat className={`-mb-1 ${className}`} />,
    isActive: router.asPath.includes("chat"),
  },
  {
    name: "Groups",
    description: "View all of your Groups",
    href: `/user/${username}`,
    icon: HiOutlineUserGroup,
    rightIcon: HiOutlineChevronRight,
    disabled: true,
    isActive: router.asPath === `/user/${username}`,
    // onClick: () => setOpenSettings(!openSettings),
  },
  // {
  //   name: "Invites",
  //   description: "Invite your friends to the alpha",
  //   href: "/user/invites",
  //   icon: HiOutlineAtSymbol,
  //   isActive: router.asPath.includes("invites"),
  // },
  {
    name: "Settings",
    description: "Adjust your settings",
    href: "/settings",
    icon: HiOutlineCog,
    rightIcon: HiOutlineChevronRight,
    disabled: true,
    isActive: router.asPath.includes("settings"),
  },
]
