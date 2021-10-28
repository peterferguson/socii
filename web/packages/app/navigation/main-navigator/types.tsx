import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import createStackNavigator from "../create-stack-navigator"

export type MainNavigatorParams = {
  withBottomBar: undefined
  channel: { channelId: string }
  thread: { threadId: string }
  settings: undefined
}

export const MainStack = createStackNavigator<MainNavigatorParams>()
