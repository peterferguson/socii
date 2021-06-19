import { CurrencyCode } from "@lib/constants"
import { auth, firestore } from "@lib/firebase"
import {
  currencyConversion,
  fetcher,
  iexQuote,
  isBrowser,
  isEmpty,
  isPromise,
  round,
} from "@utils/helper"
import Cookie from "js-cookie"
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useMediaQuery } from "react-responsive"
import { StreamChat } from "stream-chat"
import useSWR from "swr"

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
      let unsubscribe: () => void

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

export const useStream = (uid: string, username: any, displayName: string) => {
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

interface Args extends IntersectionObserver {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, threshold, root, rootMargin, frozen])

  return entry
}

export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export const useShareCost = (costPerShare: number) => {
  const [shares, setShares] = useState(1)

  const toShares = (cost: number) => cost / costPerShare
  const toCost = (shares: number) => costPerShare * shares

  const handleChange = (e: { target: { name: any; value: any } }) => {
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

export const useInterval = (callback: () => void, delay: number) => {
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
  toCurrency: CurrencyCode,
  refreshCountThreshold = 10,
  refreshTime = 60 * 1000 // - 1 min in ms,
) => {
  const [refreshCount, setRefreshCount] = useState(0)

  const [value, setValue] = usePersistentState(
    { func: currencyConversion, args: [fromCurrency, toCurrency] },
    `${fromCurrency}${toCurrency}`
  )

  // - polling for updates to exchange rate
  useInterval(
    () => {
      setValue(currencyConversion(fromCurrency, toCurrency))
      setRefreshCount(refreshCount + 1)
    },
    // - `refreshTime` in milliseconds stopped after `refreshCountThreshold` refreshes
    refreshCount < refreshCountThreshold ? refreshTime : null
  )

  if (fromCurrency === toCurrency || !fromCurrency || !toCurrency) {
    window.localStorage.removeItem(`${fromCurrency}${toCurrency}`)
    return [{ rate: 1 }]
  }
  return [value, setValue]
}

export const useCurrencyConversion = (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
) => {
  const { data, error } = useSWR(
    currencyConversion(fromCurrency, toCurrency),
    fetcher,
    { dedupingInterval: 10000 }
  )
  return {
    exchangeRate: data,
    isLoading: !error && !data,
    isError: error,
  }
}

const getter = (k, asCookie) => (asCookie ? Cookie.get(k) : localStorage.getItem(k))
const setter = (k, v, asCookie) =>
  asCookie ? Cookie.set(k, v) : localStorage.setItem(k, v)

export const usePersistentState = (
  defaultValue: any | Promise<any>,
  key: string,
  asCookie: boolean = false
) => {
  const [value, setValue] = useState(() => {
    const persistentValue = JSON.parse(getter(key, asCookie) || null)
    if (persistentValue !== null && !isEmpty(persistentValue)) return persistentValue
    // - Allows us to send an object with the keys func & args as defaultValue
    // TODO: This works in node but is not setting correct value in localStorage
    if (typeof defaultValue === "object" && "func" in defaultValue)
      return defaultValue.func(...defaultValue.args)
    return typeof defaultValue === "function" ? defaultValue() : defaultValue
  })
  useEffect(() => {
    isPromise(value)
      ? // - if the value is a promise resolve it before storing in cache
        value.then((r) => setter(key, JSON.stringify(r), asCookie))
      : setter(key, JSON.stringify(value), asCookie)
  }, [key, value, asCookie])
  return [value, setValue]
}

export const useLocalCurrency = () => usePersistentState("GBP", "localCurrency", true)

interface PriceData {
  price: number
  percentChange: number
  lastUpdated: string
}

export const useTickerPrice = (
  tickerSymbol: string,
  expired = false,
  setExpired = null
): PriceData => {
  const [price, setPrice] = usePersistentState("", `${tickerSymbol}-price`)

  // TODO: Implement cache clearing logic
  // TODO: Implement different price/chart collection policies for more popular stocks
  // ? We could do different pricing strategies based on data availibilty to the user
  // ? For example if a user agrees to decreased data availability we could offered reduced
  // ? price services. Alternatively we could offer to match so part of the cost of a share
  // ? or maybe even offer free shares for opting in.

  useEffect(() => {
    if (!price || expired) {
      iexQuote(tickerSymbol, "latestPrice,changePercent").then(
        ({ latestPrice, changePercent }) => {
          setPrice({
            price: latestPrice || 0.0,
            percentChange: changePercent || 0.0,
            lastUpdated: new Date().toISOString(),
          })
        }
      )
      setExpired?.(false)
    }
  }, [expired, price, setExpired, setPrice, tickerSymbol])

  return price || { price: 0, percentChange: 0, lastUpdated: new Date(0).toISOString() }
}

// ! taken from https://usehooks-typescript.com/react-hook/use-script
export type Status = "idle" | "loading" | "ready" | "error"
export type ScriptElt = HTMLScriptElement | null

export const useScript = (src: string): Status => {
  const [status, setStatus] = useState<Status>(src ? "loading" : "idle")

  useEffect(
    () => {
      if (!src) {
        setStatus("idle")
        return
      }

      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      let script: ScriptElt = document.querySelector(`script[src="${src}"]`)

      if (!script) {
        // Create script
        script = document.createElement("script")
        script.src = src
        script.async = true
        script.setAttribute("data-status", "loading")
        // Add script to document body
        document.body.appendChild(script)

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: Event) => {
          script?.setAttribute("data-status", event.type === "load" ? "ready" : "error")
        }

        script.addEventListener("load", setAttributeFromEvent)
        script.addEventListener("error", setAttributeFromEvent)
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute("data-status") as Status)
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // event handlers to update the state for *this* hook instance.
      const setStateFromEvent = (event: Event) => {
        setStatus(event.type === "load" ? "ready" : "error")
      }

      // Add event listeners
      script.addEventListener("load", setStateFromEvent)
      script.addEventListener("error", setStateFromEvent)

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener("load", setStateFromEvent)
          script.removeEventListener("error", setStateFromEvent)
        }
      }
    },
    [src] // Only re-run effect if script src changes
  )

  return status
}
