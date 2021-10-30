import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { NextComponentType, NextPageContext } from "next"
import { MainNavigatorParams } from "./main-navigator/types"

type GroupsStackParams = {
  groupsScreen: undefined
  groupScreen: { id: string }
  new: undefined
}
type StocksStackParams = {
  stocksScreen: undefined
  stockScreen: { assetSymbol: string }
  categoryScreen: { category: string }
}

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
type ProfileSettingsScreenProps = NativeStackScreenProps<SettingsStackParams, "profileSettings">
type PersonalSettingsScreenProps = NativeStackScreenProps<SettingsStackParams, "personalSettings">
type NotificationSettingsScreenProps = NativeStackScreenProps<SettingsStackParams, "notificationSettings">
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

  SettingsScreenProps,
  ProfileSettingsScreenProps,
  SettingsStackParams,
  NotificationSettingsScreenProps,
  PersonalSettingsScreenProps,
  FAQSettingsScreenProps,
}
