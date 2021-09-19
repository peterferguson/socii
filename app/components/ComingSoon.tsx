import { tw } from "@utils/tw"
import React from "react"
import { FaFacebook, FaMedium, FaTwitter } from "react-icons/fa"

interface IComingSoon {
  children: React.ReactNode
  color: string
  description: string
}

export default function ComingSoon({ children, color, description = "" }: IComingSoon) {
  return (
    <div className="flex flex-col mt-0 bg-gray-50 sm:mt-8">
      <div
        className={tw(
          "w-4/5 p-10 mx-auto my-8 text-center border-4 shadow-xl cursor-pointer grid place-items-center sm:my-auto",
          `border-${color} bg-white bg-opacity-70`,
          "rounded-xl space-y-5"
        )}
      >
        {children}
        <h1
          className={tw(
            `text-2xl sm:text-4xl font-semibold uppercase text-${color} transition duration-500`
          )}
        >
          Coming Soon
        </h1>
        {description && (
          <h2 className="text-xs text-gray-700 sm:text-xl transition duration-500">
            {description}
          </h2>
        )}
        <h2 className="text-xs text-gray-700 sm:text-xl transition duration-500">
          We have many projects on our roadmap at the moment. Which you can check out
          here & vote on what you would like to see the most!
        </h2>
        <h2 className="text-xs text-gray-700 sm:text-xl transition duration-500">
          While you wait check us out on your favorite social network.
        </h2>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <a
            // href="https://www.facebook.com/socii"
            title="socii On Facebook"
          >
            <FaFacebook className="w-16 sm:w-24 h-16 sm:h-24 px-1 sm:px-6 py-2 font-semibold tracking-wide hover:text-white hover:bg-facebook text-facebook transition duration-500" />
          </a>

          <a
            // href="https://twitter.com/socii/"
            title="socii On Twitter"
          >
            <FaTwitter className="w-16 sm:w-24 h-16 sm:h-24 px-1 sm:px-6 py-2 font-semibold tracking-wide hover:text-white hover:bg-twitter text-twitter transition duration-500" />
          </a>

          <a
            // href="https://www.medium.com/user/socii/"
            title="socii On Medium"
          >
            <FaMedium className="w-16 sm:w-24 h-16 sm:h-24 px-1 sm:px-6 py-2 font-semibold tracking-wide hover:text-white hover:bg-black transition duration-500" />
          </a>
        </div>
      </div>
    </div>
  )
}
