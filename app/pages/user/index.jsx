import React from "react"
import { FaUserInjured } from "react-icons/fa"
import ComingSoon from "../../components/ComingSoon"

export default function Portfolio() {
  // ! In tailwind jit compile the code is scanned and the color must be explicit 
  // ! so we need the following text-brand-pink bg-brand-pink border-brand-pink
  const color = "brand-pink"
  return (
    <ComingSoon color={color}>
      <FaUserInjured className={`w-24 h-24 text-${color}`} />
    </ComingSoon>
  )
}
