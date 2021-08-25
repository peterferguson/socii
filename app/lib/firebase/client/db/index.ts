import { getApp } from "@firebase/app"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
import { initialize } from "../firebase"

let app
try {
  app = getApp()
} catch (e) {
  app = initialize()
}

export const firestore = getFirestore(app)

process.env.NODE_ENV === "development" &&
  connectFirestoreEmulator(firestore, "localhost", 8080)

export { agreesToTrade } from "./agreesToTrade"
export { createGroup } from "./createGroup"
export { createUser } from "./createUser"
export { getAlpacaStocks } from "./getAlpacaStocks"
export { getAlphaVantageData } from "./getAlphaVantageData"
export { getGroupDocsByName } from "./getGroupDocsByName"
export { getLastMarketDay } from "./getLastMarketDay"
export { getMainPageStocks } from "./getMainPageStocks"
export { getPopularTickersDocs } from "./getPopularTickersDocs"
export { getTickerData } from "./getTickerData"
export { getTickerDocs } from "./getTickerDocs"
export { getTickerTimeseriesDocs } from "./getTickerTimeseriesDocs"
export { getUserStreamToken } from "./getUserStreamToken"
export { getUserWithUsername } from "./getUserWithUsername"
export { groupNameExists } from "./groupNameExists"
export { setHoldingData } from "./setHoldingData"
export { setMarketDay } from "./setMarketDay"
export { setUserState } from "./setUserState"
export { tickerToISIN } from "./tickerToISIN"
export { usernameExists } from "./usernameExists"
