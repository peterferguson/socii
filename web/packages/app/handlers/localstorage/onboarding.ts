import { getLocal, saveLocal } from "./common"

const onboardingVersion = "0.1.0"

const ONBOARDING_COMPLETED = "onboardingCompleted"

export const getOnboardingComplete = () =>
  getLocal(ONBOARDING_COMPLETED, onboardingVersion)

export const saveOnboardingComplete = (onboardingComplete: boolean) =>
  saveLocal(ONBOARDING_COMPLETED, onboardingComplete, onboardingVersion)
