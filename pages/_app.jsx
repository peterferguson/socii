/*
 *   Entrypoint for all pages that acts a page wrapper for components.
 *   This allows us to add default components which appear on all pages, such as
 *     - Navbar
 *     - User Auth
 */
import Navbar from "@components/Navbar";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "@lib/context";
import { useUserData } from "@lib/hooks";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster position="top-center"
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

export default MyApp;
