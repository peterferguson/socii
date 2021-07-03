import React from "react"

export default function WhySocii() {
  return (
    <section className="flex items-center justify-center h-screen bg-brand-shade-blue">
      <div className="w-2/3 pl-4 h-2/3 sm:p-0">
        <h2 className="mt-12 text-4xl font-extrabold text-gray-100 font-poppins">
          Investing with friends
        </h2>
        <h2 className="mb-12 text-4xl font-extrabold text-gray-100 font-poppins">
          has never been easier!
        </h2>
        <div className="max-w-lg mt-4 text-xl text-white leading-7">
          <p className="pr-4 font-thin">
            Before <span className="font-bold">socii</span> being able to invest with
            friends meant setting up an investment club. A cumbersome process with
            legal, tax & audit issues to worry about.
            <br />
            <br />
            Our process makes getting started as easy as:
            <ul className="mt-4 font-bold font-poppins ">
              <li>&nbsp;&nbsp;&nbsp;&nbsp; 1 &nbsp;&nbsp;&nbsp;&nbsp; Sign-up</li>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;2 &nbsp;&nbsp;&nbsp;&nbsp; Invite your friends
              </li>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;3 &nbsp;&nbsp;&nbsp;&nbsp; Start investing!
              </li>
            </ul>
          </p>
        </div>
      </div>
    </section>
  )
}

export function OneTwoThree() {
  return (
    <section className="flex items-center justify-center h-screen mx-auto bg-gradient-to-l from-brand-natural-lightest to-brand-natural-light">
      <div className="container p-4 mx-auto max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800">
        <div className="flex flex-wrap -mx-8">
          <div className="w-full px-8 lg:w-1/2">
            <div className="pb-12 mb-12 border-b lg:mb-0 lg:pb-0 lg:border-b-0">
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl font-heading dark:text-white">
                Investing with friends has never been easier!
              </h2>
              <p className="mb-8 leading-loose text-gray-600 dark:text-gray-300">
                Before <span className="font-bold">socii</span> being able to invest
                with friends meant setting up an investment club. A cumbersome process
                with legal, tax & audit issues to worry about
              </p>
              {/* <div className="w-full md:w-1/3">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-base font-semibold text-center text-white rounded-lg shadow-md bg-brand hover:bg-brand-cyan-green focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  See more
                </button>
              </div> */}
            </div>
          </div>
          <div className="w-full px-8 lg:w-1/2">
            <ul className="space-y-12">
              <li className="flex p-2 -mx-4 border-2 border-transparent rounded-xl transition duration-300 hover:border-brand hover:btn-transition animate-fade-in-down">
                <div className="px-4">
                  <span className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold rounded-full text-brand font-heading bg-brand-natural-dark/10">
                    1
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">
                    Sign Up
                  </h3>
                  <p className="leading-loose text-gray-600 dark:text-gray-300">
                    All elements are responsive and provide the best display in all
                    screen size. It&#x27;s magic !
                  </p>
                </div>
              </li>
              <li className="flex p-2 -mx-4 border-2 border-transparent rounded-xl transition duration-300 hover:border-brand hover:btn-transition animate-fade-in-down ">
                <div className="px-4">
                  <span className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold rounded-full text-brand font-heading bg-brand-natural-dark/10">
                    2
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">
                    Invite Your Friends
                  </h3>
                  <p className="leading-loose text-gray-600 dark:text-gray-300">
                    Flexibility is the key. All team is available 24/24 and joinable
                    every day on our hotline.
                  </p>
                </div>
              </li>
              <li className="flex p-2 -mx-4 border-2 border-transparent rounded-xl transition duration-300 hover:border-brand hover:btn-transition animate-fade-in-down ">
                <div className="px-4">
                  <span className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold rounded-full text-brand font-heading bg-brand-natural-dark/10">
                    3
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold dark:text-white">
                    Start Investing Together
                  </h3>
                  <p className="leading-loose text-gray-600 dark:text-gray-300">
                    Our Software are ecologic and responsable. Green is not just a
                    color, it&#x27;s a way of life.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
