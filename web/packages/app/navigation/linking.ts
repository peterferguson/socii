import * as Linking from "expo-linking"
import { getPathFromState, getStateFromPath } from "@react-navigation/native"
import type { NavigationContainer } from "@react-navigation/native"
import type { BottomTabNavigatorParams } from "./bottom-tab-navigator/types"
import {
  OnboardingStackParams,
  EnterStackParams,
  GroupsStackParams,
  StocksStackParams,
  ChatStackParams,
  ChannelStackParams,
  SettingsStackParams,
} from "./types"
import { MainNavigatorParams } from "./main-navigator/types"
import { RootNavigatorParams } from "./root-navigator/types"

type Props = React.ComponentProps<typeof NavigationContainer>["linking"]

function makeRootPath<Path extends keyof RootNavigatorParams>(path: Path): Path {
  return path
}

function makeMainPath<Path extends keyof MainNavigatorParams>(path: Path): Path {
  return path
}

function makeTabPath<Path extends keyof BottomTabNavigatorParams>(path: Path): Path {
  return path
}

function makeGroupStackPath<Path extends keyof GroupsStackParams>(path: Path): Path {
  return path
}

function makeStockStackPath<Path extends keyof StocksStackParams>(path: Path): Path {
  return path
}

function makeOnboardingStackPath<Path extends keyof OnboardingStackParams>(
  path: Path
): Path {
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
function makeSettingsPath<Path extends keyof SettingsStackParams>(path: Path): Path {
  return path
}

function makeType<T>(t: T) {
  return t
}

const groupStackPaths = makeType({
  groupSettings: makeGroupStackPath("groupSettingsScreen"),
  groups: makeGroupStackPath("groupsScreen"),
  group: makeGroupStackPath("groupScreen"),
  new: makeGroupStackPath("new"),
})

const chatStackPaths = makeType({
  channelList: makeChatStackPath("channelListScreen"),
  // new: makeGroupStackPath("new"),
})
const channelStackPaths = makeType({
  channel: makeChannelStackPath("channel"),
  thread: makeChannelStackPath("thread"),
})

const stocksStackPaths = makeType({
  stocks: makeStockStackPath("stocksScreen"),
  stock: makeStockStackPath("stockScreen"),
  category: makeStockStackPath("categoryScreen"),
})

const enterStackPaths = makeType({
  enter: makeEnterStackPath("enterScreen"),
})

const onboardingStackPaths = makeType({
  onboarding: makeOnboardingStackPath("onboarding"),
})

const tabPaths = makeType({
  enterTab: makeTabPath("enter"),
  groupsTab: makeTabPath("groups"),
  stocksTab: makeTabPath("stocks"),
  chatTab: makeTabPath("chat"),
})

const mainPaths = makeType({
  onboarding: makeRootPath("onboarding"),
  withBottomBar: makeMainPath("withBottomBar"),
  channel: makeMainPath("channel"),
  thread: makeMainPath("thread"),
  settings: makeMainPath("settings"),
})

const settingsStackPaths = makeType({
  settingsScreen: makeSettingsPath("settingsScreen"),
  profileSettings: makeSettingsPath("profileSettings"),
  personalSettings: makeSettingsPath("personalSettings"),
  notificationSettings: makeSettingsPath("notificationSettings"),
  FAQSettings: makeSettingsPath("FAQSettings"),
})

const linking: Props = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      [tabPaths.enterTab]: {
        path: "",
        initialRouteName: enterStackPaths.enter,
        screens: { [enterStackPaths.enter]: "enter" },
      },
      [tabPaths.groupsTab]: {
        initialRouteName: groupStackPaths.groups,
        path: "groups",
        screens: {
          [groupStackPaths.groups]: "",
          [groupStackPaths.groupSettings]: ":id/settings",
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
          [stocksStackPaths.category]: "categories/:category",
        },
      },
      [tabPaths.chatTab]: {
        path: "chat",
        initialRouteName: chatStackPaths.channelList,
        screens: { [chatStackPaths.channelList]: "" },
      },
      [mainPaths.onboarding]: {
        path: "onboarding",
        screens: { [onboardingStackPaths.onboarding]: "onboarding" },
      },
      [mainPaths.channel]: {
        path: "channel",
        screens: { [channelStackPaths.channel]: ":channelId" },
      },
      [mainPaths.thread]: {
        path: "thread",
        // -> :channel:threadId not sure if this is correct
        screens: { [channelStackPaths.thread]: ":threadId" },
      },
      [mainPaths.settings]: {
        path: "settings",
        screens: {
          [settingsStackPaths.settingsScreen]: "settingsScreen",
          [settingsStackPaths.profileSettings]: "profileSettings",
          [settingsStackPaths.personalSettings]: "personalSettings",
          [settingsStackPaths.notificationSettings]: "notificationSettings",
          [settingsStackPaths.FAQSettings]: "FAQSettings",
        },
      },
    },
  },
  getPathFromState,
  getStateFromPath,
}

export { linking }
