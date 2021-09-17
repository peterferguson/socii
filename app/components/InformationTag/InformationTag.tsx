import { InformationModalDynamic } from "@components/InformationModal"
import { tw } from "@utils/tw"
import React, { useState } from "react"

interface InformationTagProps {
  className: string
  InformationIcon: React.FC
  informationTitle: string
  InformationText: string | React.FC
}

const InformationTag = ({
  className,
  InformationIcon,
  informationTitle,
  InformationText,
}: InformationTagProps) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  return (
    <>
      <button
        className={tw(
          "flex items-center justify-center w-4 h-4 text-sm text-gray-100 bg-gray-300",
          "rounded-full",
          className
        )}
        onClick={openModal}
      >
        ?
      </button>
      <InformationModalDynamic
        isOpen={isOpen}
        closeModal={closeModal}
        InformationIcon={InformationIcon}
        InformationText={InformationText}
        informationTitle={informationTitle}
      />
    </>
  )
}

export default InformationTag
