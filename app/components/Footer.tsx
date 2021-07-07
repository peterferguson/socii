import { UserContext } from "@lib/context"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import {
  HiOutlineAnnotation,
  HiOutlineCog,
  HiOutlineGlobe,
  HiOutlineHome,
  HiOutlineSearch,
  HiOutlineUserGroup,
} from "react-icons/hi"

type FooterProps = {
  // eslint-disable-next-line no-unused-vars
  setShowSearchCard: (_: boolean) => void
  showSearchCard: boolean
}

export default function Footer({ showSearchCard, setShowSearchCard }: FooterProps) {
  const router = useRouter()
  const { user, username } = useContext(UserContext)

  const links = [
    {
      text: !user ? "Home" : "Groups",
      icon: !user ? HiOutlineHome : HiOutlineUserGroup,
      onClick: () => router.push(!user ? "/" : `/user/${username}`),
      isActive: !router.asPath.slice(1) || router.asPath.includes("user"),
    },
    {
      text: "Stocks",
      icon: HiOutlineGlobe,
      onClick: () => router.push("/stocks"),
      isActive: router.asPath.includes("stocks"),
    },
    {
      text: "Search",
      icon: HiOutlineSearch,
      onClick: () => setShowSearchCard(!showSearchCard),
      isActive: showSearchCard,
    },
    {
      text: "Chat",
      icon: HiOutlineAnnotation,
      onClick: () => router.push("/chat"),
      isActive: router.asPath.includes("chat"),
    },
    {
      text: "Settings",
      icon: HiOutlineCog,
      onClick: () => router.push("/settings"),
      isActive: router.asPath.includes("settings"),
    },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-between bg-white font-primary text-tiny text-brand-dark">
      {links.map((link) => {
        return (
          <a
            className={`block w-full px-3 py-3 text-xs text-center ${
              link.isActive
                ? "font-extrabold border-t-4 border-brand bg-gradient-to-t from-white to-brand-light dark:from-gray-700 dark:to-gray-800"
                : ""
            } transition duration-300`}
            key={`${link.text}-key`}
            onClick={link.onClick}
          >
            <link.icon className="w-6 h-6 mx-auto mb-1" />
            {link.text}
          </a>
        )
      })}
    </nav>
  )
}
