import React from "react"
import { FaUserInjured } from "react-icons/fa"
import ComingSoon from "../../components/ComingSoon"

export default function Portfolio() {
  const color = "brand-pink"
  return (
    <ComingSoon color={color}>
      <FaUserInjured className={`w-24 h-24 text-${color}`} />
    </ComingSoon>
  )
}
