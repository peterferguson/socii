import React from "react"

const SummaryCard = ({
  Title,
  subTitle,
  ImgComponent,
  iconColor,
  Heading,
  headingSubText,
}) => (
  <div className="h-32 mt-4 sm:h-40">
    <div
      className={`relative flex flex-col h-full mb-6 break-words border-l-2 border-${iconColor} bg-white shadow-lg max-w-[640px] sm:max-w-sm md:max-w-md rounded-2xl xl:mb-0`}
    >
      <div className="p-4 my-auto">
        <div className="relative flex">
          <div className="flex-1 flex-grow pr-4">
            <h5 className="text-xs font-bold uppercase text-blueGray-400">
              <Title />
            </h5>
            <span className="text-xl font-semibold text-blueGray-700">{subTitle}</span>
          </div>
          <div className="absolute top-0 right-0">
            <div
              className={`w-12 h-12 flex items-center justify-center text-white bg-${iconColor} rounded-full shadow-lg`}
            >
              <ImgComponent />
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-blueGray-400">
          <span className="flex mr-2">
            <Heading />
          </span>
          <span className="whitespace-nowrap"> {headingSubText}</span>
        </p>
      </div>
    </div>
  </div>
)

export default SummaryCard
