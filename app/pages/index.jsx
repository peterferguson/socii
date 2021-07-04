import Invite from "@components/Invite"
import Logo from "@components/Logo"
import SociiFeatureSlider from "@components/SociiFeatureSlider"
import { OneTwoThree } from "@components/WhySocii"
import { UserContext } from "@lib/context"
import { tw } from "@utils/helper"
import React, { useContext, useState } from "react"
import { FaFacebook, FaTwitter, FaMedium } from "react-icons/fa"

// TODO: Add is visible ref to each component to load the animations properly
export default function Home() {
  const { user } = useContext(UserContext)

  const [invited, setInvited] = useState(false)
  return (
    <>
      {!user && <PromotionBanner />}
      {/* TODO Add a wave transition animation to this gradient */}
      <Hero user={user} setInvited={setInvited} />
      <OneTwoThree />
      <SociiFeatureSlider />
      <Footer invited={invited} setInvited={setInvited} />
    </>
  )
}

const Hero = ({ setInvited }) => {
  return (
    <div className="h-screen grid grid-cols-2 bg-gradient-to-bl via-brand-natural-lightest to-brand-natural-light from-brand-shade-blue">
      <div className="z-10 flex flex-col justify-center mx-auto">
        <div className="px-4 pt-4 text-6xl sm:text-8xl sm:pt-32 font-primary animate-fade-in-down">
          Invest Together.
        </div>
        <div className="px-4 pt-8 text-2xl sm:text-4xl font-primary animate-fade-in-up">
          Secure Your Financial
        </div>
        <div className="px-4 pb-4 text-2xl sm:text-4xl font-primary animate-fade-in-up">
          Future With Friends.
        </div>
        <div className="mt-8 ml-8 sm:ml-32 sm:mt-16">
          <Invite setInvited={setInvited} className="mx-auto" />
        </div>
      </div>
    </div>
  )
}

const PromotionBanner = () => (
  <div className="w-full h-20 p-4 text-sm text-center text-white align-middle bg-brand-cyan-green font-secondary leading-6 sm:leading-0 sm:text-lg">
    👋 socii is currently in private pre-alpha mode.
    <div className="-mt-1">You will need an invite!</div>
  </div>
)

const Footer = ({ invited, setInvited }) => {
  return (
    <div className="overflow-hidden bg-gray-100 max-h-lg">
      <div className="flex flex-col items-center justify-center w-5/6 max-w-lg mx-auto text-center">
        {invited ? (
          <h1 className="text-3xl font-extrabold text-white font-primary sm:text-4xl md:text-5xl md:leading-snug">
            Keep an eye on your email for your invite!
          </h1>
        ) : (
          <div className="mt-8 space-y-8">
            <h1 className="text-3xl font-extrabold font-primary sm:text-4xl md:text-5xl md:leading-tight">
              Get your
              <span className="text-palette-primary"> Invite!</span>
              <p className="text-base font-thin font-primary">
                Use the email linked to your google or facebook account to get invited.
              </p>
            </h1>
            <Invite setInvited={setInvited} />
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
                  </div>
                </div>
                <div className="flex items-center justify-center w-full h-8 mx-auto mt-4 text-sm text-gray-400 uppercase font-extrathin font-primary">
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
