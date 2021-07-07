import { signOut, userFirstName } from "@lib/firebase";
import { useOnClickOutside } from "@lib/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { VscSignOut } from "react-icons/vsc";

export function HeaderProfilePhoto({ user }) {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  const handleClickOutside = () => setClicked(false);

  const handleClickInside = () => signOut(router, userFirstName(user));

  useOnClickOutside(ref, handleClickOutside);

  // TODO: Add a transition to the logo -> logout
  return clicked ? (
    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
      <div
        ref={ref}
        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer"
        onClick={handleClickInside}
      >
        <VscSignOut className="w-6 h-6 m-auto text-brand-dark" />
      </div>
    </div>
  ) : (
    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
      {user ? (
        <Image
          src={user?.photoURL || ""}
          alt="profile picture"
          className="object-cover w-10 h-10 mx-auto rounded-full cursor-pointer"
          onClick={() => setClicked(true)}
          height={40}
          width={40} />
      ) : (
        <div className="animate-ping"></div>
      )}
    </div>
  );
}
