import { auth, firestore, functions } from "@lib/firebase";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useReducer,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMediaQuery } from "react-responsive";
import { StreamChat } from "stream-chat";

import { fetchJSON, localCostPerShare } from "@utils/helper";
import IEXQuery from "@lib/iex";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const iexClient = new IEXQuery();

export function useUserData() {
  const [user] = useAuthState(auth);

  const [username, setUsername] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [userStreamToken, setUserStreamToken] = useState("");

  const streamClient = StreamChat.getInstance(apiKey);

  let streamData;

  // TODO: This happens every so often which is causing extra reads for the groups &
  // TODO: replication is stopped by the set but it is still unnessecary reads!

  // ! THIS NEEDS REFACTORED! DANS SUGGESTED DEPENDCY LIST CAUSES INFINITE LOOPS IN
  // ! CHAT APP PROBABLY DUE TO USE OF STREAM TOKEN DEFINITION HERE. NEED TO CREATE
  // ! `useStream` HOOK

  const getUsername = () => {
    // allows us to turn off the realtime data feed when finished
    let unsubscribe;

    const userRef = firestore.collection("users").doc(user.uid);
    unsubscribe = userRef.onSnapshot((doc) => {
      const userData = doc.data();
      setUsername(userData?.username);
      setUserGroups([...new Set([...userGroups, ...userData?.groups])]);
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

function TickerPriceDataReducer(state, action) {
  switch (action.type) {
    case "UPDATE_PRICE": {
      return {
        ...state,
        price: action.price,
        priceChange: action.priceChange,
        priceLastUpdated: action.priceLastUpdated,
      };
    }
    case "UPDATE_TICKER": {
      return {
        ...state,
        ticker: action.ticker,
      };
    }
    case "UPDATE_COST_PER_SHARE": {
      return {
        ...state,
        exchangeRate: action.exchangeRate,
        costPerShare: action.costPerShare,
        exchangeRateLastUpdated: action.lastRefresh,
      };
    }
    case "UPDATE_ASSET_CURRENCY": {
      return {
        ...state,
        assetCurrency: action.assetCurrency,
      };
    }
    default:
      return new Error(`Unhandled action type in reducer ${action.type}`);
  }
}

// - Assumes initial state has tickerSymbol
// TODO typing
// TODO Add update dispatches to call updates to the values?
export function useTickerPriceData({ tickerSymbol, purchaseCurrency = "GBP" }) {
  const [state, dispatch] = useReducer(TickerPriceDataReducer, {
    ticker: null,
    price: 0.0,
    priceChange: 0.0,
    priceLastUpdated: "",
    exchangeRate: 1.0,
    exchangeRateLastUpdated: "",
    localCostPerShare: 0.0,
    assetCurrency: "USD",
    purchaseCurrency,
  });

  useEffect(() => {
    let stockPrice;
    let changePct;

    const callIEX = async () => {
      stockPrice = await fetchJSON(iexClient.stockPrice(tickerSymbol));
      changePct = await fetchJSON(
        iexClient.stockQuote(tickerSymbol, "changePercent")
      );

      console.log(`stock :${stockPrice}`);
      dispatch({
        type: "UPDATE_PRICE",
        price: stockPrice,
        priceChange: changePct,
        priceLastUpdated: new Date().toLocaleString(),
      });
    };

    const getTickerData = async () => {
      const tickerQuery = firestore
        .collectionGroup("data")
        .where("symbol", "==", tickerSymbol)
        .limit(1);
      const ticker = await (await tickerQuery.get()).docs[0].data();
      dispatch({ type: "UPDATE_TICKER", ticker });
      dispatch({
        type: "UPDATE_ASSET_CURRENCY",
        assetCurrency: ticker.currency,
      });
    };

    callIEX();
    getTickerData();
  }, [tickerSymbol]);

  useEffect(() => {
    const updateExchangeRate = async () => {
      const { costPerShare, lastRefresh, exchangeRate } =
        await localCostPerShare(
          state.cost,
          state.assetCurrency,
          state.purchaseCurrency
        );
      dispatch({
        type: "UPDATE_COST_PER_SHARE",
        costPerShare,
        lastRefresh,
        exchangeRate,
      });
    };
    updateExchangeRate();
  }, [state.assetCurrency, state.cost, state.purchaseCurrency]);

  return state;
}

export const useCostPerShare = (costPerShare) => {
  const [cost, setCost] = useState(costPerShare?.toString());

  const toShares = (cost) => cost / costPerShare;
  const toCost = (shares) => costPerShare * shares;

  function tryConvert(cost, convert) {
    const input = parseFloat(cost);

    if (isNaN(input)) return "";

    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000; // 3 d.p
    return rounded.toString();
  }

  const onShareChange = (e) =>
    setCost(tryConvert(Number(e.target.value).toString(), toCost));

  const onCostChange = (e) =>
    setCost(tryConvert(Number(e.target.value).toString(), (v) => v));

  return [cost, onCostChange, onShareChange, toShares];
};
