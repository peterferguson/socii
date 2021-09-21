import { Popover, Transition } from "@headlessui/react"
import { useAuth } from "@hooks"
import { tw } from "@utils/tw"
import { NextRouter, useRouter } from "next/router"
import { Fragment } from "react"
import { FaBitcoin as BitcoinIcon } from "react-icons/fa"
import {
  HiOutlineChartPie as PieChartIcon,
  HiOutlineChat as ChatIcon,
} from "react-icons/hi"

import { CashAvailable } from "@components/CashAvailable"

const NavigationModal = ({ open }) => {
  const { user } = useAuth()
  const router = useRouter()
  const username = user ? user.username : ""

  return (
    <Transition.Root show={open} as={Fragment}>
      <Popover.Panel as="div" className="fixed inset-0 z-10 overflow-y-auto">
        {({ close }) => (
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-12"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 "
              leaveTo="opacity-0 translate-y-12 "
            >
              <div className="fixed bottom-0 w-full overflow-hidden text-left bg-white shadow-xl standalone:mb-8 rounded-2xl transform transition-all">
                <div className="px-4 pt-5 pb-4 bg-brand-light-est/75">
                  <CashAvailable />
                </div>
                <div className="px-4 py-8 bg-white grid grid-flow-row grid-cols-5 auto-rows-max gap-y-4 rounded-t-2xl">
                  {navItems(username, router, close).map((props, i) => {
                    console.log(props.isActive)
                    return <NavItem key={`nav-item-${i}`} {...props} />
                  })}
                </div>
                {/** Separator for the modal and the footer menu */}
                <div className="inline-flex w-full px-4 py-4 mt-3" />
              </div>
            </Transition.Child>
          </div>
        )}
      </Popover.Panel>
    </Transition.Root>
  )
}

const NavItem = ({ name, description, onClick, Icon, isActive }) => (
  <Fragment>
    <div
      className={tw(
        "flex items-center justify-center w-12 h-12 ml-2 rounded-full bg-gray-50",
        `umami--click--navigation-modal-${name.toLowerCase()}`
      )}
      onClick={onClick}
    >
      <Icon
        className={tw("w-5 h-5", isActive ? "text-brand-cyan-vivid" : "text-black")}
      />
    </div>
    <div className="items-start p-1 ml-2 col-span-4" onClick={onClick}>
      <h2
        className={tw(
          "font-light font-primary",
          isActive ? "text-brand-cyan-vivid" : "text-black"
        )}
      >
        {name}
      </h2>
      <p className="text-xs font-thin text-gray-400 font-secondary">{description}</p>
    </div>
  </Fragment>
)

const navItems = (username: string, router: NextRouter, close: () => void) => [
  {
    name: "Crypto",
    description: "Search our crypto universe",
    onClick: () => {
      router.push("/crypto")
      router.events.on("routeChangeComplete", () => close())
    },
    Icon: ({ className }) => <BitcoinIcon className={`${className}`} />,
    isActive: router.asPath.includes("crypto"),
  },
  {
    name: "Portfolio",
    description: "Keep track of your growth",
    onClick: () => {
      router.push(username ? "/user/portfolio" : "/groups")
      router.events.on("routeChangeComplete", close)
    },
    Icon: PieChartIcon,
    isActive: router.asPath.includes("portfolio"),
  },
  {
    name: "Chat",
    description: "Chat with friends about investments!",
    onClick: () => {
      router.push("/chat")
      router.events.on("routeChangeComplete", close)
    },
    Icon: ({ className }) => <ChatIcon className={`${className}`} />,
    isActive: router.asPath.includes("chat"),
  },
]

export default NavigationModal
