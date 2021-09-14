import Logo from "@components/Logo";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export const EnterCard = ({ signinWith }) => (
  <div className="absolute z-10 w-full max-w-md p-10 bg-white space-y-8 rounded-xl">
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="mt-6 text-4xl font-bold text-gray-900 font-primary">Welcome to</h2>
      <Logo className="text-5xl" />
      <p className="mt-2 text-base text-gray-600 font-primary">
        Please link your account with one of the following providers:
      </p>
    </div>
    <div className="flex flex-col items-center justify-center mx-auto space-y-6">
      <span
        className="flex items-center justify-center w-full mx-auto bg-white rounded-full cursor-pointer h-11 "
        onClick={() => signinWith("")}
      >
        <button className="w-8/12 p-1 text-xs font-thin text-black bg-white border border-gray-200 rounded-full sm:text-sm grid grid-cols-7 place-items-center h-11 hover:shadow-lg transition ease-in duration-300">
          <FcGoogle className="w-4 h-4 ml-1 text-white sm:w-8 sm:h-8" />
          <span className="col-span-4 col-start-3">Connect with Google</span>
        </button>
      </span>
    </div>
  </div>
);
