/* 
- There is a lot of redundant state on the stock screens that can be removed
- The stock screen will not only need data on the stock, but also recommendations.
- These require the same queries to firebase so we should try to pass this data between the screens
- in some efficient way. Caching/Context seems like a good idea initially but this is not fully baked.

- At least initially we should pass the query result for the stock to the stock screen on navigation
- and then pass the query result for the recommendations to the recommendations screen on navigation
*/

import createStackNavigator from "app/navigation/create-stack-navigator"
import { StocksStackParams } from "app/navigation/types"
import StocksScreen from "app/screens/stocks/index"
import StockScreen from "app/screens/stocks/stock"
import CategoryScreen from "app/screens/stocks/category"
import React from "react"
import HeaderContainer from "../../components/Headers/HeaderContainer"
import tw from "../../lib/tailwind"

const StocksStack = createStackNavigator<StocksStackParams>()

function StocksNavigator() {
  return (
    <StocksStack.Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: true,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        cardOverlayEnabled: true,
        cardStyle: tw`bg-brand-gray dark:bg-brand-black opacity-100`,
        headerTintColor: tw.color("brand"),
        headerStyle: {
          // Similar to `headerShadowVisible` but for web
          // @ts-ignore
          borderBottomWidth: 0,
          ...tw`bg-brand-gray dark:bg-brand-black opacity-100`,
        },
      }}
    >
      <StocksStack.Group>
        <StocksStack.Screen
          name="stocksScreen"
          component={StocksScreen}
          options={{
            title: "Stocks",
            headerTitle: () => <HeaderContainer headerTitle={"Stocks"} />,
          }}
        />
        <StocksStack.Screen
          name="categoryScreen"
          component={CategoryScreen}
          options={({ route }) => ({
            title: "Category",
            headerTitle: () => <HeaderContainer headerTitle={route.params.category} />,
          })}
        />
        <StocksStack.Screen
          name="stockScreen"
          component={StockScreen}
          options={({ route }) => ({
            title: route.params.assetSymbol,
            headerTitle: () => (
              <HeaderContainer headerTitle={"Stocks"} text={route.params.assetSymbol} />
            ),

          })}
          // TODO: Add asset as the title of the screen the transition to price on scroll
          // TODO: a la coinbase blog https://blog.coinbase.com/coinbases-animated-tabbar-in-react-native-4b3fdd4473e
        />
      </StocksStack.Group>
    </StocksStack.Navigator>
  )
}

export default StocksNavigator
