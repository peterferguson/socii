import React from "react"
import { FaBitcoin } from "react-icons/fa"
import ComingSoon from "../../components/ComingSoon"

export default function CryptoHome() {
  const color = "bitcoin"
  return (
    <ComingSoon
      color={color}
      description="Alternative investment vechicles are important for a portfolios
      diversity. That is why we are pushing to bring crypto to socii as quickly as
      possible"
    >
      <FaBitcoin className={`w-24 h-24 text-${color}`} />
    </ComingSoon>
  )
}
