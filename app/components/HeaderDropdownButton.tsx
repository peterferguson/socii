import { Popover, Transition } from "@headlessui/react"
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
        className="appearance-none !p-1 nav-btn"
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
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full justify-self-end dark:text-red-100 dark:bg-red-600">
          {props.notificationCount}
        </span>
      )}
      {!!props.rightIcon && <props.rightIcon />}
    </>
  )

  return (
    <li className="flex" onClick={props.onClick}>
      {!props.onClick ? (
        <Link href={props.href}>
          <a className="inline-flex items-center justify-start w-full px-2 py-1 text-sm font-semibold text-black transition-colors duration-150 rounded-md hover:bg-brand-light hover:text-brand-cyan-vivid">
            <ItemChildren />
          </a>
        </Link>
      ) : (
        <div className="inline-flex items-center justify-start w-full px-2 py-1 text-sm font-semibold text-black transition-colors duration-150 rounded-md hover:bg-brand-light hover:text-brand-cyan-vivid">
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
      <Popover.Panel className="absolute right-0 w-56 p-2 mt-2 text-gray-600 bg-white border border-gray-100 shadow-md space-y-2 rounded-md">
        {children}
      </Popover.Panel>
    </Transition>
  )
}
