import { Popover, Transition } from "@headlessui/react"
import { tw } from "@utils/tw"
import Link from "next/link"
import React from "react"
import { ButtonProps, HeaderButtonChildren } from "./HeaderButton"

interface DropdownItemProps {
  name: string
  href?: string
  onClick?: () => void
  notificationCount?: number
  leftIcon?: () => JSX.Element
  rightIcon?: () => JSX.Element
}

interface DropdownButtonProps extends ButtonProps {
  items: DropdownItemProps[]
}

export default function HeaderDropdownButton(props: DropdownButtonProps) {
  return (
    <Popover>
      <Popover.Button
        className={tw(
          "mr-2 appearance-none focus:outline-none focus:ring-0 !p-1 nav-btn",
          "umami--click--nav-header-user-profile-photo"
        )}
        aria-label={props.name}
        aria-haspopup="true"
      >
        <HeaderButtonChildren
          {...props}
          hasNotifications={
            props.items.filter((item) => item.notificationCount > 0).length > 0
          }
        />
      </Popover.Button>
      <DropdownMenu>
        {props.items.map((item) => (
          <DropdownMenuItem key={item.name} {...item} />
        ))}
      </DropdownMenu>
    </Popover>
  )
}

function DropdownMenuItem(props: DropdownItemProps) {
  const ItemChildren = () => (
    <>
      {!!props.leftIcon && <props.leftIcon />}
      <span className="inline-flex items-center justify-center pl-2 font-thin uppercase font-primary">
        {props.name}
      </span>
      <div className="flex-grow"></div>
      {props.notificationCount > 0 && (
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-red-600 bg-red-100 rounded-full justify-self-end dark:text-red-100 dark:bg-red-600">
          {props.notificationCount}
        </span>
      )}
      {!!props.rightIcon && <props.rightIcon />}
    </>
  )
  const className =
    "inline-flex items-center justify-start w-full px-2 py-1 text-sm font-semibold text-black transition-colors duration-150 rounded-md hover:bg-brand-light hover:text-brand-cyan-vivid"
  return (
    <li
      className={tw(
        `flex umami--click--nav-header-dropdown-item-${props.name
          .replace(/\s/g, "-")
          .toLowerCase()}`
      )}
      onClick={props.onClick}
    >
      {!props.onClick ? (
        <Link href={props.href}>
          <a className={className}>
            <ItemChildren />
          </a>
        </Link>
      ) : (
        <div className={className}>
          <ItemChildren />
        </div>
      )}
    </li>
  )
}

function DropdownMenu({ children }) {
  return (
    <Transition
      as={"ul"}
      enter="transition ease-in duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Popover.Panel className="absolute right-0 w-56 p-2 mt-4 text-gray-600 bg-white border border-gray-100 shadow-md -bottom-24 space-y-2 rounded-md">
        {children}
      </Popover.Panel>
    </Transition>
  )
}
