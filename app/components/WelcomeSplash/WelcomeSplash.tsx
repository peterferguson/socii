import { default as Socii } from "@components/SociiSVG"
import React from "react"

const WelcomeSplash = () => {
  return (
    <div className="absolute z-10 w-full max-w-md p-10 space-y-8 rounded-xl">
      <div className="flex flex-col items-center justify-center text-center">
        <a className="flex flex-row mx-4 text-7xl font-primary">
          <span className="-mr-0.5">s</span>
          <Socii className="mt-[0.25rem]" />
          <span className="-ml-0.5">cii</span>
        </a>
        <p className="mt-2 text-base text-gray-600">WELCOME!</p>
      </div>
    </div>
  )
}

export default WelcomeSplash
