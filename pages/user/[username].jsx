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
import { UserContext } from "@lib/context";
import { firestore, auth } from "@lib/firebase";
import IEXQuery from "@lib/iex";
import { fetchURL } from "@utils/helper";

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
      <div className="flex items-center justify-center">
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
                return <GroupPieCard groupName={groupName} />;
              })}
            </AuthCheck>
          )}
        </div>
      </div>
    </main>
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
