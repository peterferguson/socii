import React from "react"

import createStackNavigator from "app/navigation/create-stack-navigator"
import EnterScreen from "../screens/enter"
import { EnterStackParams } from "app/navigation/types"
import Header from "../components/Headers/EnterHeader"
import tw from "../lib/tailwind"

const EnterStack = createStackNavigator<EnterStackParams>()

const EnterNavigator = () => (
  <EnterStack.Navigator
    screenOptions={{
      animationEnabled: true,
      headerShown: true,
      headerShadowVisible: false,
      headerBackTitleVisible: false,
      headerTintColor: tw.color("brand-black"),
      headerStyle: {
        // Similar to `headerShadowVisible` but for web
        // @ts-ignore
        borderBottomWidth: 0,
        ...tw`bg-brand-gray dark:bg-brand-black opacity-100`,
      },
    }}
  >
    <EnterStack.Screen
      name="enterScreen"
      component={EnterScreen}
      // options={{ title: "Enter", headerTitle: "Login" }}
      options={{
        headerTitle: (props) => <Header {...props} headerTitle={"Login"} />,
      }}
    />
  </EnterStack.Navigator>
)

export default EnterNavigator
