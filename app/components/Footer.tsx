import { UserContext } from "@lib/context"
import React, { useContext } from "react"
import {
  HiOutlineAnnotation,
  HiOutlineGlobe,
  HiOutlineHome,
  HiOutlineSearch,
} from "react-icons/hi"
import { useRouter } from "next/router"

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
      text: "Home",
      icon: HiOutlineHome,
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
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-between bg-gray-100 font-poppins text-tiny text-brand-dark">
      {links.map((link) => {
        return (
          <a
            className={`block w-full px-3 py-3 text-xs text-center ${
              link.isActive ? "font-extrabold" : ""
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
