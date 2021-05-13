import { firestore, auth } from "@lib/firebase";
import { logoUrl } from "@utils/helper";

import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";

function TickerList() {
  const query = firestore.collection("tickers").where("isPopular", "==", true);
  const [querySnapshot] = useCollection(query);
  const tickers = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      {tickers &&
        tickers.map((ticker) => {
          return (
            <img
              className="flex shadow-lg rounded-full h-16 w-16 ml-4 sm:ml-0 btn-transition"
              src={logoUrl(ticker.ISIN)}
              alt={`${ticker.tickerSymbol} logo`}
            />
          );
        })}
    </>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-2 bg-gray-50 h-screen">
        {/* <bluryGradientBg className="bg-teal-400"/> */}
        <div className="grid-rows-4 z-40">
          <div className="text-7xl pt-24 sm:pt-32 px-4 font-poppins animate-fade-in-down">
            Invest Together.
          </div>
          <div className="text-2xl sm:text-4xl pt-4 px-4 font-poppins animate-fade-in-up">
            Secure Your Financial
          </div>
          <div className="text-2xl sm:text-4xl pb-4 px-4 font-poppins animate-fade-in-up">
            Future With Friends.
          </div>
          <div>
            <button
              className="btn btn-transition"
              onClick={() =>
                router.push(auth.currentUser ? "/stock" : "/enter")
              }
            >
              Invest Now
            </button>
          </div>
        </div>
        <div className="flex bg-gradient-to-r from-green-300 to-brand-light z-0 animate-fade-in-right">
          <svg
            className="fill-current text-gray-50 h-full w-32 -ml-16 z-1"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <polygon className="" points="50,0 100,0 50,100 0,100" />
          </svg>
        </div>
      </div>
      <div className="w-full h-24 flex flex-row items-center justify-between bg-white overflow-y-hidden">
        <TickerList />
      </div>
      <div className="h-screen bg-brand-light items-center justify-center flex flex-col">
        <div className="font-bold text-4xl leading-3 font-poppins text-white mt-8">
          About Us
        </div>
        <div className=" h-2/4 flex-grow" />
      </div>
    </>
  );
}
