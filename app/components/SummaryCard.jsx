import React from "react"

export default function SummaryCard({
  Title,
  subTitle,
  ImgComponent,
  headingColor,
  Heading,
  headingSubText,
}) {
  return (
    <div className="h-40 px-4 mt-4">
      <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white shadow-lg max-w-[235px] rounded-2xl xl:mb-0">
        <div className="flex-auto p-4">
          <div className="flex">
            <div className="relative flex-1 flex-grow w-full max-w-full pr-4">
              <h5 className="text-xs font-bold uppercase text-blueGray-400">
                <Title />
              </h5>
              <span className="text-xl font-semibold text-blueGray-700">
                {subTitle}
              </span>
            </div>
            <div className="relative flex-initial w-auto pl-4">
              <ImgComponent />
            </div>
          </div>
          <p className="mt-4 text-sm text-blueGray-400">
            <span className={`${headingColor} mr-2 flex`}>
              <Heading />
            </span>
            <span className="whitespace-nowrap"> {headingSubText}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
