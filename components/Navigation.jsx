import { UserContext } from "@lib/context";
import { userFirstName, signOut } from "@lib/firebase";
import SearchIcon from "@icons/search.svg";
import CogIcon from "@icons/cog.svg";
import PieIcon from "@icons/pie.svg";
import AtIcon from "@icons/at.svg";
import GroupIcon from "@icons/group.svg";
import RightChevronIcon from "@icons/rightChevron.svg";
import MenuIcon from "@icons/menu.svg";
import { Menu, Transition } from "@headlessui/react";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Navigation(props) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 w-full max-w-8xl mx-auto bg-gray-50 flex-none flex">
      <Logo />
      <SearchBar {...props} />
      {username && (
        <>
          {/* <DropdownMenu /> */}
          <MyDropdown />
          {/* <Link href={`/${username}`} className="icon-button">
              {user?.photoUrl ? <img src={user?.photoUrl}></img> : <a>"🙋‍♂️"</a>}
            </Link> */}
        </>
      )}
      {!username && (
        <button
          className="btn btn-transition"
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

function MyDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left p-4">
      {({ open }) => (
        <>
          <Menu.Button className="items-center justify-center w-full h-full focus:outline-none">
            <MenuIcon className=" w-6 h-6 text-gray-300" />
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 w-56 mt-2 mr-2 origin-top-right 
                       bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 \
                         ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut(router, userFirstName(user))}
                      className={`${
                        active ? "text-brand-light" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <PieIcon
                        className={"w-5 h-5 mr-2 text-brand"}
                        aria-hidden="true"
                      />
                      Portfolios
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut(router, userFirstName(user))}
                      className={`${
                        active ? "text-brand-light" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <AtIcon
                        className={"w-5 h-5 mr-2 text-brand"}
                        aria-hidden="true"
                      />
                      Invites
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "text-brand-light" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <GroupIcon
                        className={"flex-none w-5 h-5 mr-2 text-brand"}
                        aria-hidden="true"
                      />
                      <span className="flex-grow text-left">Groups</span>
                      <RightChevronIcon className="flex-none h-4 w-4" />
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    
                    <button
                      className={`${
                        active ? "text-brand-light" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <CogIcon
                        className={"flex-none w-5 h-5 mr-2 text-brand"}
                        aria-hidden="true"
                      />
                      <span className="flex-grow text-left">Settings</span>
                      <RightChevronIcon className="flex-none h-4 w-4" />
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut(router, userFirstName(user))}
                      className={`${
                        active ? "text-brand-light" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <span className={"w-5 h-5 mr-2"} aria-hidden="true">
                        👋
                      </span>
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}