import createStackNavigator from "../create-stack-navigator"

export type RootNavigatorParams = {
  drawer: undefined
  onboarding: undefined
}

export const RootStack = createStackNavigator<RootNavigatorParams>()
