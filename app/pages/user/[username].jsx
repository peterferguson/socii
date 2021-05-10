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
import { PieCardSkeleton } from "@components/PieCard";
import GroupColumn from "@components/GroupCharts";
import { UserContext } from "@lib/context";
import { auth } from "@lib/firebase";

import { useRouter } from "next/router";
import { useContext } from "react";

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
      <div className="text-5xl font-poppins m-8 mx-auto flex items-center justify-center">
        Groups
      </div>
      <div className="flex flex-wrap justify-center">
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
              return <GroupColumn groupName={groupName} />;
            })}
          </AuthCheck>
        )}
      </div>
    </main>
  );
}
