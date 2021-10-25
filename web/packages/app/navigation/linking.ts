import * as Linking from "expo-linking"
import { getPathFromState, getStateFromPath } from "@react-navigation/native"
import type { NavigationContainer } from "@react-navigation/native"
import type { BottomTabNavigatorParams } from "./bottom-tab-navigator/types"
import {
  EnterStackParams,
  GroupsStackParams,
  StocksStackParams,
  ChatStackParams,
  ChannelStackParams,
} from "./types"

type Props = React.ComponentProps<typeof NavigationContainer>["linking"]

function makeTabPath<Path extends keyof BottomTabNavigatorParams>(path: Path): Path {
  return path
}

function makeGroupStackPath<Path extends keyof GroupsStackParams>(path: Path): Path {
  return path
}

function makeStockStackPath<Path extends keyof StocksStackParams>(path: Path): Path {
  return path
}

function makeEnterStackPath<Path extends keyof EnterStackParams>(path: Path): Path {
  return path
}
function makeChatStackPath<Path extends keyof ChatStackParams>(path: Path): Path {
  return path
}
function makeChannelStackPath<Path extends keyof ChannelStackParams>(path: Path): Path {
  return path
}

function makeType<T>(t: T) {
  return t
}

const groupStackPaths = makeType({
  groups: makeGroupStackPath("groupsScreen"),
  group: makeGroupStackPath("groupScreen"),
  new: makeGroupStackPath("new"),
})

const chatStackPaths = makeType({
  channelList: makeChatStackPath("channelListScreen"),
  // new: makeGroupStackPath("new"),
})
const channelStackPaths = makeType({
  channel: makeChannelStackPath("channelScreen"),
  thread: makeChannelStackPath("threadScreen"),
})

const stocksStackPaths = makeType({
  stocks: makeStockStackPath("stocksScreen"),
  stock: makeStockStackPath("stockScreen"),
})

const enterStackPaths = makeType({
  enter: makeEnterStackPath("enterScreen"),
})

const tabPaths = makeType({
  enterTab: makeTabPath("enter"),
  groupsTab: makeTabPath("groups"),
  stocksTab: makeTabPath("stocks"),
  chatTab: makeTabPath("chat"),
})

const linking: Props = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      [tabPaths.enterTab]: {
        path: "",
        initialRouteName: enterStackPaths.enter,
        screens: {
          [enterStackPaths.enter]: "",
        },
      },
      [tabPaths.groupsTab]: {
        initialRouteName: groupStackPaths.groups,
        path: "groups",
        screens: {
          [groupStackPaths.groups]: "",
          [groupStackPaths.group]: ":id",
          [groupStackPaths.new]: "new",
        },
      },
      [tabPaths.stocksTab]: {
        path: "stocks",
        initialRouteName: stocksStackPaths.stocks,
        screens: {
          [stocksStackPaths.stocks]: "",
          [stocksStackPaths.stock]: ":assetSymbol",
        },
      },
      [tabPaths.chatTab]: {
        path: "chat",
        initialRouteName: chatStackPaths.channelList,
        screens: { [chatStackPaths.channelList]: "" },
      },
      channel: {
        path: "channel",
        screens: {
          [channelStackPaths.channel]: ":channelId",
          // -> :channel:threadId not sure if this is correct
          [channelStackPaths.thread]: "thread/:threadId",
        },
      },
    },
  },
  getPathFromState,
  getStateFromPath,
}

export { linking }
