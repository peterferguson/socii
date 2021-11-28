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

import { AssetsObject } from "@hooks/useAssetData"
import { useFocusEffect } from "@react-navigation/native"
import { useSearchModal } from "app/hooks/useSearchModal"
import { useYahooTrending } from "app/hooks/useYahooTrending"
import { AssetCategories } from "app/models/AssetCategories"
import { Price } from "app/models/Price"
import { getAssetCategoryShortNames } from "app/utils/getAssetCategoryShortNames"
import React, { useEffect, useState, useMemo } from "react"
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native"
import  GeneralStockNews  from "app/components/GeneralStockNews"
import  StockPanel  from "app/components/StockPanel"
import { Panels, Tabs } from "../../components/Tabs/Tabs"

const defaultPrice: Price = {
  latestPrice: 0,
  changePercent: -0.1,
  iexRealtimePrice: 0,
  latestUpdate: "9999-12-31",
  currency: "USD",
}

const tabs = [{ label: "Stocks" }, { label: "News" }]

type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void

const StocksScreenWithMemo: React.FC<{
  navigation: any
  route: any
  scrollHandler: OnScroll
}> = ({ scrollHandler }) => {
  // TODO: large screen vertical cards - small horizontal cards

  const tabPanels = {
    "Stocks": ()=> <StockPanel scrollHandler={scrollHandler} isLoading={isLoading} trending={trending} categories={categories}/>,
    "News": ()=> <GeneralStockNews />,
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
        (acc, [label, screen ]) => ({
          ...acc,
          [label]: tabPanels[label],
        }),
        {}
      ),
    [trending]
  )

  return ( 
    <ScrollView>
      <Tabs tabs={tabs} panelComponents={panelComponents} />
    </ScrollView> 
  )
}


export default React.memo(StocksScreenWithMemo)
