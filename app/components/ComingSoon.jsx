import React from "react"
import { FaFacebook, FaTwitter, FaMedium } from "react-icons/fa"

export default function ComingSoon({ children, color, description = "" }) {
  return (
    <div className="flex flex-col w-full h-full mt-0 bg-gray-100 bg-center bg-no-repeat bg-cover sm:mt-8">
      <div
        className={`
		w-4/5 p-10 mx-auto my-20 text-center border-4 shadow-2xl cursor-pointer 
		border-${color} grid place-items-center sm:my-auto bg-white-600 
		bg-opacity-70 rounded-xl space-y-5
	`}
      >
        {children}
        <h1
          className={`text-4xl font-bold uppercase text-${color} transition duration-500`}
        >
          Coming Soon
        </h1>
        {description && (
          <h2 className="text-xl text-gray-700 transition duration-500">
            {description}
          </h2>
        )}
        <h2 className="text-xl text-gray-700 transition duration-500">
          We have many projects on our roadmap at the moment. Which you can check out
          here & vote on what you would like to see the most!
        </h2>
        <h2 className="text-xl text-gray-700 transition duration-500">
          While you wait check us out on your favorite social network.
        </h2>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <a
            // href="https://www.facebook.com/QuickToolz"
            title="socii On Facebook"
          >
            <FaFacebook className="w-24 h-24 px-6 py-2 font-bold tracking-wide hover:text-white hover:bg-[#1778f2] text-[#1778f2] transition duration-500" />
          </a>

          <a
            // href="https://pinterest.com/quicktoolz/"
            title="socii On Twitter"
          >
            <FaTwitter className="w-24 h-24 px-6 py-2 font-bold tracking-wide hover:text-white hover:bg-[#1DA1F2] text-[#1DA1F2] transition duration-500" />
          </a>

          <a
            // href="https://www.reddit.com/user/quicktoolz/"
            title="socii On Medium"
          >
            <FaMedium className="w-24 h-24 px-6 py-2 font-bold tracking-wide hover:text-white hover:bg-black transition duration-500" />
          </a>
        </div>
      </div>
    </div>
  )
}
