import { useAuth } from "./useAuth"
import { useEffect, useState, useRef } from "react"

export const useTradeEvents = () => {
  // const url = "ws://server.socii.app/api/v1/alpaca/events/trades/stream";
  const url = "ws://localhost:5000/api/v1/alpaca/events/trades/stream"
  const { user } = useAuth()
  const ws = useRef<WebSocket>(null)
  const [listening, setListening] = useState<boolean>(false)
  const [tradeEvents, setTradeEvents] = useState<any[]>([])

  useEffect(() => {
    if (user?.token) {
      ws.current = new WebSocket(url + `?token=${user?.token}`)

      ws.current.onopen = () => setListening(true)
      ws.current.onclose = () => setListening(false)

      ws.current.onmessage = e => {
        try {
          const data = JSON.parse(e.data)
          setTradeEvents(prev => {
            return [...prev, data]
          })
        } catch (error) {
          const message = e.data
          console.log("e", message)
        }
      }
      return () => ws.current.close()
    }
  }, [user?.token])

  return { tradeEvents, listening }
}
