import createStackNavigator from "../create-stack-navigator"

export type MainNavigatorParams = {
  withBottomBar: undefined
  channel: { channelId: string }
  groupDetails: { channelId: string }
  oneOnOneDetails: { channelId: string }
  sharedGroups: { userId: string }
  thread: { threadId: string }
  settings: undefined
}

export const MainStack = createStackNavigator<MainNavigatorParams>()
