import * as Linking from "expo-linking"
import { getPathFromState, getStateFromPath } from "@react-navigation/native"
import type { NavigationContainer } from "@react-navigation/native"
import type { BottomTabNavigatorParams } from "./bottom-tab-navigator/types"
import { EnterStackParams, PlaylistsStackParams, StocksStackParams } from "./types"

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

function makeEnterStackPath<Path extends keyof EnterStackParams>(path: Path): Path {
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

const enterStackPaths = makeType({
  enter: makeEnterStackPath("enter"),
})

const tabPaths = makeType({
  enter: makeTabPath("enterTab"),
  playlists: makeTabPath("playlistsTab"),
  stocks: makeTabPath("stocksTab"),
})

const linking: Props = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      [tabPaths.enter]: {
        path: "",
        initialRouteName: enterStackPaths.enter,
        screens: {
          [enterStackPaths.enter]: "",
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
          [stocksStackPaths.stock]: ":asset",
        },
      },
    },
  },
  getPathFromState,
  getStateFromPath,
}

export { linking }
