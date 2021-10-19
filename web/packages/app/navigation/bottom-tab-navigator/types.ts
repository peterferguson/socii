import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

export type BottomTabNavigatorParams = {
  enterTab: undefined
  playlistsTab: undefined
  stocksTab: undefined
}

export const BottomTab = createBottomTabNavigator<BottomTabNavigatorParams>()
