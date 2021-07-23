import React from "react"

export function OneTwoThree() {
  const steps = [
    {
      heading: "Sign Up",
      subheading: "Get a free account to start Investing with friends.",
    },
    {
      heading: "Invite Your Friends",
      subheading: "Invite your friends to join your investment club.",
    },
    {
      heading: "Start Investing Together",
      subheading:
        "Once everyone is signed up, simply start discussing & placing orders!",
    },
  ]
  return (
    <section className="flex items-center justify-center h-screen mx-auto bg-gradient-to-l from-brand-light-est to-brand-light">
      <div className="container p-4 mx-auto max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800">
        <div className="flex flex-wrap -mx-8">
          <div className="w-full px-8 lg:w-1/2">
            <div className="pb-12 mb-12 border-b lg:mb-0 lg:pb-0 lg:border-b-0">
              <h2 className="mb-4 text-4xl font-bold lg:text-4xl font-heading dark:text-white">
                Investing with friends
              </h2>
              <h2 className="mb-4 text-4xl font-extrabold text-transparent bg-gradient-to-r bg-clip-text to-brand-lightGreen from-brand via-brand-cyan-vivid lg:text-4xl font-heading dark:text-white">
                has never been easier!
              </h2>
              {/* <div className="bg-brand/30 h-12 w-92"/> */}
              <p className="mb-8 leading-loose text-gray-600 dark:text-gray-300">
                Before <span className="font-bold">socii</span> investing with friends
                meant setting up an investment club. A clumsy process with many legal,
                tax & auditory issues to worry about
              </p>
            </div>
          </div>
          <div className="w-full px-8 lg:w-1/2">
            <ul className="space-y-12">
              {[0, 1, 2].map((i) => (
                <li
                  key={i}
                  className="flex p-2 -mx-4 border-2 border-transparent rounded-xl transition duration-300 hover:border-brand hover:btn-transition animate-fade-in-down"
                >
                  <div className="px-4">
                    <span className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold rounded-full text-brand font-heading bg-brand-natural-dark/5">
                      {i + 1}
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold dark:text-white">
                      {steps[i].heading}
                    </h3>
                    <p className="leading-loose text-gray-600 dark:text-gray-300">
                      {steps[i].subheading}
                    </p>
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
