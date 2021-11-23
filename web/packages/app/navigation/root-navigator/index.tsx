import { useAppContext } from "app/hooks/useAppContext"
import OnboardingScreen from "app/screens/onboarding"
import { headerScreenOptions } from "app/utils/headerScreenOptions"
import { DrawerNavigator } from "../drawer-navigator"
import { NextNavigationProps } from "../types"
import { RootStack } from "./types"

export const RootNavigator = (props: NextNavigationProps) => {
  const { onboardingCompleted } = useAppContext()

  return (
    <RootStack.Navigator
      initialRouteName={onboardingCompleted ? "drawer" : "onboarding"}
      screenOptions={{ headerShown: false, ...headerScreenOptions }}
    >
      {!onboardingCompleted ? (
        <RootStack.Screen
          name="onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStack.Screen
          name="drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  )
}
