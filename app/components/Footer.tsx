import { useAuth } from "@hooks/useAuth"
import FirebaseUser from "@models/FirebaseUser"
import { NextRouter, useRouter } from "next/router"
import React, { useMemo } from "react"
import { HiOutlineGlobe, HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi"
import { FooterNavItem } from "./FooterNavItem"
import SociiIMG from "./SociiIMG"

const Footer = () => {
  const router = useRouter()
  const { user } = useAuth()
  const username = user ? user.username : ""

  const navLinks = useMemo(
    () => links(user, username, router),
    [user, username, router]
  )

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-between bg-white space-x-2">
      {navLinks.map(({ text, Icon, onClick, isActive, Component }, i) => {
        const props = { text, Icon, onClick, isActive }
        return <Component key={`nav-item-${i}`} props={props} />
      })}
    </nav>
  )
}

export default React.memo(Footer)

const links = (user: FirebaseUser, username: string, router: NextRouter) => [
  {
    text: !user ? "Home" : "Groups",
    Icon: !user ? HiOutlineHome : HiOutlineUserGroup,
    onClick: () => router.push(!user ? "/" : `/user/${username}`),
    isActive:
      !router.asPath.slice(1) ||
      (router.asPath.includes("user") && !router.asPath.includes("portfolio")),
    Component: ({ props }) => <FooterNavItem {...props} />,
  },
  {
    // onClick: () => setShowSearchCard(!showSearchCard),
    isActive: router.asPath.includes("portfolio"),
    Component: ({ props }) => <FooterSearchButton {...props} username={username} />,
  },
  {
    text: "Stocks",
    Icon: HiOutlineGlobe,
    onClick: () => router.push("/stocks"),
    isActive: router.asPath.includes("stocks"),
    Component: ({ props }) => <FooterNavItem {...props} />,
  },
  // {
  //   text: "Chat",
  //   Icon: HiOutlineAnnotation,
  //   onClick: () => router.push("/chat"),
  //   isActive: router.asPath.includes("chat"),
  //   Component: ({ props }) => <FooterNavItem {...props} />,
  // },
  // {
  //   text: "Settings",
  //   Icon: HiOutlineCog,
  //   onClick: () => router.push("/settings"),
  //   isActive: router.asPath.includes("settings"),
  //   Component: ({ props }) => <FooterNavItem {...props} />,
  // },
]

const FooterSearchButton = ({ username, onClick, isActive }) => (
  // <Link href={username && "/user/portfolio"}>
  <a
    className={`block w-full py-2 mb-2 font-primary text-tiny text-brand-dark text-center ${
      isActive &&
      "border-t-4 border-brand bg-gradient-to-t from-white to-brand-light dark:from-gray-700 dark:to-gray-800"
    } transition duration-300`}
    onClick={onClick}
  >
    <SociiIMG height="32" width="32" />

    <p className="-mt-1">Portfolio</p>

    {/* </a> */}
    {/* <a className="flex items-center justify-center w-full pt-1 pb-2" onClick={onClick}> */}
  </a>
  // </Link>
)
// <a className="flex items-center justify-center w-full pt-1 pb-2" onClick={onClick}>
//   <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-brand">
//     <Icon className="w-6 h-6 text-brand-light" />
//   </div>
// </a>
