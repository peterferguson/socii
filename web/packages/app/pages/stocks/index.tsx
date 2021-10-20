import React from "react"

import createStackNavigator from "app/navigation/create-stack-navigator"
import StocksScreen from "app/screens/stocks/index"
import StockScreen from "app/screens/stocks/stock"
import { StocksStackParams } from "app/navigation/types"

const StocksStack = createStackNavigator<StocksStackParams>()

function StocksNavigator() {
  return (
    <StocksStack.Navigator
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
      <StocksStack.Group>
        <StocksStack.Screen
          name="stocks"
          component={StocksScreen}
          options={{ title: "Stocks", headerTitle: "Stocks" }}
        />
        <StocksStack.Screen
          name="stock"
          component={StockScreen}
          options={({ route }) => ({
            title: route.params.asset,
            headerTitle: route.params.asset,
          })}
          // TODO: Add asset as the title of the screen the transition to price on scroll
          // TODO: a la coinbase blog https://blog.coinbase.com/coinbases-animated-tabbar-in-react-native-4b3fdd4473e
        />
      </StocksStack.Group>
    </StocksStack.Navigator>
  )
}

export default StocksNavigator
