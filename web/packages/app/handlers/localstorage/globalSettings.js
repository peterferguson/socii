import { getGlobal, saveGlobal } from "./common"

const NATIVE_CURRENCY = "nativeCurrency"
const KEYCHAIN_INTEGRITY_STATE = "keychainIntegrityState"
const AUTH_TIMELOCK = "authTimelock"
const PIN_AUTH_ATTEMPTS_LEFT = "pinAuthAttemptsLeft"

export const getKeychainIntegrityState = () => getGlobal(KEYCHAIN_INTEGRITY_STATE, null)

export const saveKeychainIntegrityState = state =>
  saveGlobal(KEYCHAIN_INTEGRITY_STATE, state)

export const getAuthTimelock = () => getGlobal(AUTH_TIMELOCK, null)

export const saveAuthTimelock = ts => saveGlobal(AUTH_TIMELOCK, ts)

export const getPinAuthAttemptsLeft = () => getGlobal(PIN_AUTH_ATTEMPTS_LEFT, null)

export const savePinAuthAttemptsLeft = amount =>
  saveGlobal(PIN_AUTH_ATTEMPTS_LEFT, amount)

export const getNativeCurrency = () => getGlobal(NATIVE_CURRENCY, "USD")

export const saveNativeCurrency = nativeCurrency =>
  saveGlobal(NATIVE_CURRENCY, nativeCurrency)
