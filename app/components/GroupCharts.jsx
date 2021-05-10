import PieCard, { PieCardSkeleton } from "@components/PieCard";
import { firestore } from "@lib/firebase";
import IEXQuery from "@lib/iex";
import { fetchURL } from "@utils/helper";
import Link from "next/link";
import { logoUrl } from "@utils/helper";


import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";

export default function GroupColumn({ groupName }) {
  const [currentPrices, setCurrentPrices] = useState([]);
  const holdingsRef = firestore.collection(`groups/${groupName}/holdings`);

  const [holdings, loading] = useCollectionDataOnce(holdingsRef);

  useEffect(() => {
    holdings?.map(({ tickerSymbol }) => {
      const iexClient = new IEXQuery();

      fetchURL(iexClient.stockPrice(tickerSymbol)).then((value) =>
        setCurrentPrices((previousState) => ({
          ...previousState,
          [tickerSymbol]: value,
        }))
      );
    });
  }, [holdings]);

  const holdingData = holdings?.map(
    ({ assetRef, tickerSymbol, shortName, avgPrice, shares }) => {
      return { ISIN: assetRef.id, tickerSymbol, shortName, avgPrice, shares };
    }
  );

  return (
    <div className="flex flex-col items-center mx-auto mb-4">
      {!loading ? (
        <GroupPieCard
          groupName={groupName}
          holdingData={holdingData}
          currentPrices={currentPrices}
        />
      ) : (
        <PieCardSkeleton scaling={0.3} radius={250} />
      )}
      {!loading && (
        <div className="w-full border-b py-3 border-gray-400 h-3.5 my-8 text-center">
          <span className="py-0 px-2.5 bg-gray-50 text-gray-400">
            {holdings.length} Investments
          </span>
        </div>
      )}
      {!loading &&
        holdingData.map((holding) => {
          return currentPrices ? (
            <StockCard
              holding={holding}
              latestPrice={currentPrices[holding.tickerSymbol]}
            />
          ) : (
            <StockCardSkeleton />
          );
        })}
    </div>
  );
}

export function GroupPieCard({ className, groupName, holdingData, currentPrices }) {
  const portfolioValue = holdingData
    ?.map(({ tickerSymbol, shares }) => currentPrices[tickerSymbol] * shares)
    .reduce((a, b) => a + b, 0);

  const gain =
    (portfolioValue - holdingData
      ?.map(({ avgPrice, shares }) => avgPrice * shares)
      .reduce((a, b) => a + b, 0))*100 /
    portfolioValue;

  const pieData = holdingData?.map(({ tickerSymbol, shortName, shares }) => ({
    theta: (currentPrices[tickerSymbol] * shares) / portfolioValue,
    label: shortName,
    subLabel: tickerSymbol,
  }));


  
  return (
    <PieCard
      className={className}
      groupName={groupName}
      data={pieData}
      scaling={0.35}
      radius={250}
      text={{
        main: `$${portfolioValue?.toFixed(2)}`,
        sub: `${gain.toFixed(2)}%`,
      }}
    />
  );
}


function StockCard({ holding, latestPrice, currencySymbol = "$" }) {
    const tickerSymbol = holding.tickerSymbol;
  
    const pnl = (100 * (latestPrice - holding.avgPrice)) / latestPrice;
  
    return (
      <div className="flex h-auto m-1">
        <div className="flex bg-white shadow-2xl rounded-lg w-88 sm:w-96 h-20 p-2">
          <div className="flex-none mx-auto justify-center rounded-full w-20">
            <Link href={`/stock/${tickerSymbol}`}>
              <div className="cursor-pointer">
                <a>
                  <img
                    className="shadow-lg rounded-full h-10 w-10 mx-auto"
                    src={logoUrl(holding.ISIN)}
                    alt={`${tickerSymbol} logo`}
                  />
                </a>
                <a>
                  <div className="text-center text-gray-600 uppercase text-tiny font-semibold tracking-wider">
                    {holding.shortName}
                  </div>
                </a>
                <a>
                  <div className="text-center text-gray-600 uppercase text-tiny font-semibold tracking-wider">
                    {tickerSymbol}
                  </div>
                </a>
              </div>
            </Link>
          </div>
          <div className="flex-grow" />
          <div className="flex flex-col items-center justify-center w-20 mr-4">
            <div className="text-gray-600 text-tiny font-semibold overflow-ellipsis overflow-hidden">
              {latestPrice ? (
                `${holding.shares} Shares`
              ) : (
                <div className="animate-pulse bg-gray-200 w-12"></div>
              )}
            </div>
            <div className="text-black uppercase text-md font-semibold tracking-wider overflow-ellipsis overflow-hidden">
              {latestPrice ? (
                `${currencySymbol}${(latestPrice * holding.shares).toFixed(2)}`
              ) : (
                <div className="animate-pulse bg-gray-200 w-12"></div>
              )}
            </div>
            <div
              className={`${
                pnl > 0 ? "bg-teal-200" : pnl < 0 ? "bg-red-200" : "bg-brand"
              } text-gray-700 text-tiny sm:text-xs px-2 rounded-full font-semibold w-full text-center inline-block`}
            >
              {pnl.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function StockCardSkeleton() {
    return (
      <div className="flex h-auto m-1">
        <div className="flex bg-white shadow-2xl rounded-lg w-88 sm:w-96 h-20 p-2">
          <div className="flex-none mx-auto justify-center rounded-full w-20">
            <div className="shadow-lg rounded-full h-10 w-10 mx-auto bg-gray-200 animate-pulse" />
            <div className="mx-auto bg-gray-200 animate-pulse rounded h-3 w-8 my-2" />
          </div>
          <div className="flex-grow w-80"></div>
          <div className="flex flex-col items-center justify-center w-20">
            <div className="h-3 w-12 mx-auto my-2 bg-gray-200 animate-pulse px-2 rounded-full" />
            <div className="h-3 w-12 mx-auto my-2 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }
  