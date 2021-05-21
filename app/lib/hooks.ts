import { auth, firestore, functions } from '@lib/firebase'

import { useState, useEffect, useLayoutEffect, useRef, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useMediaQuery } from 'react-responsive'
import { StreamChat } from 'stream-chat'

import { currencyConversion, fetchJSON, localCostPerShare } from '@utils/helper'
import { CurrencyCode } from '@lib/constants'
import IEXQuery from '@lib/iex'
import { useAsync } from 'react-async-hook'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const iexClient = new IEXQuery()

export function useUserData() {
  const [user] = useAuthState(auth)

  const [username, setUsername] = useState('')
  const [userGroups, setUserGroups] = useState([])
  const [userStreamToken, setUserStreamToken] = useState('')

  const streamClient = StreamChat.getInstance(apiKey)

  let streamData

  // TODO: This happens every so often which is causing extra reads for the groups &
  // TODO: replication is stopped by the set but it is still unnessecary reads!

  // ! THIS NEEDS REFACTORED! DANS SUGGESTED DEPENDCY LIST CAUSES INFINITE LOOPS IN
  // ! CHAT APP PROBABLY DUE TO USE OF STREAM TOKEN DEFINITION HERE. NEED TO CREATE
  // ! `useStream` HOOK

  const getUsername = () => {
    // allows us to turn off the realtime data feed when finished
    let unsubscribe

    const userRef = firestore.collection('users').doc(user.uid)
    unsubscribe = userRef.onSnapshot((doc) => {
      const userData = doc.data()
      setUsername(userData?.username)
      setUserGroups([...new Set([...userGroups, ...userData?.groups])])
    })

    return unsubscribe
  }

  const getStreamToken = async () => {
    const tokenRef = firestore.collection(`users/${user.uid}/stream`).doc(user.uid)
    const snapshot = await tokenRef.get()
    if (snapshot.exists) {
      streamData = await snapshot.data()
    } else {
      functions.httpsCallable('generateToken')({ username })
      streamData = await snapshot.data()
    }
    setUserStreamToken(streamData?.token)
  }

  useEffect(() => {
    if (user) {
      getUsername()
      getStreamToken()
    }
  }, [user])

  useEffect(() => {
    const connectStreamUser = async () => {
      await streamClient.connectUser(
        { id: username, name: user?.displayName },
        userStreamToken
      )
    }

    if (user && username && userStreamToken) {
      connectStreamUser()
    }
  }, [user, username, userStreamToken, streamClient])

  return { user, username, userGroups, streamClient }
}

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

export const useScreenType = () => {
  const is3Cols = useMediaQuery({ minWidth: 1336 })
  const is2Cols = useMediaQuery({ minWidth: 1265 })
  const is1Cols = useMediaQuery({ minWidth: 800 })

  if (is3Cols) {
    return '3-cols'
  }
  if (is2Cols) {
    return '2-cols'
  }
  if (is1Cols) {
    return '1-cols'
  }

  return 'fullscreen'
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0%',
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

function TickerPriceDataReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PRICE': {
      return {
        ...state,
        price: action.price,
        priceChange: action.priceChange,
        priceLastUpdated: action.priceLastUpdated,
      }
    }
    case 'UPDATE_TICKER': {
      return {
        ...state,
        ticker: action.ticker,
      }
    }
    case 'UPDATE_COST_PER_SHARE': {
      return {
        ...state,
        costPerShare: action.costPerShare,
      }
    }
    case 'UPDATE_ASSET_CURRENCY': {
      return {
        ...state,
        assetCurrency: action.assetCurrency,
      }
    }
    default:
      return new Error(`Unhandled action type in reducer ${action.type}`)
  }
}

// - Assumes initial state has tickerSymbol
// TODO typing
// TODO Add update dispatches to call updates to the values?
export function useTickerPriceData({ tickerSymbol }) {
  const [state, dispatch] = useReducer(TickerPriceDataReducer, {
    assetCurrency: 'USD',
    price: 0.0,
    priceChange: 0.0,
    priceLastUpdated: '',
    ticker: null,
  })
  // TODO: REFACTOR ONLY TICKER DATA & CREATE EXCHANGE RATE HOOK

  useEffect(() => {
    let stockPrice
    let changePct

    const callIEX = async () => {
      stockPrice = await fetchJSON(iexClient.stockPrice(tickerSymbol))
      changePct = await fetchJSON(iexClient.stockQuote(tickerSymbol, 'changePercent'))

      dispatch({
        type: 'UPDATE_PRICE',
        price: stockPrice,
        priceChange: changePct,
        priceLastUpdated: new Date().toLocaleString(),
      })
    }

    const getTickerData = async () => {
      // WARN: Getting currency from the collection group instead of the top level causes
      // WARN: alot more data than necessary to be passed ...
      // TODO: Move it into the ticker collection
      const tickerQuery = firestore
        .collectionGroup('data')
        .where('symbol', '==', tickerSymbol)
        .limit(1)
      const ticker = await (await tickerQuery.get()).docs[0].data()
      dispatch({ type: 'UPDATE_TICKER', ticker })
      dispatch({
        type: 'UPDATE_ASSET_CURRENCY',
        assetCurrency: ticker.currency,
      })
    }

    callIEX()
    getTickerData()
  }, [tickerSymbol])

  return state
}

export const useShareCost = (costPerShare) => {
  const [cost, setCost] = useState(costPerShare)

  const toShares = (cost) => cost / costPerShare
  const toCost = (shares) => costPerShare * shares

  const onShareChange = (e) => {
    console.log(`share value: ${e.target.value}`)
    setCost(toCost(Number(e.target.value)))
  }

  const onCostChange = (e) => {
    console.log(`cost value: ${e.target.value}`)
    setCost(e.target.value)
  }

  return [cost, onCostChange, onShareChange, toShares]
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

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
  const rateRef = useRef(null)
  const setConversion = async () => {
    rateRef.current = await currencyConversion(fromCurrency, toCurrency)
  }
  useEffect(() => {
    if (!rateRef.current) {
      setConversion()
    }
  }, [fromCurrency])

  // Add this for polling the exhange rate
  // useInterval(() => setConversion(), 60 * 1000)

  return rateRef.current
}

export const usePersistentState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const persistentValue = window.localStorage.getItem(key)
    return persistentValue !== null ? JSON.parse(persistentValue) : defaultValue
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

export const useLocalCurrency = () => {
  return usePersistentState('GBP', 'localCurrency')
}
