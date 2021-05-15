import { auth, firestore, functions } from "@lib/firebase";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMediaQuery } from "react-responsive";
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export function useUserData() {
  const [user] = useAuthState(auth);

  const [username, setUsername] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [userStreamToken, setUserStreamToken] = useState("");

  const streamClient = StreamChat.getInstance(apiKey);

  let streamData;

  const getUsername = () => {
    // allows us to turn off the realtime data feed when finished
    let unsubscribe;

    const userRef = firestore.collection("users").doc(user.uid);
    unsubscribe = userRef.onSnapshot((doc) => {
      const userData = doc.data();
      setUsername(userData?.username);
      setUserGroups(userGroups?.concat(userData?.groups));
    });

    return unsubscribe;
  };

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
    if (user) {
      getUsername();
      getStreamToken();
    } else {
      setUsername("");
      setUserGroups([]);
      setUserStreamToken("");
    }
  }, [user]);

  useEffect(() => {
    const connectStreamUser = async () => {
      await streamClient.connectUser(
        { id: username, name: user?.displayName },
        userStreamToken
      );
    };

    if (user && username && userStreamToken) {
      connectStreamUser();
    }
  }, [user, username, userStreamToken]);

  return { user, username, userGroups, streamClient };
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

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}
