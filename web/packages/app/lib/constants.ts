import { ToastOptions, ToastPosition } from "react-hot-toast"

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
  { amount: 0 },
  { amount: 10 },
  { amount: 25 },
  { amount: 50 },
  { amount: 100 },
]

/*
 * Default Group Initial Lump-Sum Options
 */
export const groupLumpSumOptions = [
  { amount: 0 },
  { amount: 25 },
  { amount: 50 },
  { amount: 100 },
  { amount: 250 },
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
  { label: "assetType", value: "assetType" },
  { label: "name", value: "name" },
  { label: "description", value: "description" },
  { label: "CIK", value: "CIK" },
  { label: "exchange", value: "exchange" },
  { label: "currency", value: "currency" },
  { label: "country", value: "country" },
  { label: "sector", value: "sector" },
  { label: "industry", value: "industry" },
  { label: "address", value: "address" },
  { label: "fullTimeEmployees", value: "fullTimeEmployees" },
  { label: "fiscalYearEnd", value: "fiscalYearEnd" },
  { label: "latestQuarter", value: "latestQuarter" },
  { label: "marketCapitalization", value: "marketCapitalization" },
  { label: "EBITDA", value: "EBITDA" },
  { label: "pERatio", value: "pERatio" },
  { label: "pEGRatio", value: "pEGRatio" },
  { label: "bookValue", value: "bookValue" },
  { label: "dividendPerShare", value: "dividendPerShare" },
  { label: "dividendYield", value: "dividendYield" },
  { label: "EPS", value: "EPS" },
  { label: "revenuePerShareTTM", value: "revenuePerShareTTM" },
  { label: "profitMargin", value: "profitMargin" },
  { label: "operatingMarginTTM", value: "operatingMarginTTM" },
  { label: "returnOnAssetsTTM", value: "returnOnAssetsTTM" },
  { label: "returnOnEquityTTM", value: "returnOnEquityTTM" },
  { label: "revenueTTM", value: "revenueTTM" },
  { label: "grossProfitTTM", value: "grossProfitTTM" },
  { label: "dilutedEPSTTM", value: "dilutedEPSTTM" },
  { label: "quarterlyEarningsGrowthYOY", value: "quarterlyEarningsGrowthYOY" },
  { label: "quarterlyRevenueGrowthYOY", value: "quarterlyRevenueGrowthYOY" },
  { label: "analystTargetPrice", value: "analystTargetPrice" },
  { label: "trailingPE", value: "trailingPE" },
  { label: "forwardPE", value: "forwardPE" },
  { label: "priceToSalesRatioTTM", value: "priceToSalesRatioTTM" },
  { label: "priceToBookRatio", value: "priceToBookRatio" },
  { label: "eVToRevenue", value: "eVToRevenue" },
  { label: "eVToEBITDA", value: "eVToEBITDA" },
  { label: "beta", value: "beta" },
  { label: "52WeekHigh", value: "52WeekHigh" },
  { label: "52WeekLow", value: "52WeekLow" },
  { label: "50DayMovingAverage", value: "50DayMovingAverage" },
  { label: "200DayMovingAverage", value: "200DayMovingAverage" },
  { label: "sharesOutstanding", value: "sharesOutstanding" },
  { label: "sharesFloat", value: "sharesFloat" },
  { label: "sharesShort", value: "sharesShort" },
  { label: "sharesShortPriorMonth", value: "sharesShortPriorMonth" },
  { label: "shortRatio", value: "shortRatio" },
  { label: "shortPercentOutstanding", value: "shortPercentOutstanding" },
  { label: "shortPercentFloat", value: "shortPercentFloat" },
  { label: "percentInsiders", value: "percentInsiders" },
  { label: "percentInstitutions", value: "percentInstitutions" },
  { label: "forwardAnnualDividendRate", value: "forwardAnnualDividendRate" },
  { label: "forwardAnnualDividendYield", value: "forwardAnnualDividendYield" },
  { label: "payoutRatio", value: "payoutRatio" },
  { label: "dividendDate", value: "dividendDate" },
  { label: "exDividendDate", value: "exDividendDate" },
  { label: "lastSplitFactor", value: "lastSplitFactor" },
  { label: "lastSplitDate", value: "lastSplitDate" },
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

export const logoBaseUrl: string = `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/logos`

export const ephemeralStatuses = ["complete", "cancelled"]

export const alpacaFailedStatuses = ["cancelled", "expired", "rejected", "suspended"]

export const alpacaPendingStatuses = [
  "new",
  "done_for_day",
  "pending_cancel",
  "pending_replace",
  "pending_new",
  "accepted_for_bidding",
  "stopped",
  "calculated",
  "accepted",
  "replaced",
]

export const alpacaSuccessStatuses = ["filled", "partially_filled"]
