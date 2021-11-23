import { Platform } from "react-native"

export const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56

// we provide this bc ios allows overscrolling but android doesn't
// so on ios because of pull to refresh / rubberbaanding we set scroll pos to negtaive header pos
// on android we set to 0 and makeup header height diff with contentinset padding
export const HEADER_OFFSET = Platform.OS === "ios" ? -HEADER_HEIGHT : 0
