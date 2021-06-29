import React from "react"
import OutlineButton from "@components/OutlineButton"
import Logo from "@components/Logo"

export default function FeatureSlider() {
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
      <div className="py-8 text-black bg-gradient-to-t from-lightTeal to to-brandGreen">
        <div className="container flex flex-col items-start mx-auto my-12 md:flex-row md:my-24">
          <div className="sticky flex flex-col w-full px-8 mt-2 md:top-36 lg:w-1/3 md:mt-12">
            <p className="text-xs uppercase text-brand tracking-loose font-poppins">
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
                        <p className="mb-3 text-sm text-brand font-poppins">
                          {item.supTitle}
                        </p>
                        <div className="mb-3 text-lg font-bold md:text-2xl font-poppins">
                          {item.title}
                        </div>
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
