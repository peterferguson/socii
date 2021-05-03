import { auth, firestore } from "@lib/firebase";
import { useState, useEffect, useLayoutEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    // allows us to turn off the realtime data feed when finished
    let unsubscribe;

    if (user) {
      const userRef = firestore.collection("users").doc(user.uid);
      unsubscribe = userRef.onSnapshot((doc) => {
        const userData = doc.data();
        setUsername(userData?.username);
        setUserGroups(userGroups?.concat(userData?.groups));
      });
    } else {
      setUsername("");
      setUserGroups([]);
    }
    return unsubscribe;
  }, [user]);

  return { user, username, userGroups };
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
