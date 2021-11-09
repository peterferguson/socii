import React, { useMemo, useEffect } from "react"
import { getTickersStaticProps, TickersProps } from "../utils/getTickersStaticProps"
import { getTickerDocs } from "app/lib/firebase/db/getTickerDocs"
import { getTickerCategoryShortNames } from "../utils/getTickerCategoryShortNames"

interface CategoryTickerProps extends TickersProps {
  category: string
  restOfTickers: string[]
}

export const getCategoryData = async (
  category: string
): Promise<CategoryTickerProps> => {
  const categories = await getTickerCategoryShortNames()
  const tickers = categories[category]?.tickers

  try {
    //These functions take arrays of tickers
    const { props } = await getTickersStaticProps({
      tickerDocs: await getTickerDocs(tickers.slice(0, 10)),
      period: null,
      interval: null,
    })
    return { ...props, category, restOfTickers: tickers.slice(10) }
  } catch (e) {
    //return { redirect: { destination: "/404", permanent: false } }
    console.log("error", e)
  }
}
