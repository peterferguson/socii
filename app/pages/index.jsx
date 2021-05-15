import { firestore } from "@lib/firebase";
import { logoUrl } from "@utils/helper";
import Logo from "@components/Logo";
import OutlineButton from "@components/OutlineButton";

import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";

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
      <div className="w-full h-24 flex flex-row items-center justify-between overflow-y-hidden">
        <TickerList />
      </div>

      <WhySocii />
      <FeatureSlider />

      {/* Contact Us */}
      <div className="max-w-5xl px-6 py-16 mx-auto h-1/2 items-center justify-center flex">
        <div className="px-8 py-12 bg-teal-500 rounded-md md:px-20">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Want to be part of the alpha?
            </h3>
            <p className="max-w-md mt-4 text-teal-900 pb-2">Drop us a line!</p>
          </div>
          <input
            className="w-full p-4 rounded-md"
            type="email"
            placeholder="email@email.com"
          />
        </div>
      </div>
    </>
  );
}

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

function WhySocii() {
  return (
    <section className="h-screen bg-brand flex items-center justify-center">
      <div className="max-w-5xl py-16 pl-4 sm:p-0">
        <h2 className="text-3xl text-gray-100 font-poppins font-extrabold">
          Investing with friends has never been easier!
        </h2>
        <div className="max-w-lg mx-auto mt-4 text-white leading-6">
          <p className="pr-4 font-thin">
            Investing with friends <span className="font-bold">used</span> to
            mean setting up an investment club, a cumbersome process filled with
            legal, tax & audit issues to worry about.
            <br />
            <br />
            With soc
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-brand-light font-poppins pr-1">
              ii
            </span>
            you dont have to worry about of these. <br />
            We handle everything in individual accounts.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureSlider() {
  const timelineHeadings = [
    {
      supTitle: "Social Investment Platform",
      title: "Find & Share Investment Ideas",
      description:
        "Chat with friends in group chats & forums about potential investments",
    },
    {
      supTitle: "Group Trade Execution",
      title: "Execute Trades Directly From Chat",
      description: "Use chat bot to set up & execute trades",
    },
    {
      supTitle: "Competitive Leagues",
      title: "Public Group Leaderboards",
      description:
        "Go head to head with and gain investment ideas from other groups",
    },
    {
      supTitle: "Incorporation Free",
      title: "No Incorporation",
      description: "No need to create a company just to invest with friends!",
    },
  ];
  return (
    <>
      <div className="bg-brand-teal text-black py-8">
        <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
          <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
            <p className="text-xs text-brand-light uppercase tracking-loose font-poppins">
              Social Investing
            </p>
            <p className="text-3xl md:text-4xl leading-normal md:leading-relaxed mb-2 font-poppins font-extrabold">
              What is <Logo className="text-3xl md:text-4xl" />?
            </p>
            <p className="text-sm md:text-base text-black mb-4"></p>
            <OutlineButton href="#" text="Explore Now" />
          </div>
          {/* Feature Slider */}
          <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
            <div className="container mx-auto w-full h-full">
              <div className="relative wrap overflow-hidden p-10 h-full">
                {/* Center Line */}
                <div className="border-2-2 border-teal-300 absolute h-full border-2 right-1/2"></div>
                <div className="border-2-2 border-teal-300 absolute h-full border-2 left-1/2"></div>
                {/* Headings */}
                {timelineHeadings.map((item, index) => {
                  return (
                    <div
                      className={`mb-8 flex justify-between ${
                        index % 2 == 0 ? "flex-row-reverse" : ""
                      } items-center w-full`}
                    >
                      <div className="order-1 w-5/12"></div>
                      <div className="order-1 w-5/12 px-1 py-4 text-right">
                        <p className="mb-3 text-sm text-brand-light font-poppins">
                          {item.supTitle}
                        </p>
                        <h4 className="mb-3 font-bold text-lg md:text-2xl font-poppins">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-base leading-snug text-gray-500 font-work-sans">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
