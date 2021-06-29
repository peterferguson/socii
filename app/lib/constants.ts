import AppleLogo from "@icons/apple.svg"
import FacebookLogo from "@icons/fb.svg"
import GoogleLogo from "@icons/google.svg"
import TwitterLogo from "@icons/twitter.svg"
import { facebookAuthProvider, googleAuthProvider } from "@lib/firebase"
import { ToastOptions, ToastPosition } from "react-hot-toast"
import { FaDollarSign, FaEuroSign, FaPoundSign, FaYenSign } from "react-icons/fa"

export const currencySymbols = {
  AUD: "$",
  CAD: "$",
  CHF: "CHF",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  USD: "$",
}

export type CurrencyCode = "AUD" | "CAD" | "CHF" | "EUR" | "GBP" | "JPY" | "USD"

export const currencyIcons = {
  AUD: { icon: FaDollarSign, text: "$" },
  CAD: { icon: FaDollarSign, text: "$" },
  // CHF: "CHF",
  EUR: { icon: FaEuroSign, text: "€" },
  GBP: { icon: FaPoundSign, text: "£" },
  JPY: { icon: FaYenSign, text: "¥" },
  USD: { icon: FaDollarSign, text: "$" },
}

/*
 * Group Privacy Settings
 */
export const groupPrivacyOptions = [
  {
    name: "Private",
    description: "Activity feed visible to group only",
  },
  {
    name: "Public",
    description: "Activity feed visible to anyone",
  },
]

/*
 * Default Group Deposit Options
 */
export const groupDepositOptions = [
  {
    amount: 0,
  },
  {
    amount: 10,
  },
  {
    amount: 25,
  },
  {
    amount: 50,
  },
  {
    amount: 100,
  },
]

/*
 * Default Group Initial Lump-Sum Options
 */
export const groupLumpSumOptions = [
  {
    amount: 0,
  },
  {
    amount: 25,
  },
  {
    amount: 50,
  },
  {
    amount: 100,
  },
  {
    amount: 250,
  },
]

/*
 * Sign In Options & Logos for Entry Page
 */
export const signInOptions = [
  { logo: GoogleLogo, provider: googleAuthProvider },
  { logo: AppleLogo, provider: null },
  { logo: TwitterLogo, provider: null },
  { logo: FacebookLogo, provider: facebookAuthProvider },
]

export const tailwindColorMap = {
  "bg-teal-200": "#99F6E4",
  "bg-red-200": "#FECACA",
  "bg-brand": "#0fa9e6",
}

/*
 *  camelCased Alpha Vantage Query options
 */
export const alphaVantageQueryOptions = [
  "assetType",
  "name",
  "description",
  "CIK",
  "exchange",
  "currency",
  "country",
  "sector",
  "industry",
  "address",
  "fullTimeEmployees",
  "fiscalYearEnd",
  "latestQuarter",
  "marketCapitalization",
  "EBITDA",
  "pERatio",
  "pEGRatio",
  "bookValue",
  "dividendPerShare",
  "dividendYield",
  "EPS",
  "revenuePerShareTTM",
  "profitMargin",
  "operatingMarginTTM",
  "returnOnAssetsTTM",
  "returnOnEquityTTM",
  "revenueTTM",
  "grossProfitTTM",
  "dilutedEPSTTM",
  "quarterlyEarningsGrowthYOY",
  "quarterlyRevenueGrowthYOY",
  "analystTargetPrice",
  "trailingPE",
  "forwardPE",
  "priceToSalesRatioTTM",
  "priceToBookRatio",
  "eVToRevenue",
  "eVToEBITDA",
  "beta",
  "52WeekHigh",
  "52WeekLow",
  "50DayMovingAverage",
  "200DayMovingAverage",
  "sharesOutstanding",
  "sharesFloat",
  "sharesShort",
  "sharesShortPriorMonth",
  "shortRatio",
  "shortPercentOutstanding",
  "shortPercentFloat",
  "percentInsiders",
  "percentInstitutions",
  "forwardAnnualDividendRate",
  "forwardAnnualDividendYield",
  "payoutRatio",
  "dividendDate",
  "exDividendDate",
  "lastSplitFactor",
  "lastSplitDate",
]

interface ToastProps {
  position: ToastPosition
  reverseOrder: boolean
  toastOptions: ToastOptions
}

export const toastProps: ToastProps = {
  position: "top-center",
  reverseOrder: false,
  toastOptions: {
    style: {
      margin: "40px",
      background: "#363636",
      color: "#fff",
      zIndex: 1,
    },
    duration: 5000,
  },
}
