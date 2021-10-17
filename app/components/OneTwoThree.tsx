import { useIntersectionObserver } from "@hooks/useIntersectionObserver"
import React, { useRef } from "react"
import { Transition } from "@headlessui/react"
import { useMediaQuery } from "react-responsive"

const steps = [
  {
    heading: "Sign Up",
    subheading: "Simply connect with your Google account.",
  },
  {
    heading: "Invite Your Friends",
    subheading: "Ask your friends join your group.",
  },
  {
    heading: "Start Investing Together",
    subheading: "Start discussing & placing orders!",
  },
]

const OneTwoThree = () => {
  const [animated, setAnimated] = React.useState(false)

  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  const titleEntry = useIntersectionObserver(titleRef, {})
  const cardsEntry = useIntersectionObserver(cardsRef, {})

  const titleVisible = !!titleEntry?.isIntersecting
  const cardsVisible = !!cardsEntry?.isIntersecting

  const is1Col = useMediaQuery({ minWidth: 640 })

  return (
    <div className="relative h-full">
      <section className="relative h-full max-h-full p-4 pt-20">
        <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-tr via-white from-palette-lightest to-white" />
        <div className="relative flex p-4 max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800">
          <div className="flex flex-wrap">
            <div className="w-full px-8">
              <div className="pb-0 mb-0 sm:mb-12 sm:pb-12" ref={titleRef}>
                <Transition show={titleVisible || animated}>
                  <Transition.Child
                    appear={true}
                    as="h2"
                    className="mb-4 text-2xl text-center text-black font-primary sm:text-5xl leading-10"
                    enter="transition transform delay-500 duration-700 ease-in"
                    enterFrom="skew-y-8 translate-y-24 opacity-0"
                    enterTo="translate-y-0 opacity-100"
                  >
                    {`Investing together ${is1Col ? "has never been easier!" : ""}`}
                    <h3 className="block mt-1 text-lg font-thin sm:hidden">
                      has never been easier!
                    </h3>
                  </Transition.Child>
                  <Transition.Child
                    enter="transition transform delay-700 duration-1000 ease-in"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    as="div"
                    className="w-full mx-auto my-8 text-gray-600 sm:w-2/3 text-tiny dark:text-gray-300 sm:text-sm md:text-base"
                  >
                    Before <span className="font-semibold">socii</span>, investing with
                    friends meant setting up an investment club. A clumsy process with
                    many legal, regulatory & auditory issues to worry about. Now all you have to do is...
                  </Transition.Child>
                </Transition>
              </div>
            </div>
            <div
              className="w-full max-w-sm px-8 mx-auto lg:w-1/2 sm:max-w-xl"
              ref={cardsRef}
            >
              <ul className="mt-4 mb-24 space-y-8 font-primary">
                {[0, 1, 2].map((i) => (
                  <Transition
                    as="li"
                    key={i}
                    className="relative group"
                    show={cardsVisible || animated}
                    enter="transition transform delay-1000 duration-700 ease-in"
                    enterFrom="opacity-0 translate-y-24"
                    enterTo="translate-y-0"
                    afterEnter={() => setAnimated(true)}
                  >
                    <div className="absolute opacity-50 -inset-0.5 bg-gradient-to-r from-brand to-brand-teal group-hover:-inset-1 group-hover:opacity-100 rounded-2xl blur transition duration-500 group-hover:duration-200" />
                    <div className="relative flex p-2 bg-gray-50 rounded-2xl transition duration-1000 group-hover:btn-transition">
                      <div className="w-full px-4 grid grid-cols-5 place-items-center">
                        <span className="-ml-4 text-2xl font-semibold text-gray-500 rounded-full group-hover:text-transparent col-span-1 group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-brand-teal group-hover:bg-clip-text">
                          {i + 1}
                        </span>
                        <div className="p-0 col-span-4 col-start-2 sm:p-2">
                          <h3 className="mt-2 text-sm font-semibold dark:text-white sm:text-xl">
                            {steps[i].heading}
                          </h3>
                          <p className="leading-loose text-gray-500 text-tiny dark:text-gray-300 sm:text-base">
                            {steps[i].subheading}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Transition>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BottomWaveSeparator className="sm:h-12 text-palette-lightest" />
      {/* <WavesSeparator className="absolute bottom-0 left-0" /> */}
    </div>
  )
}
export default OneTwoThree

const BottomWaveSeparator = ({ className }) => (
  <div className={`bottom-wave ${className}`}>
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        opacity=".125"
      />
      <path
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
        opacity=".3"
      />
      <path
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        opacity=".8"
      />
    </svg>
  </div>
)

const WavesSeparator = ({ className }) => (
  <div className={`haikai-wave ${className}`}>
    <svg
      id="visual"
      viewBox="0 0 900 600"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <path
        d="M0 521L25 519.3C50 517.7 100 514.3 150 512.5C200 510.7 250 510.3 300 508.7C350 507 400 504 450 507.2C500 510.3 550 519.7 600 526.5C650 533.3 700 537.7 750 534C800 530.3 850 518.7 875 512.8L900 507L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z"
        fill="#33ffaa"
      />
      <path
        d="M0 540L25 540.8C50 541.7 100 543.3 150 541.8C200 540.3 250 535.7 300 534.8C350 534 400 537 450 540.3C500 543.7 550 547.3 600 544.3C650 541.3 700 531.7 750 531C800 530.3 850 538.7 875 542.8L900 547L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z"
        fill="#00eddd"
      />
      <path
        d="M0 550L25 552.7C50 555.3 100 560.7 150 563.5C200 566.3 250 566.7 300 565.3C350 564 400 561 450 560.7C500 560.3 550 562.7 600 561.2C650 559.7 700 554.3 750 552.7C800 551 850 553 875 554L900 555L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z"
        fill="#00d5ee"
      />
      <path
        d="M0 583L25 583.8C50 584.7 100 586.3 150 583.2C200 580 250 572 300 567.8C350 563.7 400 563.3 450 566C500 568.7 550 574.3 600 575.2C650 576 700 572 750 573.5C800 575 850 582 875 585.5L900 589L900 601L875 601C850 601 800 601 750 601C700 601 650 601 600 601C550 601 500 601 450 601C400 601 350 601 300 601C250 601 200 601 150 601C100 601 50 601 25 601L0 601Z"
        fill="#3fbaeb"
      />
    </svg>
  </div>
)
