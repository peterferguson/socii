import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { NextComponentType, NextPageContext } from "next"

type PlaylistsStackParams = {
  playlists: undefined
  playlist: { id: string }
  new: undefined
}
type StocksStackParams = {
  stocks: undefined
  stock: { asset: string }
}

type EnterStackParams = {
  enter: undefined
}

// type StackParams = ProfileStackParams & HomeStackParams & PlayListStackParams;

type PlaylistsScreenProps = NativeStackScreenProps<PlaylistsStackParams, "playlists">
type PlaylistScreenProps = NativeStackScreenProps<PlaylistsStackParams, "playlist">
type StocksScreenProps = NativeStackScreenProps<StocksStackParams, "stocks">
type StockScreenProps = NativeStackScreenProps<StocksStackParams, "stock">

type NextPageProps = any
type NextNavigationProps = {
  Component?: NextComponentType<NextPageContext, null, NextPageProps>
  pageProps?: NextPageProps
}

export type {
  PlaylistsScreenProps,
  PlaylistScreenProps,
  StocksScreenProps,
  StockScreenProps,
  NextNavigationProps,
  PlaylistsStackParams,
  EnterStackParams,
  StocksStackParams,
}
