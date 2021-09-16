import Logo from "@components/Logo"
import Socii from "@components/SociiSVG"
import { useAuth } from "@hooks/useAuth"
import { useDarkMode } from "@hooks/useDarkMode"
import { tw } from "@utils/tw"
import Link from "next/link"
import { NextRouter, useRouter } from "next/router"
import React, { useMemo } from "react"
import { FaBitcoin, FaGlobeEurope } from "react-icons/fa"
import {
  HiOutlineChartPie,
  HiOutlineChat,
  HiOutlineChevronRight,
  HiOutlineUserGroup,
} from "react-icons/hi"
import { useMediaQuery } from "react-responsive"

// - https://www.tailwind-kit.com/components/sidebar
const Sidebar = () => {
  // TODO: Stateful selection of the nav item based on the route
  // - For now this is mocked with a simple enumeration of the list
  const { user } = useAuth()
  const username = user ? user.username : ""
  const router = useRouter()
  const is2Col = !useMediaQuery({ minWidth: 1024 })
  // const [, toggleTheme] = useDarkMode()

  const items = useMemo(() => navItems(router, username), [router, username])

  const siblingActive = items.map((_, index) => {
    if ((items.at(index - 1) || {})?.isActive) return "before"
    if ((items.at(index + 1) || {})?.isActive) return "after"
    return false
  })

  console.log(siblingActive)

  return (
    <div className="hidden h-full rounded-t-2xl sm:block ">
      <div className="flex flex-col items-center justify-between h-full pt-4 bg-white dark:bg-gray-700">
        <div className="w-full">
          <div className="flex items-center justify-center font-secondary mt-4">
            {!is2Col ? <Logo className="text-4xl" /> : <Socii className="text-4xl" />}
          </div>
          <nav className="w-full pl-0 mt-6 lg:pl-2 lgr:pl-6">
            {items.map((item, index) => {
              return index === 0 || index + 1 === items.length ? (
                <div
                  className={tw(
                    !item.isActive
                      ? "bg-gray-50 w-full h-full cursor-pointer last:cursor-default"
                      : ""
                  )}
                >
                  <div
                    className={tw(
                      "flex h-4 transition-colors duration-200",
                      item.isActive
                        ? "bg-gray-50 rounded-l-2xl text-brand-cyan"
                        : "bg-white text-brand-shade-darkest hover:text-brand-cyan"
                    )}
                    style={
                      siblingActive[index] == "before"
                        ? { borderTopRightRadius: "1.5rem" }
                        : siblingActive[index] == "after"
                        ? { borderBottomRightRadius: "1.5rem" }
                        : {}
                    }
                  >
                    {item?.icon && <item.icon className="w-5 h-5 lg:mx-0" />}
                    <span className="hidden mx-4 text-sm font-primary lg:inline-flex">
                      {item.name}
                    </span>
                  </div>
                </div>
              ) : (
                <Link href={item?.href || ""} key={`${item.name}-selector`}>
                  <div
                    className={tw(
                      !item.isActive
                        ? "bg-gray-50 w-full h-full cursor-pointer last:cursor-default"
                        : ""
                    )}
                  >
                    <div
                      className={tw(
                        "flex h-12 lg:h-16 w-full justify-center lgr:justify-start",
                        "items-center pl-0 lg:pl-4 py-4 transition-colors duration-200",
                        item.isActive
                          ? "bg-gray-50 rounded-l-2xl text-brand-cyan"
                          : "bg-white text-brand-shade-darkest hover:text-brand-cyan"
                      )}
                      style={
                        siblingActive[index] == "before"
                          ? { borderTopRightRadius: "1.5rem" }
                          : siblingActive[index] == "after"
                          ? { borderBottomRightRadius: "1.5rem" }
                          : {}
                      }
                    >
                      {item?.icon && <item.icon className="w-5 h-5 lg:mx-0" />}
                      <span className="hidden mx-4 text-sm font-primary lg:inline-flex">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
        {/* Toggle theme */}
        {/* <button className="p-4" onClick={toggleTheme}>
          toggle mode
        </button> */}
      </div>
    </div>
  )
}

export default React.memo(Sidebar)

const navItems = (router: NextRouter, username: string) => [
  {
    name: "", // - DummyForRounding
    description: "",
    href: "/",
    icon: () => null,
    isActive: null,
  },
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
    href: username ? "/user/portfolio" : "",
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
    href: "/groups",
    icon: HiOutlineUserGroup,
    rightIcon: HiOutlineChevronRight,
    disabled: true,
    isActive: router.asPath === "/groups",
    // onClick: () => setOpenSettings(!openSettings),
  },
  {
    name: "", // - DummyForRounding
    description: "",
    href: "/",
    icon: () => null,
    isActive: null,
  },
  // {
  //   name: "Invites",
  //   description: "Invite your friends to the alpha",
  //   href: "/user/invites",
  //   icon: HiOutlineAtSymbol,
  //   isActive: router.asPath.includes("invites"),
  // },
  // {
  //   name: "Settings",
  //   description: "Adjust your settings",
  //   href: "/settings",
  //   icon: HiOutlineCog,
  //   rightIcon: HiOutlineChevronRight,
  //   disabled: true,
  //   isActive: router.asPath.includes("settings"),
  // },
]
