import { tickerToISIN } from '@lib/firebase'
import IEXQuery, { ChartRangeOption } from '@lib/iex'
import { CurrencyCode } from '@lib/constants'

const alphaVantageApiKey = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY

export const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

export const pctChange = (first: number, second: number): number => {
  return ((first - second) * 100) / second
}

export const pnlBackgroundColor = (pctChange) => {
  return pctChange > 0 ? 'bg-teal-200' : pctChange < 0 ? 'bg-red-200' : 'bg-gray-200'
}

export const pnlTextColor = (pctChange: number): string => {
  return pctChange > 0 ? 'text-teal-200' : pctChange < 0 ? 'text-red-200' : 'text-brand'
}

export const logoUrl = (isin) => {
  if (isin.length <= 4) {
    isin = tickerToISIN(isin)
  }
  return `https://storage.googleapis.com/sociiinvest.appspot.com/logos/${isin}.png`
}

export const handleEnterKeyDown = (event, callback) => {
  if (event.key === 'Enter') {
    callback()
  }
}

export const alphaVantageQuery = async (queryType: string, params: object) => {
  const queryParmsString: string = Object.keys(params)
    .map((key) => `&${key}=${params[key]}`)
    .join('')

  return await fetchJSON(
    `https://www.alphavantage.co/query?function=${queryType}${queryParmsString}&apikey=${alphaVantageApiKey}`
  )
}

export const currencyConversion = async (
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
) => {
  /*
   *   Alpha Vantage Query Return Type
   *   {
   *      "Realtime Currency Exchange Rate": {
   *          "1. From_Currency Code": "USD",
   *          "2. From_Currency Name": "United States Dollar",
   *          "3. To_Currency Code": "JPY",
   *          "4. To_Currency Name": "Japanese Yen",
   *          "5. Exchange Rate": "108.91000000",
   *          "6. Last Refreshed": "2021-05-19 13:34:30",
   *          "7. Time Zone": "UTC",
   *          "8. Bid Price": "108.90800000",
   *          "9. Ask Price": "108.91200000"
   *      }
   *   }
   */
  const data = await alphaVantageQuery('CURRENCY_EXCHANGE_RATE', {
    from_currency: fromCurrency,
    to_currency: toCurrency,
  })

  if ('Realtime Currency Exchange Rate' in data) {
    const exchangeRate = data['Realtime Currency Exchange Rate']['5. Exchange Rate']
    const lastUpdated = data['Realtime Currency Exchange Rate']['6. Last Refreshed']
    return { rate: exchangeRate, lastRefresh: lastUpdated }
  }

  return {}
}

export const alphaVantageData = async (tickerSymbol) => {
  const data = await alphaVantageQuery('TIME_SERIES_DAILY', {
    symbol: tickerSymbol,
  })

  const dates = Object.keys(data['Time Series (Daily)'])

  // * Return close for each date as timeseries
  return dates.map((ts) => ({
    timestamp: ts,
    close: parseFloat(data['Time Series (Daily)'][ts]['4. close']),
    volume: parseFloat(data['Time Series (Daily)'][ts]['5. volume']),
  }))
}

// ! EXPENSIVE
export const iexChartTimeseries = async (
  tickerSymbol: string,
  range: ChartRangeOption = '1mm'
) => {
  const iexClient = new IEXQuery()
  const data = await fetchJSON(iexClient.stockChart(tickerSymbol, range))

  // * Return close for each date as timeseries
  return data.map(({ close, date, volume }) => ({
    close,
    volume,
    timestamp: new Date(date).getTime(),
  }))
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const fetchJSON = async (url) => (await fetch(url)).json()

export const stockProps = async (
  tickerQuery,
  subQueryField = '',
  timeseriesLimit = 30
) => {
  const tickerDocs = await tickerQuery.get()

  let tickerSymbols = []
  let sector = null

  for await (const tickerDoc of tickerDocs.docs) {
    // * Get ticker company data
    let ticker = await tickerDoc.data()

    if ('timestamp' in ticker) {
      ticker['timestamp'] = JSON.stringify(ticker?.timestamp.toDate())
    }

    if ('timeseriesLastUpdated' in ticker) {
      ticker['timeseriesLastUpdated'] = JSON.stringify(
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
    .collection('data')
    .where(queryField, '>', "''")
    .orderBy(queryField, 'asc')
    .limit(1)

  let sector = (await sectorRef.get()).docs[0].data() ?? null

  return { ...sector, lastUpdate: sector?.lastUpdate.toMillis() ?? null }
}

export const tickerTimeseries = async (tickerRef, limit = 30, tickerSymbol) => {
  // * Get timeseries data
  const timeseriesRef = tickerRef
    .collection('timeseries')
    .orderBy('timestamp', 'desc')
    .limit(limit)

  let timeseriesDocs = (await timeseriesRef.get()).docs

  let timeseries

  if (timeseriesDocs.length === 0) {
    // * Get timeseries data from api
    timeseries = await alphaVantageData(tickerSymbol)
    // TODO: This is server-side so update firestore with the timeseries data onCall
  } else {
    timeseries = timeseriesDocs.map((doc) => ({
      ...doc.data(),
      timestamp: parseInt(doc.id) * 1000,
    }))
  }
  // ! EXPENSIVE
  // timeseries = await iexChartTimeseries(tickerSymbol)

  return timeseries
}

export const getRandomImage = (letters = '') => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const baseUrl = 'https://getstream.imgix.net/images/random_svg/'
  const extension = '.png'

  if (!letters) {
    const randomLetter = () => alphabet[Math.floor(Math.random() * 26)].toUpperCase()
    letters = randomLetter() + randomLetter()
  }
  return `${baseUrl}${letters}${extension}`
}

export const getInitials = (slug) => {
  return slug
    ?.split(' ')
    .map((word) => word[0])
    .join('')
}

export const uncamelCase = (str) =>
  str
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([a-z])/g, ' $1$2')
    .replace(/ +/g, ' ')

export const getCleanImage = (member) => {
  if (!member?.user.image) return getRandomImage()
  return member.user.image
}

export const localCostPerShare = async (
  price: string | number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
) => {
  const input = typeof price !== 'number' ? parseFloat(price) : price
  if (isNaN(input)) {
    return {}
  }
  const { rate, lastRefresh } = await currencyConversion(fromCurrency, toCurrency)
  return { costPerShare: rate * input, lastRefresh, exchangeRate: rate }
}

export const currencyFormatter = (number, currency) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(number)

export const round = (num: number, places: number) =>
  Math.round((num + Number.EPSILON) * 10 ** places) / 10 ** places
