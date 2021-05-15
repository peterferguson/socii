import { firestore, auth } from "@lib/firebase";
import { logoUrl } from "@utils/helper";
import Logo from "@components/Logo";

import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import OutlineButton from "../components/OutlineButton";

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

      <section className="bg-white">
        <div className="max-w-5xl px-6 py-16 mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 font-poppins">
            Investing with friends has never been easier!
          </h2>
          <div className="max-w-lg mx-auto mt-4 text-gray-600 font-work-sans leading-6">
            <p className="">
              Before socii if you wanted to invest with friends you needed to
              create your own investment club. <br /> <br />
              {
                "A cumbersome process filled with legal, regulatory & tax issues to worry about."
              }
              <br />
              <br />
              With Socii you dont have to worry about of these. <br />
              We handle everything in individual accounts.
            </p>
          </div>
        </div>
      </section>

      <div className="h-screen bg-gradient-to-l from-gray-200 to-brand-light">
        <section>
          <div className="bg-white text-black py-8 mb-40">
            <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
              <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
                <p className="ml-2 text-brand-light uppercase tracking-loose font-poppins">
                  Social Investing
                </p>
                <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2 font-poppins">
                  What is <Logo className="text-3xl md:text-4xl" />?
                </p>
                <p className="text-sm md:text-base text-black mb-4"></p>
                <OutlineButton href="#" text="Explore Now" />
              </div>
              {/* Problem Timeline */}
              <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
                <div className="container mx-auto w-full h-full">
                  <div className="relative wrap overflow-hidden p-10 h-full">
                    {/* Center Line */}
                    <div
                      className="border-2-2 border-brand-light absolute h-full border"
                      style={{
                        right: "50%",
                        border: "2px solid #2DD4BF",
                        "border-radius": "1%",
                      }}
                    ></div>
                    {/* Headings */}
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
                        <p className="mb-3 text-base text-brand-light font-poppins">
                          Commission Free Example in Blue
                        </p>
                        <h4 className="mb-3 font-bold text-lg md:text-2xl font-poppins">
                          Commission Free
                        </h4>
                        <p className="text-sm md:text-base leading-snug text-gray-700 font-work-sans">
                          No over the top commission charges to your group
                          trades
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
                          No Incorporation
                        </h4>
                        <p className="text-sm md:text-base leading-snug text-black">
                          Participate in investment groups with no need to
                          Incorporate your group.
                        </p>
                      </div>
                    </div>
                    <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                      <div className="order-1 w-5/12"></div>
                      <div className="order-1 w-5/12 px-1 py-4 text-right">
                        <p className="mb-3 text-base text-brand-light">
                          10 May, 2021
                        </p>
                        <h4 className="mb-3 font-bold text-lg md:text-2xl">
                          No Banks
                        </h4>
                        <p className="text-sm md:text-base leading-snug text-black">
                          No need to register your group with a bank and have
                          separation of banking accounts to avoid mixing of
                          funds.
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
                          No Self Audits
                        </h4>
                        <p className="text-sm md:text-base leading-snug text-black">
                          No need to perform self-audits and declare this to
                          regulatory bodies.
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

      <div className="mt-96">
        <section className="bg-white">
          <div className="max-w-5xl px-6 py-16 mx-auto">
            <div className="items-center md:flex md:space-x-6">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Lorem ipsum dolor sit <br /> amet, consectetur
                </h3>
                <p className="max-w-md mt-4 text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <a href="#" className="block mt-8 text-indigo-700 underline">
                  Experienced team
                </a>
              </div>

              <div className="mt-8 md:mt-0 md:w-1/2">
                <div className="flex items-center justify-center">
                  <div className="max-w-md"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-5xl px-6 py-16 mx-auto">
            <div className="items-center md:flex md:space-x-6">
              <div className="md:w-1/2">
                <div className="flex items-center justify-center">
                  <div className="max-w-md"></div>
                </div>
              </div>

              <div className="mt-8 md:mt-0 md:w-1/2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Lorem ipsum dolor sit <br /> amet, consectetur
                </h3>
                <p className="max-w-md mt-4 text-gray-600">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <a href="#" className="block mt-8 text-indigo-700 underline">
                  Experienced team
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-5xl px-6 py-16 mx-auto">
            <h2 className="text-3xl font-semibold text-gray-800">
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing
            </h2>
            <p className="max-w-lg mt-4 text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <div className="grid gap-8 mt-10 md:mt-20 md:grid-cols-2">
              <div className="flex space-x-4">
                <svg
                  className="w-6 h-6 text-gray-500"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M47.6268 23.7062C48.2466 24.4484 48.2466 25.5277 47.6268 26.2699L44.4812 30.0372C43.803 30.8493 43.4742 31.8971 43.5669 32.9512L44.0044 37.9287C44.0912 38.9165 43.4411 39.8188 42.4765 40.0491L38.0619 41.1031C36.9808 41.3612 36.0559 42.0575 35.5089 43.025L33.2053 47.099C32.6961 47.9995 31.5844 48.3631 30.6415 47.9375L26.6498 46.1358C25.6003 45.6621 24.3976 45.6636 23.3493 46.14L19.3597 47.9531C18.4161 48.3819 17.3014 48.0189 16.7912 47.1168L14.4911 43.0489C13.9441 42.0814 13.0192 41.3851 11.9381 41.127L7.52286 40.0728C6.55849 39.8426 5.90838 38.9406 5.99496 37.9529L6.43346 32.9505C6.52583 31.8968 6.19706 30.8494 5.5191 30.0375L2.37029 26.2665C1.75138 25.5253 1.75043 24.4477 2.36803 23.7054L5.52362 19.9127C6.1988 19.1012 6.52582 18.0557 6.43339 17.0041L5.99624 12.0308C5.90922 11.0408 6.56225 10.1372 7.52946 9.90904L11.9298 8.87123C13.0153 8.61522 13.9446 7.91765 14.4935 6.94684L16.7947 2.87709C17.3039 1.97664 18.4156 1.61302 19.3585 2.03858L23.3544 3.8422C24.4007 4.31444 25.5993 4.31444 26.6456 3.8422L30.6415 2.03858C31.5844 1.61301 32.6961 1.97663 33.2053 2.87709L35.5089 6.95112C36.0559 7.9186 36.9808 8.61486 38.0619 8.87297L42.4765 9.92701C43.4411 10.1573 44.0912 11.0596 44.0044 12.0474L43.5669 17.0249C43.4742 18.079 43.803 19.1268 44.4812 19.939L47.6268 23.7062ZM25 37.9326C26.8075 37.9326 28.2727 36.4674 28.2727 34.6599V34.4275C28.2727 32.6201 26.8075 31.1548 25 31.1548C23.1925 31.1548 21.7273 32.6201 21.7273 34.4275V34.6599C21.7273 36.4674 23.1925 37.9326 25 37.9326ZM25 28.377C26.8075 28.377 28.2727 26.9117 28.2727 25.1042V15.3162C28.2727 13.5087 26.8075 12.0435 25 12.0435C23.1925 12.0435 21.7273 13.5087 21.7273 15.3162V25.1042C21.7273 26.9117 23.1925 28.377 25 28.377Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>

                <div>
                  <h4 className="text-xl font-medium text-gray-800">
                    Design concept
                  </h4>
                  <p className="max-w-lg mt-4 text-gray-600">
                    Vitae nulla nunc euismod vel nunc euismod velpretium tellus
                    accumsan nulla nunc euismod ve semper.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <svg
                  className="w-6 h-6 text-gray-500"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 25C1 11.8023 11.8023 1 25 1C38.1977 1 49 11.8023 49 25C49 38.1977 38.1977 49 25 49C11.8023 49 1 38.1977 1 25ZM33.36 35.3573C34.7228 36.1959 36.5074 35.771 37.346 34.4082C38.1913 33.0346 37.7522 31.2351 36.3692 30.4053L28.221 25.5164C27.6186 25.155 27.25 24.504 27.25 23.8014V14.375C27.25 12.7872 25.9628 11.5 24.375 11.5C22.7872 11.5 21.5 12.7872 21.5 14.375V25.8236C21.5 27.2127 22.2206 28.5023 23.4036 29.2302L33.36 35.3573Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>

                <div>
                  <h4 className="text-xl font-medium text-gray-800">
                    Developing websites
                  </h4>
                  <p className="max-w-lg mt-4 text-gray-600">
                    Vitae nulla euismod velpretium tellus accumsan nulla nunc
                    euismod ve semper. Vitae nulla euismod velpretium tellus
                    accumsan nulla nunc euismod ve semper. Vitae nulla euismod
                    velpretium tellus accumsan nulla nunc euismod ve semper.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-5xl px-6 py-16 mx-auto">
            <div className="px-8 py-12 bg-gray-800 rounded-md md:px-20 md:flex md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Lorem ipsum dolor sit amet
                </h3>
                <p className="max-w-md mt-4 text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing Ac aliquam
                  ac volutpat, viverra magna risus aliquam massa.
                </p>
              </div>

              <a
                className="block px-8 py-2 mt-6 text-lg font-medium text-center text-white transition-colors duration-300 transform bg-indigo-600 rounded md:mt-0 hover:bg-indigo-500"
                href="#"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-5xl px-6 py-16 mx-auto">
            <div className="md:flex md:justify-between">
              <h2 className="text-3xl font-semibold text-gray-800">
                Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit,
                sed do eiusmod
              </h2>
              <a
                href="#"
                className="block mt-6 text-indigo-700 underline md:mt-0"
              >
                Experienced team
              </a>
            </div>

            <div className="grid gap-8 mt-10 md:grid-cols-2 lg:grid-cols-3">
              <div className="px-6 py-8 overflow-hidden bg-white rounded-md shadow-md">
                <h2 className="text-xl font-medium text-gray-800">Audio</h2>
                <p className="max-w-md mt-4 text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing Ac aliquam
                  ac volutpat, viverra magna risus aliquam massa.
                </p>
              </div>

              <div className="px-6 py-8 overflow-hidden bg-white rounded-md shadow-md">
                <h2 className="text-xl font-medium text-gray-800">Audio</h2>
                <p className="max-w-md mt-4 text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing Ac aliquam
                  ac volutpat, viverra magna risus aliquam massa.
                </p>
              </div>

              <div className="px-6 py-8 overflow-hidden bg-white rounded-md shadow-md">
                <h2 className="text-xl font-medium text-gray-800">Audio</h2>
                <p className="max-w-md mt-4 text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing Ac aliquam
                  ac volutpat, viverra magna risus aliquam massa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-5xl px-6 py-16 mx-auto space-y-8 md:flex md:items-center md:space-y-0">
            <div className="md:w-2/3">
              <div className="hidden md:flex md:items-center md:space-x-10"></div>
              <h2 className="text-3xl font-semibold text-gray-800 md:mt-6">
                Lorem ipsum dolor{" "}
              </h2>
              <p className="max-w-lg mt-4 text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                illum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="md:w-1/3"></div>
          </div>
        </section>
      </div>
      <div className="flex flex-col mt-32">
        <section className="bg-white">
          <div className="max-w-5xl px-6 py-16 mx-auto text-center">
            <h2 classname="text-3xl font-semibold text-gray-800">
              Our Leadership
            </h2>
            <p className="max-w-lg mx-auto mt-4 text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <div className="grid gap-8 mt-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <img
                  className="object-cover object-center w-full h-64 rounded-md shadow"
                  src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                />
                <h3 className="mt-2 font-medium text-gray-700">John Doe</h3>
                <p className="text-sm text-gray-600">CEO</p>
              </div>
              <div>
                <img
                  className="object-cover object-center w-full h-64 rounded-md shadow"
                  src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                />
                <h3 className="mt-2 font-medium text-gray-700">John Doe</h3>
                <p className="text-sm text-gray-600">CEO</p>
              </div>
              <div>
                <img
                  className="object-cover object-center w-full h-64 rounded-md shadow"
                  src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                />
                <h3 className="mt-2 font-medium text-gray-700">John Doe</h3>
                <p className="text-sm text-gray-600">CEO</p>
              </div>
              <div>
                <img
                  className="object-cover object-center w-full h-64 rounded-md shadow"
                  src="https://images.unsplash.com/photo-1614030126544-b79b92e29e98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                />
                <h3 className="mt-2 font-medium text-gray-700">John Doe</h3>
                <p className="text-sm text-gray-600">CEO</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
