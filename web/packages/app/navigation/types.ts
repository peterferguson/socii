import { NavigatorScreenParams } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { NextComponentType, NextPageContext } from "next"

type GroupsStackParams = {
  groupsScreen: undefined
  groupScreen: { id: string }
  groupSettingsScreen: { id: string }
  new: undefined
}
type StocksStackParams = {
  stocksScreen: undefined
  stockScreen: { assetSymbol: string }
  categoryScreen: { category: string }
}

type OnboardingStackParams = { onboarding: undefined }
type EnterStackParams = { enterScreen: undefined }
type ChatStackParams = { channelListScreen: undefined }
type ChannelStackParams = {
  channel: { channelId: string }
  thread: { threadId: string }
}

type SettingsStackParams = {
  settingsScreen: undefined
  profileSettings: undefined
  personalSettings: undefined
  notificationSettings: undefined
  FAQSettings: undefined
}

type GroupsScreenProps = NativeStackScreenProps<GroupsStackParams, "groupsScreen">
type GroupScreenProps = NativeStackScreenProps<GroupsStackParams, "groupScreen">

type StocksScreenProps = NativeStackScreenProps<StocksStackParams, "stocksScreen">
type StockScreenProps = NativeStackScreenProps<StocksStackParams, "stockScreen">
type CategoryScreenProps = NativeStackScreenProps<StocksStackParams, "categoryScreen">

type SettingsScreenProps = NativeStackScreenProps<SettingsStackParams, "settingsScreen">
type ProfileSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParams,
  "profileSettings"
>
type PersonalSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParams,
  "personalSettings"
>
type NotificationSettingsScreenProps = NativeStackScreenProps<
  SettingsStackParams,
  "notificationSettings"
>
type FAQSettingsScreenProps = NativeStackScreenProps<SettingsStackParams, "FAQSettings">

type ChannelListScreenProps = NativeStackScreenProps<
  ChatStackParams,
  "channelListScreen"
>

type ChannelScreenProps = NativeStackScreenProps<MainNavigatorParams, "channel">
type ThreadScreenProps = NativeStackScreenProps<MainNavigatorParams, "thread">

type NextPageProps = any
type NextNavigationProps = {
  Component?: NextComponentType<NextPageContext, null, NextPageProps>
  pageProps?: NextPageProps
}

type MainNavigatorParams = {
  groups: NavigatorScreenParams<GroupsStackParams>
  chat: NavigatorScreenParams<ChatStackParams>
  stocks: NavigatorScreenParams<StocksStackParams>
  onboarding: NavigatorScreenParams<OnboardingStackParams>
  enter: NavigatorScreenParams<EnterStackParams>
  channel: NavigatorScreenParams<ChannelStackParams>
  thread: NavigatorScreenParams<ChannelStackParams>
  // profileTab: NavigatorScreenParams<ProfileStackParams>
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainNavigatorParams {}
  }
}

export type {
  GroupsScreenProps,
  GroupScreenProps,
  StocksScreenProps,
  StockScreenProps,
  NextNavigationProps,
  GroupsStackParams,
  EnterStackParams,
  StocksStackParams,
  ChatStackParams,
  ChannelListScreenProps,
  ChannelStackParams,
  ChannelScreenProps,
  ThreadScreenProps,
  CategoryScreenProps,
  OnboardingStackParams,
  MainNavigatorParams,
  SettingsScreenProps,
  ProfileSettingsScreenProps,
  SettingsStackParams,
  NotificationSettingsScreenProps,
  PersonalSettingsScreenProps,
  FAQSettingsScreenProps,
}
