import createStackNavigator from "../create-stack-navigator"

export type MainNavigatorParams = {
  withBottomBar: undefined
  channel: { channelId: string }
  thread: { threadId: string }
}

export const MainStack = createStackNavigator<MainNavigatorParams>()
