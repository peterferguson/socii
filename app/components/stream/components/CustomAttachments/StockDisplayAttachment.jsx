import { uncamelCase } from '@utils/helper'
import router from 'next/router'
import React from 'react'

const StockDisplayAttachment = ({ attachment }) => {
  const tickerSymbol = attachment?.name
  const { name, exchange, ...asset } = attachment?.asset
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-lg cursor-pointer"
      onClick={() => router.push(attachment?.url)}
    >
      <img
        className="h-auto mx-auto rounded-full shadow-lg w-14"
        src={attachment?.image}
        alt={`${tickerSymbol} logo`}
      />
      <div className="w-auto h-auto p-1 text-center">
        <div
          className={
            'text-xl px-2 mx-1 rounded-full font-semibold w-full text-center \
                inline-block font-poppins'
          }
        >
          {name}
          <p className="text-sm text-gray-600">
            ${tickerSymbol} &bull; {exchange}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        {asset &&
          Object.keys(asset).map((key) => {
            return (
              <div
                key={key}
                className="w-full mt-2 ml-2 text-xs font-semibold tracking-wider text-left sm:mt-4 text-brand-light"
              >
                {uncamelCase(key)} &bull;{' '}
                <span className="text-gray-600 text-tiny font-poppins">
                  {asset[key]}
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default StockDisplayAttachment
