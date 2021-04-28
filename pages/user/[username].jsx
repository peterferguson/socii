// ! A portfolio page for the user to view their holdings

// * This could be a homepage for the different groups the investor is apart of.
// ? I am not sure it needs to be a dynamically routed page... maybe this can just take
// ? place in the index.jsx

// * A place for portfolio insights but not specific holdings
// ! (The place for that is index.js)

// TODOs (Page Features):
// - Display the pie charts of each of the groups the user is part of but solely for their share
// -
// -
// -
// -
// -
// -
// -
// -

import AuthCheck from "@components/AuthCheck";
import DonutChart from "@components/DonutChart";
import { useRouter } from "next/router";
import { UserContext } from "@lib/context";
import { useContext } from "react";

export default function UserPage() {
  const router = useRouter();
  const pagename = router.query.username;
  const { user, username } = useContext(UserContext);

  // TODO: Convert user photo to a default if none is present
  // TODO: (maybe create a component based on initials)
  return (
    <main className="bg-gray-50 h-screen w-screen">
      <div className="flex flex-row w-full">
        <img src={user?.photoURL} className="m-4 rounded-full h-12 w-12" />
        <div className="p-4 text-xl font-poppins text-brand-light">
          {pagename}
        </div>
      </div>
      <div className="flex">
        {username == pagename && (
          <AuthCheck>
            <div className="flex flex-wrap items-center justify-center">
            {/* TODO: Loop over groups to create cards for each in this row */}
              <div className="bg-red-50 rounded-xl shadow-2xl m-4">
                <DonutChart
                  className="z-0"
                  data={[{ theta: 1 }, { theta: 2 }]}
                  scaling={0.3}
                  radius={250}
                />
              </div>
            </div>
          </AuthCheck>
        )}
      </div>
    </main>
  );
}
