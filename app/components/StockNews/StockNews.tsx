import { useStockNews } from "@hooks/useNews"
import { RapidApiNewsItem } from "@utils/getNewsArticles"
import Image from "next/image"
import React, { useState } from "react"

const StockNews: React.FC<{
  exchange: string
  symbol: string
  shortName: string
  logoColor: string
}> = ({ exchange, symbol, shortName, logoColor }) => {
  const { news, loading } = useStockNews(
    `(${exchange}:${symbol}) ${shortName} stock`,
    symbol
  )
  return (
    <div className="w-full mt-8 ml-0 text-xl lg:mt-2 space-y-4 font-primary lg:w-2/5">
      <span>Related News</span>
      <div
        className="p-2 bg-white shadow-lg space-y-1 grid grid-rows-3 divide-y rounded-2xl place-items-center"
        style={{ borderColor: logoColor }}
      >
        {!loading
          ? news?.map((item) => <NewsItem key={item.id} item={item} />)
          : [1, 2, 3].map((item) => <NewsItemSkeleton key={item} />)}
      </div>
    </div>
  )
}

export default StockNews

const NewsItem = ({ item }: { item: RapidApiNewsItem }) => {
  const [isError, setIsError] = useState(false)
  return (
    <div className="flex items-center w-full p-4 lg:p-1 space-y-0.5">
      <a href={item.url}>
        {!isError && item.image.thumbnail && (
          <Image
            src={item.image.thumbnail}
            width={item.image.thumbnailWidth}
            height={item.image.thumbnailHeight}
            onError={() => setIsError(true)}
          />
        )}
        <h2 className="text-xs font-semibold font-primary sm:text-base pb-0.5">
          {item.title}
        </h2>
        <p className="text-tiniest sm:text-tiny font-secondary leading-3 overflow-ellipsis">
          {item.description}
        </p>
      </a>
    </div>
  )
}

const NewsItemSkeleton = () => (
  <div className="flex flex-col justify-start w-full p-4 lg:p-1 space-y-0.5">
    <h2 className="w-3/4 h-3 mb-2 bg-gray-400 sm:h-5 animate-pulse rounded-xl" />
    <p className="w-4/5 h-2 mb-1 bg-gray-400 sm:h-3 animate-pulse rounded-xl" />
    <p className="w-3/5 h-2 bg-gray-400 sm:h-3 animate-pulse rounded-xl" />
  </div>
)
