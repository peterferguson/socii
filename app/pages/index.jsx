import Invite from "@components/Invite"
import Logo from "@components/Logo"
import SociiFeatureSlider from "@components/SociiFeatureSlider"
import { OneTwoThree } from "@components/WhySocii"
import { UserContext } from "@lib/context"
import { tw } from "@utils/helper"
// import dynamic from "next/dynamic"s
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { FaFacebook, FaTwitter, FaMedium } from "react-icons/fa"

// const OneTwoThree = dynamic(
//   () => import("@components/WhySocii").then((mod) => mod.OneTwoThree),
//   {
//     loading: () => <p>...</p>,
//     ssr: false,
//   }
// )
// const SociiFeatureSlider = dynamic(() => import("@components/SociiFeatureSlider"), {
//   loading: () => <p>...</p>,
//   ssr: false,
// })

// TODO: Add is visible ref to each component to load the animations properly
export default function Home() {
  const { user } = useContext(UserContext)

  return (
    <>
      {!user && <PromotionBanner />}
      {/* TODO Add a wave transition animation to this gradient */}
      <Hero user={user} />
      <OneTwoThree />
      <SociiFeatureSlider />
      <Footer />
    </>
  )
}

const Hero = ({ user }) => {
  const router = useRouter()

  return (
    <div className="h-screen grid grid-cols-2 bg-gradient-to-bl via-brand-natural-lightest to-brand-natural-light from-brand-shade-blue">
      <div className="z-10 flex flex-col justify-center mx-auto">
        <div className="px-4 pt-4 text-6xl sm:text-8xl sm:pt-32 font-poppins animate-fade-in-down">
          Invest Together.
        </div>
        <div className="px-4 pt-8 text-2xl sm:text-4xl font-poppins animate-fade-in-up">
          Secure Your Financial
        </div>
        <div className="px-4 pb-4 text-2xl sm:text-4xl font-poppins animate-fade-in-up">
          Future With Friends.
        </div>
        <div>
          <button
            className="btn btn-transition"
            onClick={() => router.push(user ? "/stocks" : "/enter")}
          >
            Invest Now
          </button>
        </div>
      </div>
    </div>
  )
}

const PromotionBanner = () => (
  <div className="w-full h-20 p-4 text-sm text-center text-white align-middle bg-brand-cyan-green font-work-sans leading-6 sm:leading-0 sm:text-lg">
    👋 socii is currently in private pre-alpha mode.
    <div className="-mt-1">You will need an invite!</div>
  </div>
)

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false)
  return (
    <div className="overflow-hidden bg-gray-100 max-h-lg">
      <div className="flex flex-col items-center justify-center w-5/6 max-w-lg mx-auto text-center">
        {subscribed ? (
          <h1 className="text-3xl font-extrabold text-white font-primary sm:text-4xl md:text-5xl md:leading-snug">
            Keep an eye on your email for your invite!
          </h1>
        ) : (
          <div className="mt-8 space-y-8">
            <h1 className="text-3xl font-extrabold font-work-sans font-primary sm:text-4xl md:text-5xl md:leading-tight">
              Get your
              <span className="text-palette-primary"> Invite!</span>
              <p className="text-base font-thin font-poppins">
                Use the email linked to your google or facebook account to get invited.
              </p>
            </h1>
            <Invite setSubscribed={setSubscribed} />
          </div>
        )}
        <div className="h-80">
          <div
            className={tw(
              `rounded-t-[calc(100vh*2)] bg-white w-[calc(400vh)] h-[calc(400vh)] mt-12 overflow-hidden`
            )}
          >
            <footer className="py-8 mt-2 bg-white dark:bg-gray-800">
              <Logo className="text-5xl" />
              <div className=" grid grid-rows-2 space-y-4 divide-y">
                <div className="px-4 mx-auto max-w-screen-xl">
                  <ul className="flex flex-wrap justify-between mx-auto text-lg font-light max-w-screen-md">
                    <li className="m-2">
                      <a
                        className="text-gray-800 hover:text-brand dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                        href="/"
                      >
                        FAQ
                      </a>
                    </li>
                    <li className="m-2">
                      <a
                        className="text-gray-800 hover:text-brand dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                        href="/"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li className="m-2">
                      <a
                        className="text-gray-800 hover:text-brand dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                        href="/"
                      >
                        About Us
                      </a>
                    </li>
                  </ul>
                  <div className="flex items-center justify-between max-w-xs pt-4 mx-auto">
                    <a
                      // href="https://www.facebook.com/socii"
                      title="socii On Facebook"
                    >
                      <FaFacebook className="w-12 h-12 p-2  font-bold tracking-wide hover:text-white hover:bg-facebook text-facebook transition duration-500" />
                    </a>

                    <a
                      // href="https://twitter.com/socii/"
                      title="socii On Twitter"
                    >
                      <FaTwitter className="w-12 h-12 p-2  font-bold tracking-wide hover:text-white hover:bg-twitter text-twitter transition duration-500" />
                    </a>

                    <a
                      // href="https://www.medium.com/user/socii/"
                      title="socii On Medium"
                    >
                      <FaMedium className="w-12 h-12 p-2  font-bold tracking-wide hover:text-white hover:bg-black transition duration-500" />
                    </a>
                    {/* <a
                      href="/"
                      className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
                      </svg>
                    </a>
                    <a
                      href="/"
                      className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"></path>
                      </svg>
                    </a>
                    <a
                      href="/"
                      className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M477 625v991h-330v-991h330zm21-306q1 73-50.5 122t-135.5 49h-2q-82 0-132-49t-50-122q0-74 51.5-122.5t134.5-48.5 133 48.5 51 122.5zm1166 729v568h-329v-530q0-105-40.5-164.5t-126.5-59.5q-63 0-105.5 34.5t-63.5 85.5q-11 30-11 81v553h-329q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5 114.5-15.5q171 0 275 113.5t104 332.5z"></path>
                      </svg>
                    </a> */}
                  </div>
                </div>
                <div className="flex items-center justify-center w-full h-8 mx-auto text-sm mt-4 text-gray-400 uppercase font-extrathin font-poppins">
                  © 2021 socii. all rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
