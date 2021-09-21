import React from "react"
import InfoTag from "./InformationTag/InformationTag"

interface SummaryCardProps {
  Title: string | React.FC
  subTitle: string
  ImgComponent: React.FC
  iconColor: string
  Heading: string | React.FC
  headingSubText: string
  InformationIcon?: React.FC
  informationTitle?: string
  InformationText?: string | React.FC
}

const SummaryCard = ({
  Title,
  subTitle,
  ImgComponent,
  iconColor,
  Heading,
  headingSubText,
  InformationIcon,
  informationTitle,
  InformationText,
}: SummaryCardProps) => (
  <div className="h-32 mt-4 sm:h-40">
    <div
      className={`relative flex flex-col h-full mb-6 break-words border-l-2 border-${iconColor} bg-white shadow-lg max-w-[640px] sm:max-w-sm md:max-w-md rounded-2xl xl:mb-0`}
    >
      <div className="p-4 my-auto">
        <div className="relative flex">
          <div className="flex-1 flex-grow pr-4">
            <h5 className="text-xs font-semibold text-gray-400 uppercase">
              <Title />
            </h5>
            <span className="text-2xl font-normal text-gray-700 font-primary">
              {subTitle}
            </span>
          </div>
          <div className="absolute top-0 right-0">
            <ImgComponent />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400 sm:mt-6">
          <span className="flex mr-2">
            <Heading />
          </span>
          <span className="whitespace-nowrap"> {headingSubText}</span>
        </p>
      </div>
      {InformationText && informationTitle && (
        <InfoTag
          className="absolute bottom-4 sm:bottom-6 right-6"
          InformationModalIcon={InformationIcon}
          informationTitle={informationTitle}
          InformationText={InformationText}
        />
      )}
    </div>
  </div>
)

export default SummaryCard
