import DrawerContent from "app/components/DrawerContent"
import React from "react"
import { Platform, useWindowDimensions } from "react-native"
import { createDrawerNavigator } from "./create-drawer-navigator"
import { MainNavigator } from "./main-navigator"
import { NextNavigationProps } from "./types"

const Drawer = createDrawerNavigator()

export function DrawerNavigator({ pageProps, Component }: NextNavigationProps) {
  const dimensions = useWindowDimensions()
  const permanent = dimensions.width > 768 // - permanent on desktop
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
      <Drawer.Screen name="main" component={MainNavigator} />
    </Drawer.Navigator>
  )
}
