import Logo from "@components/Logo"
import Socii from "@components/SociiSVG"
import { useAuth } from "@hooks/useAuth"
import { useGroups } from "@hooks/useGroups"
import { useTradingAccount } from "@hooks/useTradingAccount"
import { getGroupData } from "@lib/firebase/client/db/getGroupData"
import { tw } from "@utils/tw"
import { group } from "console"
import Link from "next/link"
import { NextRouter, useRouter } from "next/router"
import React, { useEffect, useMemo, useState } from "react"
import { FaBitcoin, FaGlobeEurope } from "react-icons/fa"
import {
  HiOutlineCash,
  HiOutlineChartPie,
  HiOutlineChat,
  HiOutlineChevronRight,
  HiOutlineUserGroup,
} from "react-icons/hi"
import { useMediaQuery } from "react-responsive"
import InformationTag, { InformationIconTag } from "./InformationTag/InformationTag"

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
    if ((items[index - 1] || {})?.isActive) return "before"
    if ((items[index + 1] || {})?.isActive) return "after"
    return false
  })

  return (
    <div className="hidden h-full rounded-t-2xl sm:block ">
      <div className="flex flex-col items-center justify-between h-full pt-4 bg-white dark:bg-gray-700">
        <div className="w-full">
          <div className="flex items-center justify-center mt-4 font-secondary">
            {!is2Col ? <Logo className="text-4xl" /> : <Socii className="text-4xl" />}
          </div>
          <nav className="w-full pl-2 mt-6 lgr:pl-6">
            {items.map((item, index) =>
              index === 0 || index + 1 === items.length ? (
                <DummyItem isSiblingActive={siblingActive[index]} />
              ) : (
                <NavItem item={item} isSiblingActive={siblingActive[index]} />
              )
            )}
          </nav>
        </div>
        <CashAvailable />
        {/* Toggle theme */}
        {/* <button className="p-4" onClick={toggleTheme}>
          toggle mode
        </button> */}
      </div>
    </div>
  )
}

const CashAvailable = () => {
  const { account, error } = useTradingAccount()
  const is2Col = !useMediaQuery({ minWidth: 1024 })
  const groups = useGroups()
  const [totalGroupsCashBalance, setTotalGroupsCashBalance] = useState(0)

  useEffect(
    () =>
      setTotalGroupsCashBalance(
        Object.values(groups || {})?.reduce(
          (acc, { cashBalance }) => acc + cashBalance,
          0
        )
      ),
    [groups]
  )

  const cashColor =
    parseFloat(account?.cash) != 0
      ? parseFloat(account?.cash) >= totalGroupsCashBalance
        ? "green"
        : "red"
      : "red"

  // - tw jit classes text-green-600 bg-green-50 text-red-500 bg-red-300

  const CashIcon = ({ onClick }: { onClick?: () => void }) => (
    <div
      className={tw(
        "flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full lg:mx-0 lg:h-8 lg:w-8",
        `bg-${cashColor}-100`,
        `text-${cashColor}-600`
      )}
      onClick={onClick}
    >
      <HiOutlineCash className="w-6 h-6" aria-hidden="true" />
    </div>
  )

  const informationTagProps = {
    InformationModalIcon: CashIcon,
    informationTitle: "Cash Available",
    InformationText: () => (
      <div className="text-gray-600">
        When the icon is <span className="text-green-600">green</span> then have met the
        cash requirements of all your groups.
        <br />
        <br />
        When <span className="text-red-600">red</span> then you don&#39;t have enough
        cash to meet the requirements of all your groups.
        <br />
        <br />
        You can always add more cash to your account to avoid missing out on any group
        decisions.
      </div>
    ),
  }

  return (
    <div className="w-full p-4 mb-4 grid grid-cols-1 lg:grid-cols-[1fr,6fr,1fr] place-items-center">
      {is2Col ? (
        <InformationIconTag InformationIcon={CashIcon} {...informationTagProps} />
      ) : (
        <CashIcon />
      )}
      <div className="items-center justify-end hidden pl-1 font-light lg:inline-flex">
        <h3 className="text-sm text-logo-darkBg leading-4">
          ${account?.cash}
          <p className="text-gray-300 capitalize text-tiny">cash available</p>
        </h3>
      </div>
      <div className="hidden mx-auto lg:inline-flex">
        <InformationTag
          className={"h-4 w-4 text-tiniest p-2"}
          {...informationTagProps}
        />
      </div>
    </div>
  )
}

const DummyItem = ({ isSiblingActive }) => (
  <div className="w-full h-full cursor-default bg-gray-50">
    <div
      className={tw("flex h-4 transition-colors duration-200 bg-white")}
      style={
        isSiblingActive == "before"
          ? { borderTopRightRadius: "1.5rem" }
          : isSiblingActive == "after"
          ? { borderBottomRightRadius: "1.5rem" }
          : {}
      }
    />
  </div>
)

const NavItem = ({ item, isSiblingActive }) => (
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
          isSiblingActive == "before"
            ? { borderTopRightRadius: "1.5rem" }
            : isSiblingActive == "after"
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

export default React.memo(Sidebar)
