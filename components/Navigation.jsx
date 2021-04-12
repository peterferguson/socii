import { UserContext } from "@lib/context";
import { auth, userFirstName, signOut } from "@lib/firebase";
import SearchIcon from "@public/icons/search.svg";

import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";



export default function Navigation(props) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  return (
    <div className="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-white flex-none flex">
      <Logo />
      <SearchBar {...props} />
      <NavigationButtons>
        {username && (
          <>
            <div>
              <button
                className="flex-1 rounded p-2 m-4 text-white bg-green-500 hover:bg-green-400"
                onClick={() => signOut(router, userFirstName(user))}
              >
                <a>Sign Out 👋</a>
              </button>
            </div>
            <NavItem
              href={`/${username}`}
              image_src={user?.photoUrl}
              icon="🙋‍♂️"
            />
          </>
        )}
        {!username && (
          <button
            className="flex-1 rounded p-2 m-4 text-white bg-green-500 hover:bg-green-400"
            href="/enter"
          >
            <a className="font-bold">Login</a>
          </button>
        )}
      </NavigationButtons>
    </div>
  );
}

function Logo() {
  return (
    <div className="p-4">
      <Link href="/">
        <a className="text-4xl text-green-400">socii</a>
      </Link>
    </div>
  );
}

function SearchBar(props) {
  return (
    <div className="border-b-2 border-gray-200 flex-1 h-18 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
      <button
        type="button"
        className="group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200 w-full py-2"
        onClick={props.toggleSearchCard}
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

function NavigationButtons(props) {
  return (
    <div>
      <ul>{props.children}</ul>
    </div>
  );
}

function NavItem(props) {
  const callback = props.callback ? props.callback : () => {};
  return (
    <li className="flex-1">
      <Link href={props.href} className="icon-button" onClick={callback}>
        {props.image_src ? (
          <img src={props.image_src}></img>
        ) : (
          <a>{props.text}</a>
        )}
      </Link>
    </li>
  );
}
