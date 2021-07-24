import React from "react";

export function PriceCard({
  logoUrl, tickerSymbol, shortName, currentPrice, gainColor, currencySymbol = "$", movingMonthlyPctChange,
}) {
  return (
    <div className="p-4 m-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div className="flex items-center">
        <img
          className="w-16 h-auto mx-auto rounded-full shadow-lg"
          src={logoUrl}
          alt={`${tickerSymbol} logo`} />
        <div className="flex flex-col">
          <span className="ml-2 font-bold tracking-wider text-gray-700 uppercase text-md dark:text-white">
            {tickerSymbol}
          </span>
          <br />
          <span className="ml-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-white">
            {shortName}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <p className="my-4 text-4xl font-bold text-left text-gray-700 dark:text-gray-100">
          {currentPrice}
          <span className="text-sm">{currencySymbol}</span>
        </p>
        <div className={`flex items-center text-sm ${gainColor}`}>
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z"></path>
          </svg>
          <span>{movingMonthlyPctChange.toFixed(2)}%</span>
          <span className="text-gray-400 align-bottom text-tiny">vs last month</span>
        </div>
      </div>
    </div>
  );
}
