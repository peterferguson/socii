import { Popover } from "@headlessui/react"
import { useAuth } from "@hooks/useAuth"
import FirebaseUser from "@models/FirebaseUser"
import { tw } from "@utils/tw"
import { NextRouter, useRouter } from "next/router"
import React, { useMemo } from "react"
import { HiOutlineGlobe, HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi"
import SociiSVG from "../SociiSVG"
import { NavigationModalDynamic } from "../NavigationModal"

const Footer = () => {
  const router = useRouter()
  const { user } = useAuth()
  const username = user ? user.username : ""

  const navLinks = useMemo(
    () => links(user, username, router),
    [user, username, router]
  )

  return (
    <Popover>
      {({ open }) => (
        <>
          <nav className="fixed inset-x-0 bottom-0 z-50 w-full mt-12 bg-white sm:hidden standalone:pb-safe-bottom rounded-t-3xl grid grid-cols-3">
            {navLinks.map(({ text, Icon, onClick, isActive, Component }, i) => {
              const props = { text, Icon, onClick, isActive, index: i }
              return <Component key={`nav-item-${i}`} props={props} />
            })}
          </nav>
          <NavigationModalDynamic open={open} />
        </>
      )}
    </Popover>
  )
}

export const FooterNavItem = ({ text, Icon, onClick, isActive, index }) => {
  return (
    <a
      className={tw(
        "flex flex-col items-center justify-center w-full py-2 font-primary text-tiny text-brand-dark text-center",
        index === 0 ? "ml-4" : "mr-4",
        isActive && "text-brand-cyan-vivid",
        "transition duration-300"
      )}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 mx-auto mb-1" />
      {text}
    </a>
  )
}

const links = (user: FirebaseUser, username: string, router: NextRouter) => [
  {
    text: !user ? "Home" : "Groups",
    Icon: !user ? HiOutlineHome : HiOutlineUserGroup,
    onClick: () => router.push(!user ? "/" : "/groups"),
    isActive:
      !router.asPath.slice(1) ||
      (router.asPath.includes("groups") && !router.asPath.includes("portfolio")),
    Component: ({ props }) => <FooterNavItem {...props} />,
  },
  {
    onClick: () => {},
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
]

const FooterSearchButton = () => (
  <Popover.Button as="div" className="relative w-full">
    <div
      className={tw(
        "absolute -top-4 left-1/2 -translate-x-1/2 w-1/2 p-2 font-primary bg-white text-tiny text-brand-dark text-center",
        "transition duration-300 shadow-xl rounded-full flex items-center justify-center",
        ""
      )}
    >
      <SociiSVG className="text-5xl p-0.5" />
    </div>
  </Popover.Button>
)
export default React.memo(Footer)
