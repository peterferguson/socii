import DrawerContent from "app/components/DrawerContent"
import React from "react"
import { Platform, useWindowDimensions } from "react-native"
import { createDrawerNavigator } from "./create-drawer-navigator"
import { MainNavigator } from "./main-navigator"
import { NextNavigationProps } from "./types"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"

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
      <Drawer.Screen
        name="main"
        component={MainNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ""

          // - stop drawer opening on these nested screens ... This doesnt' solve the problem
          // ! fully still need to stop it on nested screens of the withBottomBar navgiator
          if (
            [
              "channel",
              "thread",
              "oneOnOneDetails",
              "groupDetails",
              "sharedGroups",
              "settings",
            ].includes(routeName)
          )
            return { swipeEnabled: false }

          return {}
        }}
      />
    </Drawer.Navigator>
  )
}
