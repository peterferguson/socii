import React, { useState, useEffect, useContext } from "react"
import { fetcher } from "@utils/helper"
import { UserContext } from "@lib/context"
import { FaBitcoin } from "react-icons/fa"
import ComingSoon from "../../components/ComingSoon"
import useSWR from "swr"

export default function CryptoHome() {
  // ! In tailwind jit compile the code is scanned and the color must be explicit
  // ! so we need the following text-bitcoin bg-bitcoin border-bitcoin
  const color = "bitcoin"
  const [body, setBody] = useState(null)
  const { user } = useContext(UserContext)

  const { data, error } = useSWR(
    user ? ["/api/alpaca/TSLA", user.getIdToken()] : null,
    fetcher
  )

  console.log(data);
  

  return (
    <>
      <ComingSoon
        color={color}
        description="Alternative investment vechicles are important for a portfolios
      diversity. That is why we are pushing to bring crypto to socii as quickly as
      possible"
      >
        <FaBitcoin className={`w-24 h-24 text-${color}`} />
      </ComingSoon>
      <div className="text-3xl">{body}</div>
    </>
  )
}
