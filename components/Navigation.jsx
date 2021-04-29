import { UserContext } from "@lib/context";
import { userFirstName, signOut } from "@lib/firebase";
import SearchIcon from "@icons/search.svg";
import CogIcon from "@icons/cog.svg";
import PieIcon from "@icons/pie.svg";
import AtIcon from "@icons/at.svg";
import LogoutIcon from "@icons/logout.svg";
import GroupIcon from "@icons/group.svg";
import RightChevronIcon from "@icons/rightChevron.svg";
import MenuIcon from "@icons/menu.svg";
import { Transition, Popover } from "@headlessui/react";

import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Navigation(props) {
  const { username } = useContext(UserContext);
  const router = useRouter();
  
  return (
    <div className="sticky top-0 z-50 w-full max-w-8xl mx-auto bg-gray-50 flex-none flex">
      <Logo />
      <SearchBar {...props} />
      {username ? (
        <Dropdown />
      ) : (
        <button
          className="btn btn-transition flex-none"
          onClick={() => router.push("/enter")}
        >
          Login
        </button>
      )}
    </div>
  );
}

function Logo() {
  return (
    <div className="p-4">
      <Link href="/">
        <a className="text-4xl font-poppins">soc</a>
      </Link>
      <Link href="/">
        <a
          className="text-4xl bg-clip-text text-transparent \
                     bg-gradient-to-r from-green-400 to-brand-light font-poppins"
        >
          ii
        </a>
      </Link>
    </div>
  );
}

function SearchBar({ setShowSearchCard }) {
  return (
    <div
      className="border-b-2 border-gray-200 flex-1 h-18 flex items-center \
                 justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8"
    >
      <button
        type="button"
        className="group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200 w-full py-2"
        onClick={() => setShowSearchCard(true)}
      >
        <SearchIcon className="text-gray-400 group-hover:text-gray-500 transition-colors duration-200" />
        <span className="text-gray-400">
          Search<span className="hidden sm:inline text-gray-400">: TSLA</span>
        </span>
        <span className="hidden sm:block text-gray-400 text-sm leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md">
          <span className="sr-only">Press </span>
          <kbd className="font-sans">
            <abbr title="Command" className="no-underline">
              ⌘
            </abbr>
          </kbd>
          <span className="sr-only"> and </span>
          <kbd className="font-sans">K</kbd>
          <span className="sr-only"> to search</span>
        </span>
      </button>
    </div>
  );
}

function Dropdown() {
  // const [openSettings, setOpenSettings] = useState(false);
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  // TODO: Add bitcoin svg to navigate to crypto page
  // TODO: Add navigation to stock page 
  const dropdownItems = [
    {
      name: "Invites",
      description: "Invite yours friends to the alpha",
      href: "/user/invites",
      icon: AtIcon,
    },
    {
      name: "Porfolio",
      description: "Keep track of your growth",
      href: `/user/${username}`,
      icon: PieIcon,
    },
    {
      name: "Groups",
      description: "View all of your Groups",
      href: "",
      icon: GroupIcon,
      rightIcon: RightChevronIcon,
      // onClick: () => setOpenSettings(!openSettings),
    },
    {
      name: "Settings",
      description: "Adjust your settings",
      href: "",
      icon: CogIcon,
      rightIcon: RightChevronIcon,
    },
  ];

  const grayedDropdownItems = [
    {
      name: "Sign Out",
      description: "",
      href: "",
      icon: LogoutIcon,
      onClick: () => signOut(router, userFirstName(user)),
    },
  ];

  return (
    <Popover className="relative inline-block text-left p-4">
      {({ open }) => (
        <>
          <Popover.Button className="items-center justify-center w-full h-full focus:outline-none">
            <MenuIcon className=" w-6 h-6 text-gray-300" />
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute z-10 w-max px-6 mt-20 -top-0.5 right-2 sm:px-0 lg:max-w-3xl"
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7">
                  {dropdownItems.map((item) => (
                    <DropdownItem item={item} />
                  ))}
                </div>
                <div className="p-4 bg-gray-50">
                  {grayedDropdownItems.map((item) => (
                    <DropdownItem item={item} />
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

function DropdownItem({ item }) {
  return (
    <Link href={item.href}>
      <a
        key={item.name}
        onClick={item.onClick}
        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none"
      >
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
          <item.icon className={"w-6 h-6 mr-2 text-brand"} aria-hidden="true" />
        </div>
        <div className="ml-4 flex-grow">
          <p className="text-sm font-medium text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
        {item.rightIcon && (
          <item.rightIcon
            className="flex-none h-6 w-6 text-brand-light"
            aria-hidden="true"
          />
        )}
      </a>
    </Link>
  );
}
