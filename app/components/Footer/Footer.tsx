import { Popover } from "@headlessui/react"
import { useAuth } from "@hooks/useAuth"
import FirebaseUser from "@models/FirebaseUser"
import { tw } from "@utils/tw"
import { NextRouter, useRouter } from "next/router"
import React, { Fragment, useMemo } from "react"
import { HiOutlineGlobe, HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi"
import { NavigationModalDynamic } from "../NavigationModal"
import SociiSVG from "../SociiSVG"

const Footer = () => {
  const router = useRouter()
  const { user } = useAuth()
  const username = user ? user.username : ""
  const isChatRoute = router.pathname.startsWith("/chat")

  const navLinks = useMemo(
    () => links(user, username, router),
    [user, username, router]
  )

  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <>
          <nav
            id="mobile-footer"
            className={tw(
              "fixed inset-x-0 bottom-0 w-full mt-12 bg-white sm:hidden z-40",
              "standalone:pb-safe-bottom rounded-t-3xl grid grid-cols-3",
              isChatRoute && "hidden"
            )}
          >
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

interface FooterItemProps {
  text?: string
  Icon?: React.FC<{ className }>
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void
  isActive?: boolean
  Component?: React.FC
  index?: number
}

export const FooterNavItem = ({
  text,
  Icon,
  onClick,
  isActive,
  index,
}: FooterItemProps) => {
  return (
    <a
      className={tw(
        "flex flex-col items-center justify-center w-full py-2 font-primary text-tiny text-brand-dark text-center",
        index === 0 ? "ml-4" : "mr-4",
        isActive && "text-brand-cyan-vivid",
        "transition duration-300",
        `umami--click--footer-nav-item-${text.toLowerCase()}`
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
        "absolute -top-4 left-1/2 -translate-x-1/2 w-1/2 p-2 font-primary bg-white",
        "text-tiny text-brand-dark text-center  shadow-xl rounded-full flex ",
        "transition duration-300 items-center justify-center",
        "umami--click--footer-logo-button-click"
      )}
    >
      <SociiSVG className="text-5xl p-0.5" />
    </div>
  </Popover.Button>
)
export default React.memo(Footer)
