/* eslint-disable react/display-name */
import { UserContext } from "@lib/context"
import { firestore } from "@lib/firebase"
import { logoUrl } from "@utils/helper"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

const WhySocii = dynamic(() => import("@components/WhySocii"), {
  loading: () => <p>...</p>,
  ssr: false,
})
const SociiFeatureSlider = dynamic(() => import("@components/SociiFeatureSlider"), {
  loading: () => <p>...</p>,
  ssr: false,
})

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
              onClick={() => router.push(user ? "/stocks" : "/enter")}
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
      <SociiFeatureSlider />

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
