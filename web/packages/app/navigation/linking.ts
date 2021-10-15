import * as Linking from "expo-linking"
import type { NavigationContainer } from "@react-navigation/native"
import type { BottomTabNavigatorParams } from "./bottom-tab-navigator/types"
import { HomeStackParams, PlaylistsStackParams, StocksStackParams } from "./types"

type Props = React.ComponentProps<typeof NavigationContainer>["linking"]

function makeTabPath<Path extends keyof BottomTabNavigatorParams>(path: Path): Path {
  return path
}

function makePlaylistStackPath<Path extends keyof PlaylistsStackParams>(
  path: Path
): Path {
  return path
}

function makeStockStackPath<Path extends keyof StocksStackParams>(path: Path): Path {
  return path
}

function makeHomeStackPath<Path extends keyof HomeStackParams>(path: Path): Path {
  return path
}

function makeType<T>(t: T) {
  return t
}

const playlistStackPaths = makeType({
  playlists: makePlaylistStackPath("playlists"),
  playlist: makePlaylistStackPath("playlist"),
  new: makePlaylistStackPath("new"),
})

const stocksStackPaths = makeType({
  stocks: makeStockStackPath("stocks"),
  stock: makeStockStackPath("stock"),
})

const homeStackPaths = makeType({
  home: makeHomeStackPath("home"),
})

const tabPaths = makeType({
  home: makeTabPath("homeTab"),
  playlists: makeTabPath("playlistsTab"),
  stocks: makeTabPath("stocksTab"),
})

const linking: Props = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      [tabPaths.home]: {
        path: "",
        initialRouteName: homeStackPaths.home,
        screens: {
          [homeStackPaths.home]: "",
        },
      },
      [tabPaths.playlists]: {
        initialRouteName: playlistStackPaths.playlists,
        path: "playlists",
        screens: {
          [playlistStackPaths.playlists]: "",
          [playlistStackPaths.playlist]: ":id",
          [playlistStackPaths.new]: "new",
        },
      },
      [tabPaths.stocks]: {
        path: "stocks",
        initialRouteName: stocksStackPaths.stocks,
        screens: {
          [stocksStackPaths.stocks]: "",
          [stocksStackPaths.stock]: ":symbol",
        },
      },
    },
  },
}

export { linking }
