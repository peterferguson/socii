import { tickerToISIN, firestore } from "@lib/firebase"
import { CurrencyCode } from "@lib/constants"

const alphaVantageApiKey = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY

export const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined"

export const pctChange = (first: number, second: number): number => {
  return ((first - second) * 100) / second
}

export const pnlBackgroundColor = (pctChange) => {
  return pctChange > 0 ? "bg-teal-200" : pctChange < 0 ? "bg-red-200" : "bg-gray-200"
}

export const pnlTextColor = (pctChange: number): string => {
  return pctChange > 0 ? "text-teal-200" : pctChange < 0 ? "text-red-200" : "text-brand"
}

export const logoUrl = (isin) => {
  const baseUrl = (endpoint) =>
    `https://storage.googleapis.com/sociiinvest.appspot.com/logos/${endpoint}.png`
  if (isin.length <= 4) {
    const url = tickerToISIN(isin).then((r) => baseUrl(r))
    return url
  }
  return baseUrl(isin)
}

export const handleEnterKeyDown = (event, callback) => {
  if (event.key === "Enter") {
    callback()
  }
}

export const alphaVantageQuery = (queryType: string, params: object) => {
  const queryParmsString: string = Object.keys(params)
    .map((key) => `&${key}=${params[key]}`)
    .join("")

  return `https://www.alphavantage.co/query?function=${queryType}${queryParmsString}&apikey=${alphaVantageApiKey}`
}

export const currencyConversion = (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
) => `/api/av/currencyConversion?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`

export const alphaVantageTimeseries = async (tickerSymbol: string) => {
  const data = await fetchJSON(
    alphaVantageQuery("TIME_SERIES_DAILY", {
      symbol: tickerSymbol,
    })
  )

  const dates = Object.keys(data["Time Series (Daily)"])

  // * Return close for each date as timeseries
  return dates.map((ts) => ({
    timestamp: ts,
    close: parseFloat(data["Time Series (Daily)"][ts]["4. close"]),
    volume: parseFloat(data["Time Series (Daily)"][ts]["5. volume"]),
  }))
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const fetchJSON = async (url) => (await fetch(url)).json()

export const fetcher = (url) => fetch(url).then((r) => r.json())

export const stockProps = async (
  tickerQuery,
  subQueryField = "",
  timeseriesLimit = 30
) => {
  const tickerDocs = await tickerQuery.get()

  let tickerSymbols = []
  let sector = null

  for await (const tickerDoc of tickerDocs.docs) {
    // * Get ticker company data
    let ticker = await tickerDoc.data()

    if ("timestamp" in ticker) {
      ticker["timestamp"] = JSON.stringify(ticker?.timestamp.toDate())
    }

    if ("timeseriesLastUpdated" in ticker) {
      ticker["timeseriesLastUpdated"] = JSON.stringify(
        ticker?.timeseriesLastUpdated.toDate()
      )
    }

    const timeseries = await tickerTimeseries(
      tickerDoc.ref,
      timeseriesLimit,
      ticker.tickerSymbol
    )

    if (subQueryField) {
      sector = await tickerExistsSubquery(tickerDoc.ref, subQueryField)
    }

    tickerSymbols.push({ ticker, timeseries, sector })
  }

  return {
    props: {
      tickerSymbols,
    },
  }
}

export const tickerExistsSubquery = async (tickerRef, queryField) => {
  // * Get sector & industry data
  const sectorRef = tickerRef
    .collection("data")
    .where(queryField, ">", "''")
    .orderBy(queryField, "asc")
    .limit(1)

  let sector = (await sectorRef.get()).docs?.[0].data() ?? null

  return { ...sector, lastUpdate: sector?.lastUpdate.toMillis() ?? null }
}

export const tickerTimeseries = async (tickerRef, limit = 30, tickerSymbol) => {
  // * Get timeseries data
  const timeseriesRef = tickerRef
    .collection("timeseries")
    .orderBy("timestamp", "desc")
    .limit(limit)

  let timeseriesDocs = (await timeseriesRef.get()).docs

  let timeseries

  if (timeseriesDocs.length === 0) {
    // * Get timeseries data from api
    timeseries = await alphaVantageTimeseries(tickerSymbol)
    // TODO: This is server-side so update firestore with the timeseries data onCall
  } else {
    timeseries = timeseriesDocs.map((doc) => ({
      ...doc.data(),
      timestamp: parseInt(doc.id) * 1000,
    }))
  }

  return timeseries
}

export const getRandomImage = (letters = "") => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const baseUrl = "https://getstream.imgix.net/images/random_svg/"
  const extension = ".png"

  if (!letters) {
    const randomLetter = () => alphabet[Math.floor(Math.random() * 26)].toUpperCase()
    letters = randomLetter() + randomLetter()
  }
  return `${baseUrl}${letters}${extension}`
}

export const getInitials = (slug) => {
  return slug
    ?.split(" ")
    .map((word) => word?.[0])
    .join("")
}

export const uncamelCase = (str) =>
  str
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([a-z])/g, " $1$2")
    .replace(/ +/g, " ")

export const getCleanImage = (member) => {
  if (!member?.user.image) return getRandomImage()
  return member.user.image
}

// export const localCostPerShare = async (
//   price: string | number,
//   fromCurrency: CurrencyCode,
//   toCurrency: CurrencyCode
// ) => {
//   const input = typeof price !== "number" ? parseFloat(price) : price
//   if (isNaN(input)) {
//     return {}
//   }
//   const { rate, lastRefresh } = await currencyConversion(fromCurrency, toCurrency)
//   return {
//     costPerShare: parseFloat(rate) * input,
//     lastRefresh,
//     exchangeRate: parseFloat(rate),
//   }
// }

export const currencyFormatter = (number: number, currency: string = "GBP"): string =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(number || 0)

export const round = (num: number, places: number) =>
  Math.round((num + Number.EPSILON) * 10 ** places) / 10 ** places

export const getTimeStamp = (channel) => {
  let lastHours = channel.state.last_message_at?.getHours()
  let lastMinutes = channel.state.last_message_at?.getMinutes()
  let half = "AM"

  if (lastHours === undefined || lastMinutes === undefined) {
    return ""
  }

  if (lastHours > 12) {
    lastHours = lastHours - 12
    half = "PM"
  }

  if (lastHours === 0) lastHours = 12
  if (lastHours === 12) half = "PM"

  if (lastMinutes.toString().length === 1) {
    lastMinutes = `0${lastMinutes}`
  }

  return `${lastHours}:${lastMinutes} ${half}`
}

export function singleLineTemplateString(strings, ...values) {
  // Interweave the strings with the
  // substitution vars first.
  let output = ""
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i]
  }
  output += strings[values.length]

  // Split on newlines.
  let lines = output.split(/(?:\r\n|\n|\r)/)

  // Rip out the leading whitespace.
  return lines
    .map((line) => {
      return line.replace(/^\s+/gm, "")
    })
    .join(" ")
    .trim()
}

export const isEmpty = (obj) => {
  for (let key in obj) return false
  return true
}

export const getTickerData = async (tickerSymbol) => {
  // - set the rate for the currency pair in local storage
  const tickerQuery = firestore
    .collectionGroup("data")
    .where("symbol", "==", tickerSymbol)
    .limit(1)
  // const [snapshot, loading, error] = useCollectionOnce(query, options);
  const tickerDoc = (await tickerQuery.get()).docs?.[0]
  const ISIN = tickerDoc.ref.path.split("/")[1]
  return { ...tickerDoc.data(), ISIN }
}

/**
 * Determine whether the given `promise` is a Promise.
 *
 * @param {*} promise
 *
 * @returns {Boolean}
 */
export function isPromise(promise): boolean {
  return !!promise && typeof promise.then === "function"
}

export const iexQuote = async (tickerSymbol: string, filter: string) => {
  return await fetcher(`/api/iex/quote/${tickerSymbol}?filter=${filter}`)
}
