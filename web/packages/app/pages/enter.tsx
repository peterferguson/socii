import createStackNavigator from "app/navigation/create-stack-navigator"
import { EnterStackParams } from "app/navigation/types"
import React from "react"
import Header from "../components/Headers/EnterHeader"
import tw from "app/lib/tailwind"
import EnterScreen from "../screens/enter"

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
        headerTitle: props => <Header {...props} headerTitle={"Login"} />,
      }}
    />
  </EnterStack.Navigator>
)

export default EnterNavigator
