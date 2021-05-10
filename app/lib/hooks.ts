import { auth, firestore, functions } from "@lib/firebase";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMediaQuery } from "react-responsive";

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [userStreamToken, setUserStreamToken] = useState("");
  const [userGroups, setUserGroups] = useState([]);

  let streamData;

  const getStreamToken = async () => {
    const tokenRef = firestore
      .collection(`users/${user.uid}/stream`)
      .doc(user.uid);
    const snapshot = await tokenRef.get();
    if (snapshot.exists) {
      streamData = await snapshot.data();
    } else {
      functions.httpsCallable("generateToken")({ username });
      streamData = await snapshot.data();
    }
    setUserStreamToken(streamData?.token);
  };

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
      getStreamToken();
    } else {
      setUsername("");
      setUserGroups([]);
    }
    return unsubscribe;
  }, [user]);

  return { user, username, userStreamToken, userGroups };
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

export const useScreenType = () => {
  const is3Cols = useMediaQuery({ minWidth: 1336 });
  const is2Cols = useMediaQuery({ minWidth: 1265 });
  const is1Cols = useMediaQuery({ minWidth: 800 });

  if (is3Cols) {
    return "3-cols";
  }
  if (is2Cols) {
    return "2-cols";
  }
  if (is1Cols) {
    return "1-cols";
  }

  return "fullscreen";
};

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = "0%",
}) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<HTMLElement | null>(null);
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (observer.current) {
      observer?.current?.disconnect();
    }

    if (node) {
      if (window.IntersectionObserver) {
        observer.current = new window.IntersectionObserver(
          ([newEntry]) => setEntry(newEntry),
          {
            root,
            rootMargin,
            threshold,
          }
        );

        observer.current.observe(node);
      }
    }

    return () => {
      if (observer?.current) {
        observer?.current?.disconnect();
      }
    };
  }, [threshold, root, rootMargin, node]);

  return { setNode, entry };
};
