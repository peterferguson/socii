import "@styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from "@components/Head";
import Navigation from "@components/Navigation";
import SearchCard from "@components/SearchCard";
import { UserContext } from "@lib/context";
import { useUserData } from "@lib/hooks";
import { isBrowser } from "@utils/helper";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const [showSearchCard, setShowSearchCard] = useState(false);

  const props = {
    ...pageProps,
    showSearchCard,
    setShowSearchCard,
  };

  const toastProps = {
    position: "top-center",
    reverseOrder: false,
    toastOptions: {
      style: {
        margin: "40px",
        background: "#363636",
        color: "#fff",
        zIndex: 1,
      },
      duration: 500,
      // Default options for specific types
      success: {
        duration: 5000,
        theme: {
          primary: "green",
          secondary: "black",
        },
      },
      error: {
        duration: 5000,
        theme: {
          primary: "green",
          secondary: "black",
        },
      },
    },
  };

  return (
    <UserContext.Provider value={userData}>
      <Head />
      {!userData.user && (
        <div className="w-full h-20 bg-gradient-to-r to-brand-light from-teal-400 text-white font-work-sans leading-6 sm:leading-0 text-sm sm:text-lg text-center align-middle p-4">
          👋 socii is currently in private pre-alpha mode.
          <div className="-mt-1">You will need an invite!</div>
        </div>
      )}
      <Navigation {...props} />
      {isBrowser && <SearchCard {...props} />}
      <Component {...pageProps} className={`bg-gray-50 ${props.className}`} />
      <Toaster {...toastProps} />
    </UserContext.Provider>
  );
}
