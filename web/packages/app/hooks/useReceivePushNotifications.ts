import { useEffect } from "react"
import { isBrowser } from "../utils/isBrowser"
import { messaging as messagingPromise } from "../lib/firebase/client/messaging"
import { onMessage } from "../firebase/messaging"
import toast from "react-hot-toast"

const useReceivePushNotifications = () => {
  // - receive push notifications
  useEffect(() => {
    let unsub
    if (isBrowser) {
      messagingPromise.then((messaging) => {
        if (messaging) {
          unsub = onMessage(messaging, (payload) => {
            console.log(payload)

            const {
              notification: { title, body },
            } = payload

            toast(`${title}, ${body}`)
          })
        }
      })
    }
    return () => unsub?.()
  }, [])
}

export default useReceivePushNotifications
