import { functions } from ".."
import { httpsCallable } from "firebase/functions"

// process.env.NODE_ENV === "development" &&
//   connectFunctionsEmulator(functions, "localhost", 5001)

// - Callable Functions
export const alphaVantageQuery = httpsCallable(functions, "alphaVantageQuery")
export const tradeSubmission = httpsCallable(functions, "tradeSubmission")
export const tradeConfirmation = httpsCallable(functions, "tradeConfirmation")
export const createAccount = httpsCallable(functions, "createAccount")
export const updateUserData = httpsCallable(functions, "updateUserData")
