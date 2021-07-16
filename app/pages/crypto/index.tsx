import ComingSoon from "@components/ComingSoon"
import { useAuth } from "@hooks/useAuth"
import { fetcher } from "@utils/fetcher"
import React, { useEffect, useState } from "react"
import { FaBitcoin } from "react-icons/fa"

export default function CryptoHome() {
  // ! In tailwind jit compile the code is scanned and the color must be explicit
  // ! so we need the following text-bitcoin bg-bitcoin border-bitcoin
  const color = "bitcoin"
  const { user } = useAuth()
  const [data, setData] = useState(null)

  useEffect(() => {
    if (user?.token)
      fetcher("/api/alpaca/assets", {
        method: "POST",
        headers: { Authorization: `Basic ${user.token}` },
        body: JSON.stringify({ symbol: "TSLA" }),
      }).then((r) => setData(r))
  }, [user?.token])

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
      {!data ? <div>loading...</div> : <div>{JSON.stringify(data)}</div>}
    </>
  )
}
