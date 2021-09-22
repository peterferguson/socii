import ComingSoon from "@components/ComingSoon"
import React from "react"
import { FaBitcoin } from "react-icons/fa"

// ! In tailwind jit compile the code is scanned and the color must be explicit
// ! so we need the following text-bitcoin bg-bitcoin border-bitcoin
const CryptoHome = ({ color = "bitcoin" }) => {
  return (
    <ComingSoon
      color={color}
      description="Alternative investment vehicles are important for a portfolios
      diversity. That is why we are pushing to bring crypto to socii as quickly as
      possible"
    >
      <FaBitcoin className={`w-16 sm:w-24 h-16 sm:h-24 text-${color}`} />
    </ComingSoon>
  )
}
export default CryptoHome
