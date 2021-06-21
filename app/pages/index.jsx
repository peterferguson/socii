import Logo from "@components/Logo"
import OutlineButton from "@components/OutlineButton"
import { UserContext } from "@lib/context"
import { firestore } from "@lib/firebase"
import { logoUrl } from "@utils/helper"

import { useRouter } from "next/router"
import React, { useContext } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

export default function Home() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  return (
    <>
      <div className="h-screen grid grid-cols-2 bg-gray-50">
        {/* <bluryGradientBg className="bg-teal-400"/> */}
        <div className="z-40 grid-rows-4">
          <div className="px-4 pt-24 text-7xl sm:pt-32 font-poppins animate-fade-in-down">
            Invest Together.
          </div>
          <div className="px-4 pt-4 text-2xl sm:text-4xl font-poppins animate-fade-in-up">
            Secure Your Financial
          </div>
          <div className="px-4 pb-4 text-2xl sm:text-4xl font-poppins animate-fade-in-up">
            Future With Friends.
          </div>
          <div>
            <button
              className="btn btn-transition"
              onClick={() => router.push(user ? "/stock" : "/enter")}
            >
              Invest Now
            </button>
          </div>
        </div>
        <div className="z-0 flex bg-gradient-to-r from-green-300 to-brand-light animate-fade-in-right">
          <svg
            className="w-32 h-full -ml-16 fill-current text-gray-50 z-1"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <polygon className="" points="50,0 100,0 50,100 0,100" />
          </svg>
        </div>
      </div>
      {/* <div className="flex flex-row items-center justify-between w-full h-24 overflow-y-hidden">
        <TickerList />
      </div> */}

      <WhySocii />
      <FeatureSlider />

      {/* Contact Us */}
      <div className="flex items-center justify-center max-w-5xl px-6 py-16 mx-auto h-1/2">
        <div className="px-8 py-12 bg-teal-500 rounded-md md:px-20">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Want to be part of the alpha?
            </h3>
            <p className="max-w-md pb-2 mt-4 text-teal-900">Drop us a line!</p>
          </div>
          <input
            className="w-full p-4 rounded-md"
            type="email"
            placeholder="email@email.com"
          />
        </div>
      </div>
    </>
  )
}

function TickerList() {
  const query = firestore.collection("tickers").where("isPopular", "==", true)
  const [querySnapshot] = useCollection(query)
  const tickers = querySnapshot?.docs.map((doc) => doc.data())

  return (
    <>
      {tickers &&
        tickers.map((ticker) => (
          <img
            key={ticker.ISIN}
            className="flex w-16 h-16 ml-4 rounded-full shadow-lg sm:ml-0 btn-transition"
            src={logoUrl(ticker.ISIN)}
            alt={`${ticker.tickerSymbol} logo`}
          />
        ))}
    </>
  )
}

function WhySocii() {
  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-br from-brand-light to-brand">
      <div className="max-w-5xl py-16 pl-4 sm:p-0">
        <h2 className="text-3xl font-extrabold text-gray-100 font-poppins">
          Investing with friends has never been easier!
        </h2>
        <div className="max-w-lg mx-auto mt-4 text-white leading-6">
          <p className="pr-4 font-thin">
            Investing with friends <span className="font-bold">used</span> to mean
            setting up an investment club, a cumbersome process filled with legal, tax &
            audit issues to worry about.
            <br />
            <br />
            With soc
            <span className="pr-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-brand-light font-poppins">
              ii
            </span>
            you dont have to worry about these. We handle
            <span className="font-bold"> everything</span> for you!
          </p>
        </div>
      </div>
    </section>
  )
}

function FeatureSlider() {
  const timelineHeadings = [
    {
      supTitle: "Social Investment Platform",
      title: "Find & Share Investment Ideas",
      description:
        "Chat with friends in group chats & forums about potential investments",
    },
    {
      supTitle: "Group Trade Execution",
      title: "Execute Trades Directly From Chat",
      description: "Use chat bot to set up & execute trades",
    },
    {
      supTitle: "Competitive Leagues",
      title: "Public Group Leaderboards",
      description: "Go head to head with and gain investment ideas from other groups",
    },
    {
      supTitle: "Incorporation Free",
      title: "No Incorporation",
      description: "No need to create a company just to invest with friends!",
    },
  ]
  return (
    <>
      <div className="py-8 text-black bg-gradient-to-t from-brand-teal to to-brand-lightGreen">
        <div className="container flex flex-col items-start mx-auto my-12 md:flex-row md:my-24">
          <div className="sticky flex flex-col w-full px-8 mt-2 md:top-36 lg:w-1/3 md:mt-12">
            <p className="text-xs uppercase text-brand-light tracking-loose font-poppins">
              Social Investing
            </p>
            <p className="mb-2 text-3xl font-extrabold leading-normal md:text-4xl md:leading-relaxed font-poppins">
              What is <Logo className="text-3xl md:text-4xl" />?
            </p>
            <p className="mb-4 text-sm text-black md:text-base"></p>
            <OutlineButton href="#" text="Explore Now" />
          </div>
          {/* Feature Slider */}
          <div className="sticky ml-0 md:ml-12 lg:w-2/3">
            <div className="container w-full h-full mx-auto">
              <div className="relative h-full p-10 overflow-hidden wrap">
                {/* Center Line */}
                <div className="absolute h-full border-2 border-teal-300 border-2-2 right-1/2"></div>
                <div className="absolute h-full border-2 border-teal-300 border-2-2 left-1/2"></div>
                {/* Headings */}
                {timelineHeadings.map((item, index) => {
                  return (
                    <div
                      key={`feature-${index}`}
                      className={`mb-8 flex justify-between ${
                        index % 2 == 0 ? "flex-row-reverse" : ""
                      } items-center w-full`}
                    >
                      <div className="order-1 w-5/12"></div>
                      <div className="order-1 w-5/12 px-1 py-4 text-right">
                        <p className="mb-3 text-sm text-brand-light font-poppins">
                          {item.supTitle}
                        </p>
                        <h4 className="mb-3 text-lg font-bold md:text-2xl font-poppins">
                          {item.title}
                        </h4>
                        <p className="text-xs leading-snug text-gray-500 md:text-base font-work-sans">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
