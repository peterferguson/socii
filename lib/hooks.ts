import { auth, firestore } from "@lib/firebase";
import { useState, useEffect } from "react";
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

  return {user, username};
}
