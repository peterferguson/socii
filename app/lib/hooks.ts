import { auth, firestore } from "@lib/firebase"

import { useState, useEffect, useLayoutEffect, useRef, useReducer } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useMediaQuery } from "react-responsive"
import { StreamChat } from "stream-chat"

import { currencyConversion, isBrowser, round, iexClient } from "@utils/helper"
import { CurrencyCode } from "@lib/constants"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export function useUserData() {
  const [user] = useAuthState(auth)
  const [username, setUsername] = useState(null)
  const [userGroups, setUserGroups] = useState(null)

  // TODO: This happens every so often which is causing extra reads for the groups &
  // TODO: replication is stopped by the set but it is still unnessecary reads!

  // ! THIS NEEDS REFACTORED! DANS SUGGESTED DEPENDCY LIST CAUSES INFINITE LOOPS IN
  // ! CHAT APP PROBABLY DUE TO USE OF STREAM TOKEN DEFINITION HERE. NEED TO CREATE
  // ! `useStream` HOOK

  useEffect(() => {
    const getUserData = () => {
      // allows us to turn off the realtime data feed when finished
      let unsubscribe

      const userRef = firestore.collection("users").doc(user.uid)
      unsubscribe = userRef.onSnapshot((doc) => {
        const userData = doc.data()
        setUsername(userData?.username)
        setUserGroups(userData?.groups)
      })

      return unsubscribe
    }
    if (user) getUserData()
  }, [user])

  return { user, username, userGroups }
}

export const useStream = (uid, username, displayName) => {
  const streamClient = useRef(null)

  useEffect(() => {
    streamClient.current = StreamChat.getInstance(apiKey, { timeout: 1000 })

    // TODO: Refactor the data model and have a public user_portfolio collection & private user subcollection with keys for each user
    const connectStreamUser = async () => {
      const tokenRef = firestore.collection(`users/${uid}/stream`).doc(uid)
      const snapshot = await tokenRef.get()
      const userStreamToken = (await snapshot.data())?.token

      if (userStreamToken && isBrowser) {
        await streamClient.current?.connectUser(
          { id: username, name: displayName },
          userStreamToken
        )
        console.log(`Connected user ${streamClient.current?.userID} to Stream!`)
      }
    }

    if (uid && username && !streamClient.current?.user) connectStreamUser()
  }, [uid, username, displayName])

  return { streamClient: streamClient.current }
}

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  return size
}

export const useScreenType = () => {
  const is3Cols = useMediaQuery({ minWidth: 1336 })
  const is2Cols = useMediaQuery({ minWidth: 1265 })
  const is1Cols = useMediaQuery({ minWidth: 800 })

  if (is3Cols) {
    return "3-cols"
  }
  if (is2Cols) {
    return "2-cols"
  }
  if (is1Cols) {
    return "1-cols"
  }

  return "fullscreen"
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = "0%",
}) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [node, setNode] = useState<HTMLElement | null>(null)
  const observer = useRef<IntersectionObserver>(null)

  useEffect(() => {
    if (observer.current) {
      observer?.current?.disconnect()
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
        )

        observer.current.observe(node)
      }
    }

    return () => {
      if (observer?.current) {
        observer?.current?.disconnect()
      }
    }
  }, [threshold, root, rootMargin, node])

  return { setNode, entry }
}

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export const useShareCost = (costPerShare) => {
  const [shares, setShares] = useState(1)

  const toShares = (cost) => cost / costPerShare
  const toCost = (shares) => costPerShare * shares

  const handleChange = (e) => {
    const { name, value } = e.target

    const input = parseFloat(value)
    if (isNaN(input)) {
      setShares(1)
      return
    }

    if (name.toLowerCase() === "shares") {
      setShares(input)
      return
    } else {
      setShares(toShares(round(input, 2)))
    }
  }
  return [shares, handleChange, toCost]
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export const useExchangeRate = (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
) => {
  // TODO: update polling
  // Add this for polling the exhange rate
  // useInterval(() => setConversion(), 60 * 1000)

  // - set the rate for the currency pair in local storage
  return usePersistentState(
    currencyConversion(fromCurrency, toCurrency),
    `${fromCurrency}${toCurrency}`
  )
}

export const usePersistentState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const persistentValue = JSON.parse(window.localStorage.getItem(key))
    return persistentValue !== null ? persistentValue : defaultValue
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export const useLocalCurrency = () => {
  return usePersistentState("GBP", "localCurrency")
}

export const useTickerPrice = (tickerSymbol, expired = false, setExpired = null) => {
  const [price, setPrice] = usePersistentState("", `${tickerSymbol}-price`)

  // TODO: Implement cache clearing logic
  // TODO: Implement different price/chart collection policies for more popular stocks
  // ? We could do different pricing strategies based on data availibilty to the user
  // ? For example if a user agrees to decreased data availability we could offered reduced
  // ? price services. Alternatively we could offer to match so part of the cost of a share
  // ? or maybe even offer free shares for opting in.

  if (!price || expired) {
    iexClient
      .quote(tickerSymbol, {
        filter: "latestPrice,changePercent",
      })
      .then(({ latestPrice, changePercent }) => {
        setPrice({
          price: latestPrice || 0.0,
          priceChange: changePercent || 0.0,
          priceLastUpdated: new Date().toISOString(),
        })
      })
    setExpired?.(false)
  }

  return price
}
