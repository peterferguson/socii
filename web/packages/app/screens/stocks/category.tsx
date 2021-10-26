import type { CategoryScreenProps } from "app/navigation/types"
import { createParam } from "app/navigation/use-param"
import React, { useEffect, useRef, useState } from "react"
import { ScrollView, View, Text } from "react-native"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver"
import { getTickerDocs } from "../../lib/firebase/client/db/getTickerDocs"
import { Price } from "../../models/Price"
import { getTickerCategoryShortNames } from "../../utils/getTickerCategoryShortNames"
import { getTickerProps } from "../../utils/getTickerProps"
import { getTickersStaticProps, TickersProps } from "../../utils/getTickersStaticProps"
//import { iexQuote } from "../../utils/iexQuote"
// import { GetStaticPaths, GetStaticProps } from "next"
import HorizontalAssetCard, {
   HorizontalAssetCardSkeleton,
 } from "../../components/HorizontalAssetCard"
 import tw from "../../lib/tailwind"
import { getCategoryData } from "../../utils/getCategoryData"

interface CategoryTickerProps extends TickersProps {
  category: string
  restOfTickers: string[]
}

// TODO: Add overall industry/category performance for comparison purposes
// TODO: Refactor the infinite scrolling stock card loading on all pages
export default function CategoryScreen({ navigation, route }: CategoryScreenProps) {

  const { category: categoryName } = route.params

  const testTickers = [
    {
    ticker : {
      tickerSymbol: "T",
      ISIN: "US00206R1023",
      logoColor: "#04ace4",
      shortName: "ATnT",
    },
    price: "100"
    },
    {
    ticker : {
      tickerSymbol: "TSLA",
      ISIN: "US88160R1014",
      logoColor: "#cc0404",
      shortName: "Tsla motors",
    },
    price: "100"
    }
    
  ]
  
  // - For infinite scroll
  // FIXME: Could be refactored as a hook

  const [tickersToLoad, setTickersToLoad] = useState(null)
  const [loadingMoreTickers, setLoadingMoreTickers] = useState(false)
  const moreTickers = useRef([])
  const lastTickerLoaded = useRef(null)
  const lastTickerRef = useRef(null)
  const [ initialCards, setInitialCards ] = useState<CategoryTickerProps>({} as CategoryTickerProps)
  // const [ categoryProps, setCategoryProps ] = useState(null)

 
  useEffect(() => {
    getCategoryData(categoryName).then(setInitialCards)
    setTickersToLoad(initialCards.restOfTickers)
  } ,[])

  useEffect(() => {
    if (initialCards.restOfTickers)setTickersToLoad(initialCards.restOfTickers)
  } ,[initialCards.restOfTickers])
  
  const defaultPrice = {
    latestPrice: 0,
    changePercent: -0.1,
    iexRealtimePrice: 0,
    latestUpdate: "9999-12-31",
    currency: "USD",
  }

  const entry = useIntersectionObserver(lastTickerRef, {})
  const isVisible = !!entry?.isIntersecting


  // useEffect(()=>{

  //     // TODO Move to function + consider when to call
  // const getCategoryProps = async ( category: string ) => {
  //   // FIXME: Is there a way we can not call this twice and just pass the tickers?
  //   const categories = await getTickerCategoryShortNames()
  //   const tickers = categories[category]?.tickers
  //   console.log("tickeers", tickers)
  //   try {
  //     // - These functions take arrays of tickers
  //     const { props } = await getTickersStaticProps({
  //       tickerDocs: await getTickerDocs(tickers.slice(0, 10)),
  //       period: null,
  //       interval: null,
  //     })
  
  //     return {
  //       props: { category, restOfTickers: tickers.slice(10) },
  //       revalidate: 8000,
  //     }
  //   } catch (e) {
  //     return { redirect: { destination: "/404", permanent: false } }
  //   }
  // }
  //   const tmp = getCategoryProps(categoryName).then((r) => {console.log("setting cat props"),
  //    setCategoryProps(r)})
  // }, [])

  // useEffect(()=>{
    
  //   //console.log(Object.keys(categoryProps))
  //   if(categoryProps) {
  //     console.log("cat props" , categoryProps)
  //     console.log("is props");
      
  //     setTickersToLoad(categoryProps.restOfTickers)
  //   }
  // },[categoryProps])

  useEffect(() => {
    const getMoreTickers = async () => {
      // - Next 5 alpaca stocks
      const nextTickers = tickersToLoad.slice(0, 5)
      setTickersToLoad(tickersToLoad.slice(5))
      const tickerDocs = await getTickerDocs(nextTickers)

      lastTickerLoaded.current = tickerDocs?.slice().pop()

      const tickers = await Promise.all(
        tickerDocs?.map(async (tickerDoc) => {
          const { tickerSymbol } = tickerDoc.data()
          const props = await getTickerProps(tickerDoc, null, null)

          let price: Price
          try {
            price = defaultPrice
            // price = tickerSymbol ? await iexQuote(tickerSymbol, user?.token) : undefined
          } catch (err) {
            console.log(`Failed to find price for ${tickerSymbol}`)
            console.log(err)
            console.log(price)
          }

          return { ...props, price }
        })
      )

      moreTickers.current.push(...tickers.filter((ticker) => !!ticker))
      setLoadingMoreTickers(false)
    }
    if (isVisible) {
      setLoadingMoreTickers(true)
      getMoreTickers()
      lastTickerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])
  //}, [isVisible, user?.token])

  return (
    // <div className="relative flex flex-col items-center justify-center">
    //   {/* <div className="absolute inset-0 rounded-full opacity-50 h-72 w-72 bg-brand-lightTeal mix-blend-multiply filter blur-xl" /> */}
    //   <div className="my-8 text-2xl tracking-wider uppercase h-1/2 font-primary">
    //     <span>{category} stocks</span>
    //   </div>
    //   {/* {tickers.map(({ ticker, price }) => (
    //     <HorizontalAssetCard
    //       key={`${ticker?.tickerSymbol}`}
    //       cardRef={null}
    //       isin={ticker?.ISIN}
    //       tickerSymbol={ticker?.tickerSymbol}
    //       shortName={ticker?.shortName}
    //       logoColor={ticker?.logoColor}
    //       price={price}
    //     />
    //   ))} */}
    //   {/* {moreTickers.current.length > 0 &&
    //     moreTickers.current.map(({ ticker, price }) => (
    //       <HorizontalAssetCard
    //         key={`${ticker?.tickerSymbol}`}
    //         cardRef={null}
    //         isin={ticker?.ISIN}
    //         tickerSymbol={ticker?.tickerSymbol}
    //         shortName={ticker?.shortName}
    //         logoColor={ticker?.logoColor}
    //         price={price}
    //       />
    //     ))} */}
    //   <HorizontalAssetCardSkeleton
    //     cardRef={lastTickerRef}
    //     className={loadingMoreTickers ? "block" : "invisible"}
    //   />
    // </div>

    <View style={{ flex: 1 }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={tw`marginBottom: 24 items-center`}>
          <Text style={tw`text-3xl text-brand-black dark:text-brand-gray tracking-tight uppercase font-poppins-500 dark:text-brand-black`}>
            {categoryName}
          </Text>        
        </View>
        
        {initialCards?.tickers?.map(({ ticker, price }) => (
          <HorizontalAssetCard
            key={`${ticker?.tickerSymbol}`}
            cardRef={null}
            isin={ticker?.ISIN}
            symbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            logoColor={ticker?.logoColor}
            price={defaultPrice}
          />
        ))}
        {moreTickers.current.length > 0 &&
        moreTickers.current.map(({ ticker, price }) => (
          <HorizontalAssetCard
            key={`${ticker?.tickerSymbol}`}
            cardRef={null}
            isin={ticker?.ISIN}
            symbol={ticker?.tickerSymbol}
            shortName={ticker?.shortName}
            logoColor={ticker?.logoColor}
            price={defaultPrice}
          />
        ))}
          <HorizontalAssetCardSkeleton
            cardRef={lastTickerRef}
            className={loadingMoreTickers ? "block" : "invisible"}
          />
        
      </ScrollView>
    </View>

  )
}



// // TODO also add in the small letter versions of each the pages maybe a mapping of some kind so a page is not rendered for each
// export const getStaticPaths: GetStaticPaths = async () => {
//   const categories = await getTickerCategoryShortNames()
//   const paths = Object.keys(categories).map((shortName) => ({
//     params: { category: shortName },
//   }))
//   return { paths, fallback: "blocking" }
// }
