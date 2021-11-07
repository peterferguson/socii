import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { NextComponentType, NextPageContext } from "next"
import { RootNavigatorParams } from "./root-navigator/types"

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

type OnboardingStackParams = { onboarding: undefined }
type EnterStackParams = { enterScreen: undefined }
type ChatStackParams = { channelListScreen: undefined }
type ChannelStackParams = {
  channel: { channelId: string }
  thread: { threadId: string }
}

type GroupsScreenProps = NativeStackScreenProps<GroupsStackParams, "groupsScreen">
type GroupScreenProps = NativeStackScreenProps<GroupsStackParams, "groupScreen">
type StocksScreenProps = NativeStackScreenProps<StocksStackParams, "stocksScreen">
type StockScreenProps = NativeStackScreenProps<StocksStackParams, "stockScreen">

type ChannelListScreenProps = NativeStackScreenProps<
  ChatStackParams,
  "channelListScreen"
>
type ChannelScreenProps = NativeStackScreenProps<RootNavigatorParams, "channel">
type ThreadScreenProps = NativeStackScreenProps<RootNavigatorParams, "thread">
type CategoryScreenProps = NativeStackScreenProps<StocksStackParams, "categoryScreen">

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
  OnboardingStackParams,
}
