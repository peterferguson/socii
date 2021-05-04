// TODOs (Page Features):
// - Display the pie charts of each of the groups the user is part of but solely for their share
// // - Create pie charts & skeleton loaders for those charts
// - Create conversion function for the group holdings data into pie format
// - Create conversion function for the group trade data into long form cards
// ? - Create conversion function for the group trade data into an activity feed
// -
// -
// -
// -
// -
// -
// -

import AuthCheck from "@components/AuthCheck";
import PieCard, { PieCardSkeleton } from "@components/PieCard";
import { Link } from "next/link";
import { UserContext } from "@lib/context";
import { firestore, auth } from "@lib/firebase";
import IEXQuery from "@lib/iex";
import { fetchURL, logoUrl } from "@utils/helper";

import { useRouter } from "next/router";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useState, useEffect, useContext } from "react";

/**
 *  * The page will need the following data to display the users stocks:
 *   - First we need to fetch their groups
 *   - Second we need to fetch their holdings
 *   ? Maybe last few trades also?
 *   ? If we make this a collection group query with the usernames of the users
 *   ? attached to the trades then we could display last 5 trades of the user
 *   ? regardless of group
 *  - Thirdly we need the IEX latest price data
 *
 */

export default function UserPage() {
  const router = useRouter();
  const pagename = router.query.username;
  const { username, userGroups } = useContext(UserContext);

  // TODO: Convert user photo to a default if none is present
  // TODO: (maybe create a component based on initials)
  return (
    <main>
      <div className="flex flex-row w-full">
        <img
          src={auth.currentUser?.photoURL}
          className="m-4 rounded-full h-12 w-12"
        />
        <div className="p-4 text-xl font-poppins text-brand-light">
          {pagename}
        </div>
      </div>
      <div className="text-3xl p-4 font-poppins">Groups</div>
      <div className="flex flex-wrap items-center justify-center">
        {(!auth.currentUser || !userGroups) && (
          <>
            <PieCardSkeleton scaling={0.3} radius={250} />
            <PieCardSkeleton scaling={0.3} radius={250} />
            <PieCardSkeleton scaling={0.3} radius={250} />
          </>
        )}
        {username == pagename && (
          <AuthCheck>
            {userGroups?.map((groupName) => {
              // return <GroupPieCard groupName={groupName} />;
              return <GroupColumn groupName={groupName} />;
            })}
          </AuthCheck>
        )}
      </div>
    </main>
  );
}

// TODO: Add holdings section below each of the groups
function GroupColumn({ groupName }) {
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
    ({ tickerSymbol, shortName, avgPrice, shares }) => {
      return { tickerSymbol, shortName, avgPrice, shares };
    }
  );

  const portfolioValue = holdingData
    ?.map(({ tickerSymbol, shares }) => currentPrices[tickerSymbol] * shares)
    .reduce((a, b) => a + b, 0);

  const gain =
    (holdingData
      ?.map(({ avgPrice, shares }) => avgPrice * shares)
      .reduce((a, b) => a + b, 0) *
      100) /
    portfolioValue;

  const pieData = holdingData?.map(({ tickerSymbol, shortName, shares }) => ({
    theta: (currentPrices[tickerSymbol] * shares) / portfolioValue,
    label: shortName,
    subLabel: tickerSymbol,
  }));

  return (
    <div className="flex flex-col items-center justify-center">
      {!loading ? (
        <PieCard
          groupName={groupName}
          data={pieData}
          scaling={0.3}
          radius={250}
          text={{
            main: `$${portfolioValue?.toFixed(2)}`,
            sub: `${gain.toFixed(2)}%`,
          }}
        />
      ) : (
        <PieCardSkeleton scaling={0.3} radius={250} />
      )}
      {!loading &&
        holdingData.map((holding) => {
          return <StockCardSkeleton />;
          // return currentPrices ? (
          //   <StockCard
          //     holding={holding}
          //     latestPrice={currentPrices[holding.tickerSymbol]}
          //   />
          // ) : (
          //   <StockCardSkeleton />
          // );
        })}
    </div>
  );
}

function GroupPieCard({ groupName }) {
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
    ({ tickerSymbol, shortName, avgPrice, shares }) => {
      return { tickerSymbol, shortName, avgPrice, shares };
    }
  );

  const portfolioValue = holdingData
    ?.map(({ tickerSymbol, shares }) => currentPrices[tickerSymbol] * shares)
    .reduce((a, b) => a + b, 0);

  const gain =
    (holdingData
      ?.map(({ avgPrice, shares }) => avgPrice * shares)
      .reduce((a, b) => a + b, 0) *
      100) /
    portfolioValue;

  const pieData = holdingData?.map(({ tickerSymbol, shortName, shares }) => ({
    theta: (currentPrices[tickerSymbol] * shares) / portfolioValue,
    label: shortName,
    subLabel: tickerSymbol,
  }));

  return (
    <>
      {!loading ? (
        <PieCard
          groupName={groupName}
          data={pieData}
          scaling={0.3}
          radius={250}
          text={{
            main: `$${portfolioValue?.toFixed(2)}`,
            sub: `${gain.toFixed(2)}%`,
          }}
        />
      ) : (
        <PieCardSkeleton scaling={0.3} radius={250} />
      )}
    </>
  );
}

function StockCard({ holding, latestPrice, currencySymbol = "$" }) {
  console.log(holding);
  console.log(latestPrice);
  const tickerSymbol = holding.tickerSymbol;
  console.log(tickerSymbol);

  const pnl = (latestPrice - holding.avgPrice) / holding.avgPrice;
  console.log(pnl);

  return (
    <div className="max-w-sm w-11/12 sm:w-1/2 lg:w-1/3 h-auto m-1">
      <div className="bg-white shadow-2xl rounded-lg overflow-hidden flex h-20 p-2">
        <div className="flex-none mx-auto justify-center rounded-full w-20">
          <Link href={`stock/${tickerSymbol}`}>
            <a>
              <img
                className="shadow-lg rounded-full h-10 w-10 mx-auto"
                src={logoUrl(tickerSymbol)}
                alt={`${tickerSymbol} logo`}
              />
            </a>
          </Link>
          <Link href={`stock/${tickerSymbol}`}>
            <a>
              <div className="text-center text-gray-600 uppercase text-tiny font-semibold tracking-wider">
                {holding.shortName}
              </div>
            </a>
          </Link>
          <Link href={`stock/${tickerSymbol}`}>
            <a>
              <div className="text-center text-gray-600 uppercase text-tiny font-semibold tracking-wider">
                {tickerSymbol}
              </div>
            </a>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-20">
          <div className="text-gray-600 uppercase text-sm font-semibold tracking-wider overflow-ellipsis overflow-hidden">
            {currencySymbol}
            {latestPrice * holding.shares}
          </div>
          <div
            className={`${
              pnl > 0 ? "bg-teal-200" : pnl < 0 ? "bg-red-200" : "bg-brand"
            } text-black text-tiny sm:text-xs px-2 rounded-full font-semibold w-full text-center inline-block`}
          >
            {100 * pnl.toFixed(2)}
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
