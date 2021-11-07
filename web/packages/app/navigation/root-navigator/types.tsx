import createStackNavigator from "../create-stack-navigator"

export type RootNavigatorParams = {
  withBottomBar: undefined
  onboarding: undefined
  channel: { channelId: string }
  thread: { threadId: string }
}

export const RootStack = createStackNavigator<RootNavigatorParams>()
