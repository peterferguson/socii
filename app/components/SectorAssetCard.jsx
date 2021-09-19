import React from "react"
import { AssetCard } from "./AssetCard"

export const SectorAssetCard = ({
  tickerSymbol,
  isin,
  shortName,
  price,
  sectorData,
}) => (
  <>
    <AssetCard
      tickerSymbol={tickerSymbol}
      isin={isin}
      shortName={shortName}
      price={price}
    />
    <div className="flex flex-col pt-2 pb-4 mb-8 -mt-2 justify leading-8">
      <a
        className="h-8 px-3 font-semibold text-gray-400 uppercase truncate align-middle border-2 w-36 text-tiny rounded-3xl"
        href={tickerSymbol}
      >
        {sectorData?.sector}
      </a>
      <a
        className="h-8 px-3 font-semibold text-gray-400 uppercase truncate align-middle border-2 w-36 text-tiny rounded-3xl"
        href={tickerSymbol}
      >
        {sectorData?.industry}
      </a>
    </div>
  </>
)
