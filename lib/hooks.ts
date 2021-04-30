import { auth, firestore } from "@lib/firebase";
import { useState, useEffect, useLayoutEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // allows us to turn off the realtime data feed when finished
    let unsubscribe;

    if (user) {
      const userRef = firestore.collection("users").doc(user.uid);
      unsubscribe = userRef.onSnapshot((doc) => {
        // set username if exists
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername("");
    }
    return unsubscribe;
  }, [user]);

  return { user, username };
}

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const useApi = (url) => {
  const [state, setState] = useState({
    loading: false,
    error: "",
    data: [],
  });

  const setPartialState = (partial) => setState({ ...state, ...partial });

  useEffect(() => {
    setPartialState({ loading: true });
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPartialState({ data }))
      .catch(() => setPartialState({ error: "fetch failed" }))
      .finally(() => setPartialState({ loading: false }));
  }, []);

  return state;
};
