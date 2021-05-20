import Link from "next/link";
import { UserContext } from "@lib/context";
import React, { useContext } from "react";

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <div className="mx-auto flex items-center justify-center w-screen h-screen bg-gray-50">
          <Link href="/enter">
            <a className="text-3xl underline text-brand-light font-poppins text-center align-center">
              Please sign in to view this content
            </a>
          </Link>
        </div>
      );
}
