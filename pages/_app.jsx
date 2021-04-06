import "tailwindcss/tailwind.css";
import Head from "@components/Head";
import Navigation from "@components/Navigation";
import SearchCard from "@components/SearchCard";
import { UserContext } from "@lib/context";
import { useUserData } from "@lib/hooks";

import { useState } from "react";

import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const [showSearchCard, setShowSearchCard] = useState(false);
  const toggleSearchCard = () => {
    setShowSearchCard(!showSearchCard);
  };
  const props = {
    ...pageProps,
    showSearchCard,
    toggleSearchCard,
  };
  return (
    <UserContext.Provider value={userData}>
      <Head />
      <Navigation {...props} />
      <SearchCard {...props} />
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          style: {
            margin: "40px",
            background: "#363636",
            color: "#fff",
            zIndex: 1,
          },
          duration: 1000,
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </UserContext.Provider>
  );
}
