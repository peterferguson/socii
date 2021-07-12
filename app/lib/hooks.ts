import { CurrencyCode } from "@lib/constants"
import { streamContext, userContext } from "@lib/context"
import {
    auth,
    FacebookAuthProvider,
    firestore,
    GoogleAuthProvider
} from "@lib/firebase"
import {
    currencyConversion,
    fetcher,
    formatUser,
    iexQuote,
    isBrowser,
    isEmpty,
    isPromise,
    round,
    userFirstName
} from "@utils/helper"
import firebase from "firebase"
import Cookie from "js-cookie"
import Router from "next/router"
import {
    RefObject,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from "react"
import toast from "react-hot-toast"
import { useScroll } from "react-use"
import { StreamChat } from "stream-chat"
import useSWR from "swr"
import { UrlObject } from "url"
import { createUser } from "./db"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export const useStream = () => useContext(streamContext)

export const useProvideStream = (
  uid: string,
  username: string,
  displayName: string
) => {
  const streamClient = useRef<StreamChat | null>(null)

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

  return { client: streamClient.current }
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

interface IntersectionObserverProps {
  threshold?: number
  root?: Element
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  }: IntersectionObserverProps
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

const getter = (k: string, asCookie: boolean) =>
  asCookie ? Cookie.getJSON(k) : JSON.parse(localStorage.getItem(k))
const setter = (k: string, v: string | object, asCookie: boolean) => {
  return asCookie
    ? Cookie.set(k, JSON.stringify(v))
    : localStorage.setItem(k, JSON.stringify(v))
}

interface PersistenceDefaultValueFunction {
  func: () => any
  args: any[]
}

export const usePersistentState = (
  defaultValue: any | PersistenceDefaultValueFunction | Promise<any>,
  key: string,
  asCookie: boolean = false
) => {
  const [value, setValue] = useState(() => {
    const persistentValue = getter(key, asCookie) || null
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
        value.then((r: string | object) => setter(key, r, asCookie))
      : setter(key, value, asCookie)
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
  const [price, setPrice] = usePersistentState(
    { price: 0, percentChange: 0, lastUpdated: new Date(0).toISOString() },
    `${tickerSymbol}-price`
  )

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

  return price
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

interface ScreenPosition {
  x: number
  y: number
}

interface Directions extends Object {
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}

type Direction = keyof Directions

export const useScrollDirection = (ref: RefObject<HTMLElement>): Directions => {
  const lastPosition = useRef<ScreenPosition>({ x: 0, y: 0 })
  const [directions, setDirections] = useState<Directions>({
    left: false,
    right: false,
    up: false,
    down: false,
  })
  const { x, y } = useScroll(ref)

  console.log("coords: ", x, y)

  useEffect(() => {
    const toggleDirection = (direction: Direction) =>
      setDirections((prevState) => ({
        ...prevState,
        [direction]: !directions[direction],
      }))
    const container = ref.current

    console.log(ref)

    if (!container) return

    if (x > lastPosition.current?.x) {
      lastPosition.current.x = x
      toggleDirection("right")
    } else if (x < lastPosition.current?.x) {
      lastPosition.current.x = x
      toggleDirection("left")
    }
    if (y > lastPosition.current?.y) {
      lastPosition.current.y = y
      toggleDirection("up")
    } else if (y < lastPosition.current?.y) {
      lastPosition.current.y = y
      toggleDirection("down")
    }
  }, [directions, ref, x, y])

  return directions
}

type AnyEvent = MouseEvent | TouchEvent

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void
) {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const el = ref?.current

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener(`mousedown`, listener)
    document.addEventListener(`touchstart`, listener)

    return () => {
      document.removeEventListener(`mousedown`, listener)
      document.removeEventListener(`touchstart`, listener)
    }

    // Reload only if ref or handler changes
  }, [ref, handler])
}

export function useEventListener<T extends HTMLElement = HTMLDivElement>(
  // eslint-disable-next-line no-undef
  eventName: keyof WindowEventMap,
  handler: (event: Event) => void,
  element?: RefObject<T>
) {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: Event) => void>()

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!savedHandler?.current) {
        savedHandler.current(event)
      }
    }

    targetElement.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, handler])
}

interface Size {
  width: number
  height: number
}

// See: https://usehooks-typescript.com/react-hook/use-element-size
export function useElementSize<T extends HTMLElement = HTMLDivElement>(
  elementRef: RefObject<T>
): Size {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  // Prevent too many rendering using useCallback

  const updateSize = useCallback(() => {
    const node = elementRef?.current

    if (node) {
      setSize({
        width: node.offsetWidth || 0,
        height: node.offsetHeight || 0,
      })
    }
  }, [elementRef])

  // Initial size on mount

  useEffect(() => {
    updateSize()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEventListener("resize", updateSize)

  return size
}

export const useAuth = () => useContext(userContext)

//Ref https://docs.react2025.com/firebase/use-auth
export const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [userGroups, setUserGroups] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (rawUser: firebase.User | null) => {
    console.log("handleUser called", new Date())
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      setUser(user)
      setLoading(false)
      return user
    } else {
      setUser(false)
      setLoading(false)
      return false
    }
  }

  // const signinWithEmail = async (email: string, password: string, redirect: string | UrlObject) => {
  //   setLoading(true)
  //   const response = await auth.signInWithEmailAndPassword(email, password)
  //   handleUser(response.user)
  //   if (redirect) {
  //     Router.push(redirect)
  //   }
  // }

  // const signinWithTwitter = (redirect) => {
  //   setLoading(true)
  //   return auth.signInWithPopup(new TwitterAuthProvider()).then((response) => {
  //     handleUser(response.user)

  //     if (redirect) {
  //       Router.push(redirect)
  //     }
  //   })
  // }

  const signinWithFacebook = async (redirect: string | UrlObject) => {
    setLoading(true)
    const response = await auth.signInWithPopup(new FacebookAuthProvider())
    handleUser(response.user)
    if (redirect) {
      Router.push(redirect)
    }
  }
  const signinWithGoogle = async (redirect: string | UrlObject) => {
    setLoading(true)
    const response = await auth.signInWithPopup(new GoogleAuthProvider())
    handleUser(response.user)
    if (redirect) {
      Router.push(redirect)
    }
  }

  const signout = async (redirect: string | UrlObject = "/") => {
    await auth.signOut()
    const firstname = userFirstName(user)
    toast.dismiss()
    toast(`Bye for now ${firstname}!`, { icon: "👋" })
    handleUser(null)
    Router.push(redirect)
  }

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const getUserData = () => {
      // allows us to turn off the realtime data feed when finished
      const userRef = firestore.collection("users").doc(user.uid)
      const unsubscribe = userRef.onSnapshot((doc) => {
        const userData = doc.data()
        setUsername(userData?.username)
        setUserGroups(userData?.groups)
      })

      return unsubscribe
    }
    if (user) getUserData()
  }, [user])

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (user) {
  //       const token = await firebase
  //         .auth()
  //         .currentUser.getIdToken(/* forceRefresh */ true);
  //       setUser(user);
  //       console.log('refreshed token');
  //     }
  //   }, 30 * 60 * 1000 /*every 30min, assuming token expires every 1hr*/);
  //   return () => clearInterval(interval);
  // }, [user]); // needs to depend on user to have closure on a valid user object in callback fun

  const getFreshToken = async () => {
    console.log("getFreshToken called", new Date())
    const currentUser = auth.currentUser
    if (currentUser) {
      const token = await currentUser.getIdToken(false)
      return `${token}`
    } else {
      return ""
    }
  }

  return {
    user,
    username,
    userGroups,
    loading,
    // signinWithEmail,
    // signinWithGitHub,
    // signinWithTwitter,
    signinWithFacebook,
    signinWithGoogle,
    signout,
    getFreshToken,
  }
}
