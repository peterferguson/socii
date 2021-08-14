import { getApp } from "firebase/app"
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions"
import { initialize, londonRegion } from "../firebase"

let app
try {
  app = getApp()
} catch (e) {
  app = initialize()
}

export const functions = getFunctions(app, londonRegion)

process.env.NODE_ENV === "development" &&
  connectFunctionsEmulator(functions, "localhost", 5001)

// - Callable Functions
export const alphaVantageQuery = httpsCallable(functions, "alphaVantageQuery")
export const tradeSubmission = httpsCallable(functions, "tradeSubmission")
export const tradeConfirmation = httpsCallable(functions, "tradeConfirmation")
export const createAccount = httpsCallable(functions, "createAccount")
