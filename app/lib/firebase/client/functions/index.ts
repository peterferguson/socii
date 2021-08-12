import { app, londonRegion } from "../firebase"
import { getFunctions, httpsCallable } from "firebase/functions"

const functions = getFunctions(app, londonRegion)

// - Callable Functions
export const alphaVantageQuery = httpsCallable(functions, "alphaVantageQuery")
export const tradeSubmission = httpsCallable(functions, "tradeSubmission")
export const tradeConfirmation = httpsCallable(functions, "tradeConfirmation")
export const createAccount = httpsCallable(functions, "createAccount")
