import { isBrowser } from "@utils/isBrowser"
import { registerValidSW } from "@utils/registerValidSW"
import { updateServiceWorker } from "@utils/updateServiceWorker"
import { getApp } from "firebase/app"
import { getMessaging, getToken, isSupported, Messaging } from "firebase/messaging"
import { getFcmTokenFromFirebase } from "../db/getFcmTokenFromFirebase"
import { storeFcmToken } from "../db/storeFcmToken"
import { initialize } from "../firebase"

let app
try {
  app = getApp()
} catch (e) {
  app = initialize()
}

const initialiseMessaging = async () => {
  let messaging: Messaging | undefined
  if (isBrowser && (await isSupported())) messaging = getMessaging(app)
  return messaging
}

export const messaging = initialiseMessaging()

export const getFCMToken = async (uid: string) => {
  console.log("getting fcm token")
  "serviceWorker" in navigator &&
    registerValidSW("./firebase-messaging-sw.js", {
      onUpdate: updateServiceWorker,
    })
  const fcmTokenInFirebase = await getFcmTokenFromFirebase(uid)
  console.log("fcmTokenInFirebase", fcmTokenInFirebase)

  if (fcmTokenInFirebase) return fcmTokenInFirebase

  const messaging = await initialiseMessaging()

  console.log("notification permissions?")
  console.log(Notification.permission)

  try {
    const status = await Notification.requestPermission()
    if (status && status === "granted") {
      const fcmToken = await getToken(messaging, {
        vapidKey:
          "BC8OI3ERe5qTNrtrOWIV9Q0GZV1nU2mG-OBOMezipuTh46CyOacNWSwMhZFS2cdy9t25p4iimTufumpOVHeOF4I",
        // TODO: add this to env
      })

      if (fcmToken) {
        await storeFcmToken(uid, fcmToken)
        return fcmToken
      }
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
