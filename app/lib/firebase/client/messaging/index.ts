import { isBrowser } from "@utils/isBrowser"
import { getApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import localforage from "localforage"
import { initialize } from "../firebase"

let app
try {
  app = getApp()
} catch (e) {
  app = initialize()
}

export const messaging = isBrowser && getMessaging(app)

export const getFCMToken = async () => {
  const tokenInLocalForage = await localforage.getItem("fcm_token")
  if (tokenInLocalForage !== null) return tokenInLocalForage

  try {
    const status = await Notification.requestPermission()
    if (status && status === "granted") {
      const fcmToken = await getToken(messaging, {
        vapidKey:
          "BC8OI3ERe5qTNrtrOWIV9Q0GZV1nU2mG-OBOMezipuTh46CyOacNWSwMhZFS2cdy9t25p4iimTufumpOVHeOF4I",
      })
      console.log("FCM Token:", fcmToken)

      if (fcmToken) {
        localforage.setItem("fcm_token", fcmToken)
        return fcmToken
      }
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)))
