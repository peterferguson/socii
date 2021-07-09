import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "@lib/context"
import { FaBitcoin } from "react-icons/fa"
import ComingSoon from "../../components/ComingSoon"
import { AssetsApi, Configuration } from "@lib/alpaca/test"

export default function CryptoHome() {
  // ! In tailwind jit compile the code is scanned and the color must be explicit
  // ! so we need the following text-bitcoin bg-bitcoin border-bitcoin
  const color = "bitcoin"
  const [body, setBody] = useState(null)
  const { user } = useContext(UserContext)
  const config = new Configuration({
    username: process.env.NEXT_PUBLIC_ALPACA_KEY,
    password: process.env.NEXT_PUBLIC_ALPACA_SECRET,
  })

  // console.log(user.getIdToken());

  const assetClient = new AssetsApi(config)

  useEffect(() => {
    assetClient.assetsSymbolGet({ symbol: "TSLA" }).then(({ body }) => setBody(body))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
