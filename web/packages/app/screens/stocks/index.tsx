// TODO: REFACTOR back into section list as this page is really just a list of sections
// - This allows us to avoid the nested scroll view problems
// - The follow is a nice logical way to lay out the component
/*
 *   <SectionList
 *     sections={[
 *       {type: 'MAP', data: [{}]}, // Static sections.
 *       {type: 'PROFILE', data: [{}]},
 *       {type: 'POSTS', data: posts} // Dynamic section data replaces the FlatList.
 *     ]}
 *     keyExtractor={(item, index) => index}
 *     renderItem={({item, section}) => {
 *       switch (section.type) {
 *         // Different components for each section type.
 *         case 'MAP':
 *           return <MapView />;
 *         case 'PROFILE':
 *           return <Profile />;
 *         case 'POSTS':
 *           return <Post item={item} />;
 *         default:
 *           return null;
 *       }
 *     }}
 *     ItemSeparatorComponent={() => <Separator />}
 *     ListFooterComponent={() => <>{empty && <EmptyList />}</>}
 *   />
 */

import { useFocusEffect } from "@react-navigation/native"
import GeneralStockNews from "app/components/GeneralStockNews"
import StockPanel from "app/components/StockPanel"
import { useSearchModal } from "app/hooks/useSearchModal"
import { useYahooTrending } from "app/hooks/useYahooTrending"
import tw from "app/lib/tailwind"
import { AssetCategories } from "app/models/AssetCategories"
import { getAssetCategoryShortNames } from "app/utils/getAssetCategoryShortNames"
import React, { useEffect, useMemo, useState } from "react"
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import Animated from "react-native-reanimated"
import { Panels, Tabs } from "../../components/Tabs/Tabs"

const tabs = [{ label: "Stocks" }, { label: "News" }]

type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void

const StocksScreenWithMemo: React.FC<{
  navigation: any
  route: any
  scrollHandler: OnScroll
}> = ({ scrollHandler }) => {
  // TODO: large screen vertical cards - small horizontal cards

  const tabPanels = {
    Stocks: () => (
      <StockPanel isLoading={isLoading} trending={trending} categories={categories} />
    ),
    // "Stocks": ()=> <StockPanel isLoading={isLoading} trending={trending} categories={categories}/>,
    News: () => <GeneralStockNews scrollHandler={scrollHandler} />,
  }

  const { trending, isLoading } = useYahooTrending()
  // TODO: This recalls the api every time the screen is loaded leading to bad UX
  // ? Maybe use a cache to store the data and only call the api when the user refreshes the screen

  const [categories, setCategories] = useState<AssetCategories>({} as AssetCategories)

  // @ts-ignore
  useEffect(() => getAssetCategoryShortNames().then(setCategories), [])
  const { handlePresent, handleDismiss } = useSearchModal()
  useFocusEffect(React.useCallback(() => () => handleDismiss(), []))

  // TODO: Maybe better dep here.. isLoading would give blank
  const panelComponents = useMemo<Panels>(
    () =>
      Object.entries(tabPanels).reduce(
        (acc, [label]) => ({ ...acc, [label]: tabPanels[label] }),
        {}
      ),
    [trending]
  )

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={32}
      style={tw`flex-1`}
    >
      <Tabs
        tabs={tabs}
        panelComponents={panelComponents}
        panelScrollHandler={scrollHandler}
        panelBgColor="transparent"
        containerStyle={tw`flex-1 items-center`}
      />
    </Animated.ScrollView>
  )
}

export default React.memo(StocksScreenWithMemo)
