import ComingSoon from "@components/ComingSoon"
import React from "react"
import { FaBitcoin } from "react-icons/fa"

export default function CryptoHome() {
  // ! In tailwind jit compile the code is scanned and the color must be explicit
  // ! so we need the following text-bitcoin bg-bitcoin border-bitcoin
  const color = "bitcoin"

  return (
    <>
      <ComingSoon
        color={color}
        description="Alternative investment vehicles are important for a portfolios
      diversity. That is why we are pushing to bring crypto to socii as quickly as
      possible"
      >
        <FaBitcoin className={`w-24 h-24 text-${color}`} />
      </ComingSoon>
    </>
  )
}
