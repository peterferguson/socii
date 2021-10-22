import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

export type BottomTabNavigatorParams = {
  enter: undefined
  groups: undefined
  stocks: undefined
}

export const BottomTab = createBottomTabNavigator<BottomTabNavigatorParams>()
