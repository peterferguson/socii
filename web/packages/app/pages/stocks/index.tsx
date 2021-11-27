/* 
- There is a lot of redundant state on the stock screens that can be removed
- The stock screen will not only need data on the stock, but also recommendations.
- These require the same queries to firebase so we should try to pass this data between the screens
- in some efficient way. Caching/Context seems like a good idea initially but this is not fully baked.

- At least initially we should pass the query result for the stock to the stock screen on navigation
- and then pass the query result for the recommendations to the recommendations screen on navigation
*/

import { AssetsProvider } from "app/contexts/AssetsProvider"
import tw from "app/lib/tailwind"
import createStackNavigator from "app/navigation/create-stack-navigator"
import { StocksStackParams } from "app/navigation/types"
import CategoryScreen from "app/screens/stocks/category"
import StocksScreen from "app/screens/stocks/index"
import StockScreen from "app/screens/stocks/stock"
import React from "react"
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { AnimatedStocksHeader } from "../../components/Headers/AnimatedStocksHeader"
import HeaderTitle from "../../components/Headers/HeaderTitle"

const StocksStack = createStackNavigator<StocksStackParams>()

const StocksNavigator = () => {
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y
  })

  return (
    <StocksStack.Navigator
      screenOptions={{
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
      <StocksStack.Group>
        <StocksStack.Screen
          name="stocksScreen"
          options={{
            headerTitle: props => <HeaderTitle headerTitle={`Stocks`} />,
            // headerTitle: props => <AnimatedStocksHeader scrollY={scrollY} />,
          }}
        >
          {props => <StocksScreen scrollHandler={scrollHandler} {...props} />}
        </StocksStack.Screen>
        <StocksStack.Screen
          name="categoryScreen"
          component={CategoryScreen}
          options={({ route }) => ({
            title: route.params.category,
            headerTitle: () => (
              <HeaderTitle headerTitle={`${route.params.category} Stocks`} />
            ),
          })}
        />
        <StocksStack.Screen
          name="stockScreen"
          options={({ route }) => ({
            headerTitle: () => (
              <AssetsProvider assetSymbols={[route.params.assetSymbol]}>
                <HeaderTitle headerTitle={route.params.assetSymbol} />
              </AssetsProvider>
            ),
          })}
          // TODO: Add asset as the title of the screen the transition to price on scroll
          // TODO: a la coinbase blog https://blog.coinbase.com/coinbases-animated-tabbar-in-react-native-4b3fdd4473e
        >
          {props => (
            <AssetsProvider assetSymbols={[props.route.params.assetSymbol]}>
              <StockScreen {...props} />
            </AssetsProvider>
          )}
        </StocksStack.Screen>
      </StocksStack.Group>
    </StocksStack.Navigator>
  )
}

export default StocksNavigator

// const StockScreenHeader = ({ symbol }) => {
//   const asset = useAssets()[symbol]
//   return (
//     <CenteredRow>
//       {asset?.ISIN && <AssetLogo asset={symbol} isin={asset?.ISIN} />}
//       <HeaderText text={symbol} />
//     </CenteredRow>
//   )
// }
