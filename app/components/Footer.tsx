import { useAuth } from "@hooks/useAuth"
import FirebaseUser from "@models/FirebaseUser"
import Link from "next/link"
import { NextRouter, useRouter } from "next/router"
import React from "react"
import {
  HiOutlineAnnotation,
  HiOutlineCog,
  HiOutlineGlobe,
  HiOutlineHome,
  HiOutlineSearch,
  HiOutlineUserGroup,
} from "react-icons/hi"
import { FooterNavItem } from "./FooterNavItem"
import SociiIMG from "./SociiIMG"

const Footer = () => {
  const router = useRouter()
  const { user, username } = useAuth()

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-between bg-white space-x-2">
        {links(user, username, router).map(
          ({ text, Icon, onClick, isActive, Component }, i) => {
            const props = { text, Icon, onClick, isActive }
            return <Component key={`nav-item-${i}`} props={props} />
          }
        )}
      </nav>
    </>
  )
}

export default Footer

const links = (user: FirebaseUser, username: string, router: NextRouter) => [
  {
    text: !user ? "Home" : "Groups",
    Icon: !user ? HiOutlineHome : HiOutlineUserGroup,
    onClick: () => router.push(!user ? "/" : `/user/${username}`),
    isActive: !router.asPath.slice(1) || router.asPath.includes("user"),
    Component: ({ props }) => <FooterNavItem {...props} />,
  },
  {
    text: "Stocks",
    Icon: HiOutlineGlobe,
    onClick: () => router.push("/stocks"),
    isActive: router.asPath.includes("stocks"),
    Component: ({ props }) => <FooterNavItem {...props} />,
  },
  {
    // onClick: () => setShowSearchCard(!showSearchCard),
    isActive: router.asPath.includes("portfolio"),
    Component: ({ props }) => <FooterSearchButton {...props} username={username} />,
  },
  {
    text: "Chat",
    Icon: HiOutlineAnnotation,
    onClick: () => router.push("/chat"),
    isActive: router.asPath.includes("chat"),
    Component: ({ props }) => <FooterNavItem {...props} />,
  },
  {
    text: "Settings",
    Icon: HiOutlineCog,
    onClick: () => router.push("/settings"),
    isActive: router.asPath.includes("settings"),
    Component: ({ props }) => <FooterNavItem {...props} />,
  },
]

const FooterSearchButton = ({ username, onClick, isActive }) => (
  <Link href={`/user/${username}/portfolio`}>
    <a className="flex items-center justify-center w-full pt-1 pb-2" onClick={onClick}>
      <SociiIMG height="40" width="40" />
    </a>
  </Link>
)
// <a className="flex items-center justify-center w-full pt-1 pb-2" onClick={onClick}>
//   <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-brand">
//     <Icon className="w-6 h-6 text-brand-light" />
//   </div>
// </a>
