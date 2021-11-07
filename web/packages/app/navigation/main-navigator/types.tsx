import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import createStackNavigator from "../create-stack-navigator"

export type RootNavigatorParams = {
  withBottomBar: undefined
  channel: { channelId: string }
  thread: { threadId: string }
}

export const RootStack = createStackNavigator<RootNavigatorParams>()
