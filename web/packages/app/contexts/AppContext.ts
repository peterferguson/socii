import { createContext } from "react"

export interface AppContext {
  onboardingCompleted: boolean
}

export const AppContext = createContext({
  onboardingCompleted: undefined,
} as AppContext)
