import Image, { ImageProps } from "next/image"
import React from "react"

const SociiIMG = ({ height, width }: { height: string; width: string }) => (
  <Image
    width={width || "16"}
    height={height || "16"}
    src="/favicons/favicon-128.png"
    priority
  />
)

export default SociiIMG
