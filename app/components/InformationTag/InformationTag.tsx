import { InformationModalDynamic } from "@components/InformationModal"
import { tw } from "@utils/tw"
import React, { useState } from "react"

interface BaseProps {
  InformationModalIcon?: React.FC<{ onClick: () => void }>
  informationTitle: string
  InformationText: string | React.FC
}

interface InformationTagProps extends BaseProps {
  className: string
}
interface InformationIconTagProps extends BaseProps {
  className?: string
  InformationIcon?: React.FC<{ onClick: () => void }>
}

const InformationTag = ({
  className,
  InformationModalIcon,
  informationTitle,
  InformationText,
}: InformationTagProps) => {
  return (
    <InformationIconTag
      InformationIcon={({ onClick }) => (
        <button
          className={tw(
            "flex items-center justify-center w-4 h-4 text-sm text-gray-100 bg-gray-300",
            "rounded-full",
            className
          )}
          onClick={onClick}
        >
          ?
        </button>
      )}
      InformationModalIcon={InformationModalIcon}
      InformationText={InformationText}
      informationTitle={informationTitle}
    />
  )
}

export default InformationTag

export const InformationIconTag = ({
  InformationIcon,
  InformationModalIcon,
  informationTitle,
  InformationText,
}: InformationIconTagProps) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  return (
    <>
      <InformationIcon onClick={openModal} />
      <InformationModalDynamic
        isOpen={isOpen}
        closeModal={closeModal}
        InformationModalIcon={InformationModalIcon}
        InformationText={InformationText}
        informationTitle={informationTitle}
      />
    </>
  )
}
