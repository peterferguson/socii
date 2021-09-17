import { tw } from "@utils/tw"
import Image from "next/image"
import React from "react"

const SociiIMG = ({
  height,
  width,
  className,
  onClick,
}: {
  height: string
  width: string
  className?: string
  onClick: () => void
}) => (
  <Image
    width={width || "16"}
    height={height || "16"}
    src="/favicons/favicon-128.png"
    priority
    className={tw(className)}
    onClick={onClick}
  />
)

export default SociiIMG
