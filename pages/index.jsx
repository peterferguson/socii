import { firestore, auth } from "@lib/firebase";
import { logoUrl } from "@utils/helper";

import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";

function TickerList() {
  const [numberOfTickers, setNumberOfTickers] = useState(8);
  const query = firestore
    .collection("tickers")
    .where("isPopular", "==", true)
    .limit(numberOfTickers);
  const [querySnapshot] = useCollection(query);
  const tickers = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <div
        className={`grid grid-cols-${numberOfTickers} p-4 grid-flow-row-dense bg-white h-24`}
      >
        {tickers &&
          tickers.map((ticker) => {
            return (
              <img
                className="shadow-lg rounded-full h-auto w-16 ml-4 sm:ml-0 btn-transition"
                src={logoUrl(ticker.ISIN)}
                alt={`${ticker.tickerSymbol} logo`}
              />
            );
          })}
      </div>
    </>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-2 bg-gray-50 h-screen">
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
      <div className="w-full h-24">
        <TickerList />
      </div>
      <div className="h-screen bg-teal-300 items-center justify-center flex flex-col">
        <div className="text-4xl flex">About Us</div>
        <div className="text-4xl flex">Socii’s goal: </div>
        To be the starting place for small groups of friends to begin, learn and
        refine their investing skills, together.
      </div>
      <div className="h-screen bg-gradient-to-l from-gray-200 to-brand-light">
        <section>
          <div className="bg-white text-black py-8">
            <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
              <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
                <p className="ml-2 text-brand-light uppercase tracking-loose">
                  The Problem With Group Investing
                </p>
                <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2">
                  What Problems does Socii Fix?
                </p>
                <p className="text-sm md:text-base text-black mb-4">
                  Here is some of the highlights of what Socii fixes
                </p>
                <a
                  href="#"
                  className="bg-transparent mr-auto hover:bg-teal-500 text-brand-light hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-brand-light hover:border-transparent"
                >
                  Explore Now
                </a>
              </div>
              <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
                <div className="container mx-auto w-full h-full">
                  <div className="relative wrap overflow-hidden p-10 h-full">
                    <div
                      className="border-2-2 border-brand-light absolute h-full border"
                      style={{
                        right: "50%",
                        border: "2px solid #2DD4BF",
                        "border-radius": "1%",
                      }}
                    ></div>
                    <div
                      className="border-2-2 border-brand-light absolute h-full border"
                      style={{
                        left: "50%",
                        border: "2px solid #2DD4BF",
                        "border-radius": "1%",
                      }}
                    ></div>
                    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                      <div className="order-1 w-5/12"></div>
                      <div className="order-1 w-5/12 px-1 py-4 text-right">
                        <p className="mb-3 text-base text-brand-light">
                          1-6 May, 2021
                        </p>
                        <h4 className="mb-3 font-bold text-lg md:text-2xl">
                          Registration
                        </h4>
                        <p className="text-sm md:text-base leading-snug text-black">
                          Pick your favourite event(s) and register in that
                          event by filling the form corresponding to that event.
                          Its that easy :)
                        </p>
                      </div>
                    </div>
                    <div className="mb-8 flex justify-between items-center w-full right-timeline">
                      <div className="order-1 w-5/12"></div>
                      <div className="order-1  w-5/12 px-1 py-4 text-left">
                        <p className="mb-3 text-base text-brand-light">
                          6-9 May, 2021
                        </p>
                        <h4 className="mb-3 font-bold text-lg md:text-2xl">
                          Participation
                        </h4>
                        <p className="text-sm md:text-base leading-snug text-black">
                          Participate online. The links for your registered
                          events will be sent to you via email and whatsapp
                          groups. Use those links and show your talent.
                        </p>
                      </div>
                    </div>
                    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                      <div className="order-1 w-5/12"></div>
                      <div className="order-1 w-5/12 px-1 py-4 text-right">
                        <p className="mb-3 text-base text-brand-light">
                          {" "}
                          10 May, 2021
                        </p>
                        <h4 className="mb-3 font-bold text-lg md:text-2xl">
                          Result Declaration
                        </h4>
                        <p className="text-sm md:text-base leading-snug text-black">
                          The ultimate genius will be revealed by our judging
                          panel on 10th May, 2021 and the resukts will be
                          announced on the whatsapp groups and will be mailed to
                          you.
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 flex justify-between items-center w-full right-timeline">
                      <div className="order-1 w-5/12"></div>

                      <div className="order-1  w-5/12 px-1 py-4">
                        <p className="mb-3 text-base text-brand-light">
                          12 May, 2021
                        </p>
                        <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">
                          Prize Distribution
                        </h4>
                        <p className="text-sm md:text-base leading-snug text-black">
                          The winners will be contacted by our team for their
                          addresses and the winning goodies will be sent at
                          their addresses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
