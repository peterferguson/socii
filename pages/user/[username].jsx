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
import { UserContext } from "@lib/context";
import { useContext} from "react";

export default function UserPage() {
  const { user, username } = useContext(UserContext);
  return (
    <main className="bg-gray-50 h-screen w-screen flex">
      <AuthCheck>
        <div className="flex flex-row">
          <img src={user?.photoURL} className="m-4 rounded-full h-12 w-12" />
          <div className="p-4 text-xl font-poppins text-brand-light">
            {username}
          </div>
        </div>
        <DonutChart />
      </AuthCheck>
    </main>
  );
}
