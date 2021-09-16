import ComingSoon from "@components/ComingSoon"
import React from "react"
import { FaBitcoin } from "react-icons/fa"

import { useAuth } from "@hooks/useAuth"

const url = "ws://server.socii.app/api/v1/alpaca/events/trades/stream"

// ! In tailwind jit compile the code is scanned and the color must be explicit
// ! so we need the following text-bitcoin bg-bitcoin border-bitcoin
const CryptoHome = ({ color = "bitcoin" }) => {
  const { user } = useAuth()
  const ws = React.useRef<WebSocket>(null)

  React.useEffect(() => {
    if (user?.token) {
      ws.current = new WebSocket(url + `?token=${user?.token}`)

      ws.current.onopen = () => console.log("ws opened")
      ws.current.onclose = () => console.log("ws closed")

      ws.current.onmessage = (e) => {
        console.log("ws.current.onmessage", e)
        try {
          const data = JSON.parse(e.data)
          console.log(data)
        } catch (error) {
          const message = e.data
          console.log("e", message)
        }
      }
      return () => ws.current.close()
    }
  }, [user?.token])

  return (
    <ComingSoon
      color={color}
      description="Alternative investment vehicles are important for a portfolios
      diversity. That is why we are pushing to bring crypto to socii as quickly as
      possible"
    >
      <FaBitcoin className={`w-24 h-24 text-${color}`} />
    </ComingSoon>
  )
}
export default CryptoHome
