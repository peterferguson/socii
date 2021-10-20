import React from "react"

import createStackNavigator from "app/navigation/create-stack-navigator"
import EnterScreen from "../screens/enter"
import { EnterStackParams } from "app/navigation/types"

const EnterStack = createStackNavigator<EnterStackParams>()

function EnterNavigator() {
  return (
    <EnterStack.Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {
          // Similar to `headerShadowVisible` but for web
          // @ts-ignore
          borderBottomWidth: 0,
        },
      }}
    >
      <EnterStack.Screen
        name="enter"
        component={EnterScreen}
        options={{ title: "Enter", headerTitle: "Login" }}
      />
    </EnterStack.Navigator>
  )
}

export default EnterNavigator
