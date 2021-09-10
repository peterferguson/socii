import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import { tw } from "@utils/tw"
import React, { useRef } from "react"

const steps = [
  {
    heading: "Sign Up",
    subheading: "Simply connect with your google account.",
  },
  {
    heading: "Invite Your Friends",
    subheading: "Ask your friends join your investment club.",
  },
  {
    heading: "Start Investing Together",
    subheading: "Simply start discussing & placing orders!",
  },
]

const OneTwoThree = () => {
  const pageRef = useRef(null)
  const entry = useIntersectionObserver(pageRef, {})
  const isVisible = !!entry?.isIntersecting
  return (
    <section className="flex items-center justify-center h-full max-h-full">
      <div className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800">
        <div className="flex flex-wrap mx-auto">
          <div className="w-full px-8 lg:w-1/2">
            <div className="pb-0 mb-0 sm:mb-12 sm:pb-12 ">
              <h2 className="mb-4 text-2xl font-thin leading-none text-transparent font-primary sm:text-5xl bg-gradient-to-r bg-clip-text from-brand to-[#3fba]">
                Group investing has never been easier!
              </h2>
              {/* <div className="bg-brand/30 h-12 w-92"/> */}
              <p className="mb-8 text-sm leading-loose text-gray-600 dark:text-gray-300 sm:text-base">
                Before <span className="font-bold">socii</span> investing with friends
                meant setting up an investment club. A clumsy process with many legal,
                regulatory & auditory issues to worry about.
              </p>
            </div>
          </div>
          <div className="w-full max-w-sm px-8 mx-auto lg:w-1/2 sm:max-w-xl">
            <ul className="space-y-12 font-primary ">
              {[0, 1, 2].map((i) => (
                <li key={i} className="relative group">
                  <div className="absolute opacity-50 -inset-0.5 bg-gradient-to-r from-brand to-[#3fba] group-hover:-inset-1 group-hover:opacity-100 rounded-2xl blur transition duration-500 group-hover:duration-200"></div>
                  <div
                    className={tw(
                      "relative flex p-2 bg-gray-50 rounded-2xl transition duration-300 group-hover:btn-transition",
                      isVisible && "animate-fade-in-down"
                    )}
                  >
                    <div className="w-full px-4 grid grid-cols-5 place-items-center">
                      <span className="-ml-4 text-2xl font-bold text-gray-500 rounded-full group-hover:text-transparent col-span-1 group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-[#3fba] group-hover:bg-clip-text">
                        {i + 1}
                      </span>
                      <div className="col-span-4 col-start-2">
                        <h3 className="mt-2 text-sm font-semibold dark:text-white sm:text-xl">
                          {steps[i].heading}
                        </h3>
                        <p className="font-thin leading-loose text-gray-600 text-tiny dark:text-gray-300 sm:text-base">
                          {steps[i].subheading}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
export default OneTwoThree
