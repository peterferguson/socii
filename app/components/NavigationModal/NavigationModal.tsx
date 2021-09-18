import { Popover, Transition } from "@headlessui/react"
import { useAuth } from "@hooks"
import { NextRouter, useRouter } from "next/router"
import { Fragment } from "react"
import { FaBitcoin as BitcoinIcon } from "react-icons/fa"
import {
  HiOutlineChartPie as PieChartIcon,
  HiOutlineChat as ChatIcon,
} from "react-icons/hi"

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
                {/** Useful for a coinbase-like top of modal alert */}
                {/* <div className="px-4 pt-5 pb-4 bg-blue-100">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full">
                  <ExclamationIcon
                    className="w-6 h-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
              </div> */}
                <div className="px-4 py-8 bg-white grid grid-flow-row grid-cols-5 auto-rows-max gap-y-4 rounded-2xl">
                  {navItems(username, router, close).map((props, i) => (
                    <NavItem key={`nav-item-${i}`} {...props} />
                  ))}
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
      className="flex items-center justify-center w-12 h-12 ml-2 rounded-full bg-gray-50"
      onClick={onClick}
    >
      <Icon className="w-5 h-5 text-brand-cyan-vivid" />
    </div>
    <div className="items-start p-1 ml-2 col-span-4" onClick={onClick}>
      <h2 className="font-light font-primary text-brand-cyan-vivid">{name}</h2>
      <p className="text-xs font-thin text-gray-300 font-secondary">{description}</p>
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
