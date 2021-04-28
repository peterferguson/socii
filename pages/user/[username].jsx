// ! A portfolio page for the user to view their holdings

// * This could be a homepage for the different groups the investor is apart of.
// ? I am not sure it needs to be a dynamically routed page... maybe this can just take
// ? place in the index.jsx

// * A place for portfolio insights but not specific holdings
// ! (The place for that is index.js)

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
import { useRouter } from "next/router";
import { UserContext } from "@lib/context";
import { firestore, auth } from "@lib/firebase";
import { useContext } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

export default function UserPage() {
  const router = useRouter();
  const pagename = router.query.username;
  const { user, username } = useContext(UserContext);
  const [groups, loading] = useCollectionOnce(
    user
      ? firestore
          .collection(`users/${user.uid}/groups`)
          .where("groupName", ">", "")
      : null
  );
  console.log(groups);
  // TODO: Convert user photo to a default if none is present
  // TODO: (maybe create a component based on initials)
  return (
    <main className="bg-gray-50 h-full w-full">
      <div className="flex flex-row w-full">
        <img src={user?.photoURL} className="m-4 rounded-full h-12 w-12" />
        <div className="p-4 text-xl font-poppins text-brand-light">
          {pagename}
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-wrap items-center justify-center">
          {(!user || loading) && (
            <>
              <PieCardSkeleton scaling={0.3} radius={250} />
              <PieCardSkeleton scaling={0.3} radius={250} />
              <PieCardSkeleton scaling={0.3} radius={250} />
            </>
          )}
          {username == pagename && (
            <AuthCheck>
              {groups
                ? groups.docs.map((data) => {
                    return (
                      <PieCard
                        groupName={data?.id}
                        data={[{ theta: 1.5 }, { theta: 2 }]}
                        scaling={0.3}
                        radius={250}
                        text={{ main: "Price", sub: "%pct" }}
                      />
                    );
                  })
                : null}
            </AuthCheck>
          )}
        </div>
      </div>
    </main>
  );
}
