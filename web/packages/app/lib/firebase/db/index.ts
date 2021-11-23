// process.env.NODE_ENV === "development" &&
//   connectFirestoreEmulator(firestore, "localhost", 8080)

export { Timestamp } from "firebase/firestore"
export { checkGroupNameExists } from "./checkGroupNameExists"
export { createGroup } from "./createGroup"
export { getAssetCategories } from "./getAssetCategories"
export { getAssetData } from "./getAssetData"
export { getAssetDocs } from "./getAssetDocs"
export { getGroupData } from "./getGroupData"
export { getTickerISIN } from "./getTickerISIN"
export { getUsernameWithEmail } from "./getUsernameWithEmail"
export { getUserStreamToken } from "./getUserStreamToken"
export { getUserWithUsername } from "./getUserWithUsername"
export { inviteInvestorToGroup } from "./inviteInvestorToGroup"
export { setAgreesToTrade } from "./setAgreesToTrade"
export { setUserState } from "./setUserState"
export { storeFailedLogin } from "./storeFailedLogin"
export { subscribeToTrade } from "./subscribeToTrade"
