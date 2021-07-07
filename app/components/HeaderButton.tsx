import Link from "next/link"
import { Transition, Popover } from "@headlessui/react"
import React, { useState } from "react"

export interface DropdownItemProps {
  name: string
  href: string
  onClick?: () => void
  notificationCount?: number
  leftIcon?: () => JSX.Element
  rightIcon?: () => JSX.Element
}

export interface ButtonProps {
  items: DropdownItemProps[]
  name: string
  icon: () => JSX.Element
  className: string
}

export default function HeaderButton(props: ButtonProps) {
  //   const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false)
  return (
    <Popover>
      <Popover.Button
        className={`p-2 text-brand-cyan-vivid bg-gray-100 align-middle rounded-full hover:text-white hover:bg-brand-cyan-vivid focus:outline-none ${props.className}`}
        // @click="toggleNotificationsMenu" @keydown.escape="closeNotificationsMenu"
        aria-label={props.name}
        aria-haspopup="true"
      >
        {!!props.icon && (
          <>
            <props.icon />
            {props.items.filter((item) => item.notificationCount > 0).length > 0 && (
              <span
                aria-hidden="true"
                className="absolute inline-block w-3 h-3 bg-red-600 border-2 border-white rounded-full top-[0.6rem] right-[0.6rem] transform translate-x-1 -translate-y-1 dark:border-gray-800"
              ></span>
            )}
          </>
        )}
      </Popover.Button>
      <DropdownMenu>
        {props.items.map((item) => (
          <DropdownMenuItem key={item.name} {...item} />
        ))}
      </DropdownMenu>
    </Popover>
  )
}

function DropdownMenuItem(
  props: DropdownItemProps,
  { notificationCount = 0 }: DropdownItemProps
) {
  return (
    <li className="flex" onClick={props.onClick}>
      <Link href={props.href}>
        <a className="inline-flex items-center justify-start w-full px-2 py-1 text-sm font-semibold text-black transition-colors duration-150 rounded-md hover:bg-brand-light hover:text-palette-light">
          {!!props.leftIcon && <props.leftIcon />}
          <span>{props.name}</span>
          <div className="flex-grow"></div>
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full justify-self-end dark:text-red-100 dark:bg-red-600">
            {notificationCount}
          </span>
          {!!props.rightIcon && <props.rightIcon />}
        </a>
      </Link>
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
