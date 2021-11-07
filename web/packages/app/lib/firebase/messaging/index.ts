// import messaging from "@react-native-firebase/messaging"
import logger from "../../../utils/logger"
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
// import { requestNotifications } from "react-native-permissions"
// import { Alert } from "../../../components/Alerts"
import { getLocal, saveLocal } from "../../../handlers/localstorage/common"

// - With rnfirebase
// export const getFCMToken = async () => {
//   const fcmTokenLocal = await getLocal("sociiFcmToken")
//   const fcmToken = fcmTokenLocal?.data
//   if (!fcmToken) throw new Error("Push notification token unavailable.")
//   return fcmToken
// }

// export const saveFCMToken = async () => {
//   try {
//     const permissionStatus = await getPermissionStatus()
//     if (
//       permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       permissionStatus === messaging.AuthorizationStatus.PROVISIONAL
//     ) {
//       const fcmToken = await messaging().getToken()
//       if (fcmToken) saveLocal("sociiFcmToken", { data: fcmToken })
//     }
//   } catch (error) {
//     logger.log("error while getting & saving FCM token", error)
//   }
// }

// export const getPermissionStatus = () => messaging().hasPermission()

// export const requestPermission = () => {
//   return new Promise((resolve, reject) => {
//     requestNotifications(["alert", "sound", "badge"])
//       .then(({ status }) => resolve(status === "granted"))
//       .catch(e => reject(e))
//   })
// }

// export const checkPushNotificationPermissions = async () => {
//   return new Promise(async resolve => {
//     let permissionStatus = null
//     try {
//       permissionStatus = await getPermissionStatus()
//     } catch (error) {
//       logger.log("Error checking if a user has push notifications permission", error)
//     }

//     if (
//       permissionStatus !== messaging.AuthorizationStatus.AUTHORIZED &&
//       permissionStatus !== messaging.AuthorizationStatus.PROVISIONAL
//     ) {
//       Alert({
//         buttons: [
//           {
//             onPress: async () => {
//               try {
//                 await requestPermission()
//                 await saveFCMToken()
//               } catch (error) {
//                 logger.log("ERROR while getting permissions", error)
//               } finally {
//                 resolve(true)
//               }
//             },
//             text: "Okay",
//           },
//           {
//             onPress: async () => resolve(true),
//             style: "cancel",
//             text: "Dismiss",
//           },
//         ],

//         message:
//           "Please enable push notifications to be notified of transactions & messages.",
//         title: "socii would like to send you push notifications",
//       })
//     } else resolve(true)
//   })
// }

// export const registerTokenRefreshListener = () =>
//   messaging().onTokenRefresh(fcmToken => saveLocal("sociiFcmToken", { data: fcmToken }))

// - With expo-notifications

export const getExpoToken = async () => {
  const expoTokenLocal = await getLocal("sociiExpoToken")
  const expoToken = expoTokenLocal?.data
  if (!expoToken) throw new Error("Push notification token unavailable.")
  return expoToken
}

export const saveExpoToken = async () => {
  try {
    const expoToken = (await Notifications.getExpoPushTokenAsync()).data
    logger.log("expoToken", expoToken)
    if (expoToken) saveLocal("sociiExpoToken", { data: expoToken })
  } catch (error) {
    logger.log("error while saving Expo token", error)
  }
}

export const getExpoPermissionStatus = () => Notifications.getPermissionsAsync()

export const requestExpoPermission = () => Notifications.requestPermissionsAsync()

export const checkExpoPushNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await getExpoPermissionStatus()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await requestExpoPermission()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
  } catch (error) {
    logger.log("error while saving Expo token", error)
  }
}

export const registerExpoTokenRefreshListener = () =>
  Notifications.addPushTokenListener(token => {
    if (token) saveLocal("sociiExpoToken", { data: token.data })
  })

export const registerForExpoNotifications = async () => {
  if (!Constants.isDevice) {
    return Promise.reject("Must use physical device for Push Notifications")
  }

  try {
    await checkExpoPushNotificationPermissions()
    await saveExpoToken()
  } catch (error) {
    logger.log("error while registering for Expo notifications", error)
  }
}
