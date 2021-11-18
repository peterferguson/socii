import { createContext } from "react"

export interface AppContext {
  onboardingCompleted: boolean
}

export const AppContext = createContext({} as AppContext)
