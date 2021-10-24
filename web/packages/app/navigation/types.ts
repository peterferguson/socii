import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { NextComponentType, NextPageContext } from "next"

type GroupsStackParams = {
  groupsScreen: undefined
  groupScreen: { id: string }
  new: undefined
}
type StocksStackParams = { stocksScreen: undefined; stockScreen: { asset: string } }

type EnterStackParams = { enterScreen: undefined }
type ChatStackParams = {
  channelScreen: undefined
  channelListScreen: undefined
  threadScreen: undefined
}

type GroupsScreenProps = NativeStackScreenProps<GroupsStackParams, "groupsScreen">
type GroupScreenProps = NativeStackScreenProps<GroupsStackParams, "groupScreen">
type StocksScreenProps = NativeStackScreenProps<StocksStackParams, "stocksScreen">
type StockScreenProps = NativeStackScreenProps<StocksStackParams, "stockScreen">
type ChannelListScreenProps = NativeStackScreenProps<
  ChatStackParams,
  "channelListScreen"
>
type ChannelScreenProps = NativeStackScreenProps<ChatStackParams, "channelScreen">
type ThreadScreenProps = NativeStackScreenProps<ChatStackParams, "threadScreen">

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
  ChannelScreenProps,
  ThreadScreenProps,
}
