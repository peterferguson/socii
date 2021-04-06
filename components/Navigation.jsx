import { UserContext } from "@lib/context";
import { auth, userFirstName } from "@lib/firebase";

import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

import toast from "react-hot-toast";

export default function Navigation(props) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  return (
    <div className="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-white flex-none flex">
      <Logo />
      <SearchBar {...props}/>
      <NavigationButtons>
        {username && (
          <>
            <div>
              <button
                className="flex-1 rounded p-2 m-4 text-white bg-green-500 hover:bg-green-400"
                onClick={() => SignOut(router, userFirstName(user))}
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
        {!username && <NavItem href="/enter" text="Log in! ➡️" />}
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
    <div className="flex-1 border-b border-gray-200 h-18 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
      <button
        type="button"
        className="group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200 w-full py-2"
        onClick={props.toggleSearchCard}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          className="text-gray-400 group-hover:text-gray-500 transition-colors duration-200"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <span className="text-gray-400">
          Search:<span className="hidden sm:inline text-gray-400"> TSLA</span>
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

function SignOut(router, firstname) {
  toast(`Bye for now ${firstname}!`, { icon: "👋" });
  auth.signOut();
  router.push("/enter");
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
