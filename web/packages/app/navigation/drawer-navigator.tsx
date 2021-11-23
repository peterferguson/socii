import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"
import { useAuth } from "app/hooks/useAuth"
import dynamic from "next/dynamic"
import React from "react"
import { Platform, useWindowDimensions } from "react-native"
import { createDrawerNavigator } from "./create-drawer-navigator"
import { MainNavigator } from "./main-navigator"
import { NextNavigationProps } from "./types"

const GroupsNavigator = dynamic(() => import("../pages/groups"))
const ChatNavigator = dynamic(() => import("../pages/chat"))
const StocksNavigator = dynamic(() => import("../pages/stocks"))
const EnterNavigator = dynamic(() => import("../pages/enter"))
// const ProfileNavigator = dynamic(() => import("../pages/profile"))

const Drawer = createDrawerNavigator()

export function DrawerNavigator({ pageProps, Component }: NextNavigationProps) {
  const dimensions = useWindowDimensions()
  const permanent = dimensions.width > 768
  return (
    <Drawer.Navigator
      screenOptions={{
        lazy: true,
        headerShown: false,
        drawerType: permanent ? "permanent" : "slide",
        drawerActiveBackgroundColor: "#333",
        drawerInactiveTintColor: "#888",
        drawerActiveTintColor: "white",
        headerTintColor: "white",
      }}
      useLegacyImplementation={Platform.OS === "web"}
      drawerContent={props => <DrawerContent {...props} />}
      Component={Component}
      pageProps={pageProps}
    >
      <Drawer.Screen name="main" component={MainNavigator} options={{}} />
    </Drawer.Navigator>
  )
}

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem label="Help" onPress={() => alert("Link to help")} />
    </DrawerContentScrollView>
  )
}
