import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { NextComponentType, NextPageContext } from "next"

type GroupsStackParams = {
  groupsScreen: undefined
  groupScreen: { id: string }
  new: undefined
}
type StocksStackParams = {
  stocksScreen: undefined
  stockScreen: { asset: string }
  categoryScreen: { category: string }
}

type EnterStackParams = {
  enterScreen: undefined
}

type GroupsScreenProps = NativeStackScreenProps<GroupsStackParams, "groupsScreen">
type GroupScreenProps = NativeStackScreenProps<GroupsStackParams, "groupScreen">
type StocksScreenProps = NativeStackScreenProps<StocksStackParams, "stocksScreen">
type StockScreenProps = NativeStackScreenProps<StocksStackParams, "stockScreen">
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
  CategoryScreenProps,
}
