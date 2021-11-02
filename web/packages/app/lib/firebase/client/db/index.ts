// process.env.NODE_ENV === "development" &&
//   connectFirestoreEmulator(firestore, "localhost", 8080)

export { Timestamp } from "firebase/firestore"
export { setAgreesToTrade } from "./setAgreesToTrade"
export { getAssetCategories } from "./getAssetCategories"
export { getAssetData } from "./getAssetData"
export { getAssetDocs } from "./getAssetDocs"
export { setUserState } from "./setUserState"
export { getTickerISIN } from "./getTickerISIN"
export { storeFailedLogin } from "./storeFailedLogin"
export { getUserStreamToken } from "./getUserStreamToken"
export { getUsernameWithEmail } from "./getUsernameWithEmail"
export { subscribeToTrade } from "./subscribeToTrade"
