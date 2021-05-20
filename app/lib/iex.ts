const token = process.env.NEXT_PUBLIC_IEXCLOUD_PUBLIC_KEY;
const apiversion = process.env.NEXT_PUBLIC_IEXCLOUD_API_VERSION;

export default class IEXQuery {
  private endpointPath: string;
  private sandbox: boolean;

  public constructor(
    sandbox = false,
    endpointPath = `https://${
      sandbox ? "sandbox" : "cloud"
    }.iexapis.com/${apiversion}`
  ) {
    this.endpointPath = endpointPath;
    this.sandbox = this.sandbox;
    this.request = this.request.bind(this); // tslint:disable-line:no-unsafe-any
  }
  /*
   * This function does a straight pass-through request to the IEX api using the
   * path provided. It can be used to do any call to the service, including ones
   * that respond with content-type text/csv or application/json.
   *
   * @example
   *   request('/stock/aapl/price')
   *   request('/stock/aapl/quote?displayPercent=true')
   *
   * @see https://iextrading.com/developer/docs/#getting-started
   *
   * @param path The path to hit the IEX API endpoint at.
   */
  public request(path: string): string {
    return `${this.endpointPath}${path}?token=${token}`;
  }

  /*
   * Gets the full list of stock symbols supported by IEX.
   *
   * @see https://iextrading.com/developer/docs/#symbols
   */
  public symbols(): string {
    return this.request("/ref-data/symbols");
  }

  /*
   * Gets the quote information of a given stock.
   *
   * @see https://iextrading.com/developer/docs/#quote
   * @param stockSymbol The symbol of the stock to fetch data for.
   * @param [field] Option to return from QuoteResponse
   *
   */
  public stockQuote(stockSymbol: string, field: string = ""): string {
    return this.request(`/stock/${stockSymbol}/quote/${field}`);
  }

  /*
   * Gets charting data for a stock in a given range.
   *
   * @see https://iextrading.com/developer/docs/#chart
   * @param stockSymbol The symbol of the stock to fetch data for.
   * @param range The time range to load chart data for.
   */
  public stockChart(stockSymbol: string, range: ChartRangeOption): string {
    return this.request(`/stock/${stockSymbol}/chart/${range}`);
  }

  /*
   * Fetches the price of a given stock.
   *
   * @see https://iextrading.com/developer/docs/#price
   * @param stockSymbol The symbol of the stock to fetch prices for.
   * @return A single number, being the IEX real time price, the 15 minute
   *         delayed market price, or the previous close price, is returned.
   */
  public stockPrice(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/quote/latestPrice`);
  }

  /*
   * Gets previous day adjusted price data for a single stock, or an object
   * keyed by symbol of price data for the whole market.
   *
   * @see https://iextrading.com/developer/docs/#previous
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockPrevious(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/previous`);
  }

  /*
   * Gets information about the company associated with the stock symbol.
   *
   * @see https://iextrading.com/developer/docs/#company
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockCompany(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/company`);
  }

  /*
   * Gets key stats for the given stock symbol.
   *
   * @see https://iextrading.com/developer/docs/#key-stats
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockKeyStats(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/stats`);
  }

  /*
   * Gets a list of peer tickerss for the given symbols.
   *
   * @see https://iextrading.com/developer/docs/#peers
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockPeers(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/peers`);
  }

  /*
   * Similar to the peers endpoint, except this will return most active market
   * symbols when peers are not available. If the symbols returned are not
   * peers, the peers key will be false. This is not intended to represent a
   * definitive or accurate list of peers, and is subject to change at any time.
   *
   * @see https://iextrading.com/developer/docs/#relevant
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockRelevant(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/relevant`);
  }

  /*
   * Gets a list of news articles related to the given stock.
   *
   * @see https://iextrading.com/developer/docs/#news
   *
   * @param stockSymbol The symbol of the stock to fetch news for.
   * @param [range=10] The number of news articles to pull. Defaults to 10 if omitted.
   */
  public stockNews(stockSymbol: string, range?: NewsRange): string {
    if (range) {
      return this.request(`/stock/${stockSymbol}/news/last/${range}`);
    } else {
      return this.request(`/stock/${stockSymbol}/news`);
    }
  }

  /*
   * Gets income statement, balance sheet, and cash flow data from the four most recent
   * reported quarters.
   *
   * @see https://iextrading.com/developer/docs/#financials
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockFinancials(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/financials`);
  }

  /*
   * Gets earnings data from the four most recent reported quarters.
   *
   * @see https://iextrading.com/developer/docs/#earnings
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockEarnings(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/earnings`);
  }

  /*
   * Gets divdends paid by the company over the given range.
   *
   * @see https://iextrading.com/developer/docs/#dividends
   * @param stockSymbol The symbol of the stock to fetch data for.
   * @param range The date range to get dividends from.
   */
  public stockDividends(stockSymbol: string, range: DividendRange): string {
    return this.request(`/stock/${stockSymbol}/dividends/${range}`);
  }

  /*
   * Gets stock splits of the company over the given range.
   *
   * @see https://iextrading.com/developer/docs/#splits
   * @param stockSymbol The symbol of the stock to fetch data for.
   * @param range The date range to get splits from.
   */
  public stockSplits(stockSymbol: string, range: SplitRange): string {
    return this.request(`/stock/${stockSymbol}/splits/${range}`);
  }

  /*
   * Gets an object containing a URL to the company's logo.
   *
   * @see https://iextrading.com/developer/docs/#logo
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockLogo(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/logo`);
  }

  /*
   * Get a list of quotes for the top 10 symbols in a specified list.
   *
   * @see https://iextrading.com/developer/docs/#list
   * @param list The market list to fetch quotes from.
   * @param [displayPercent=false] If set to true, all percentage values will be
   *                               multiplied by a factor of 100.
   */
  public stockMarketListTopTen(
    list: MarketList,
    displayPercent?: boolean
  ): string {
    const queryString = displayPercent ? "?displayPercent=true" : "";
    return this.request(`/stock/market/list/${list}${queryString}`);
  }

  /*
   * Gets an array of effective spread, eligible volume, and price improvement
   * of a stock, by market. Unlike volume-by-venue, this will only return a
   * venue if effective spread is not ‘N/A’. Values are sorted in descending
   * order by effectiveSpread. Lower effectiveSpread and higher priceImprovement
   * values are generally considered optimal.
   *
   * @see https://iextrading.com/developer/docs/#effective-spread
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockEffectiveSpread(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/effective-spread`);
  }

  /*
   * Gets 15 minute delayed and 30 day average consolidated volume percentage of
   * a stock, by market. This call will always return 13 values, and will be
   * sorted in ascending order by current day trading volume percentage.
   *
   * @see https://iextrading.com/developer/docs/#volume-by-venue
   * @param stockSymbol The symbol of the stock to fetch data for.
   */
  public stockVolumeByVenue(stockSymbol: string): string {
    return this.request(`/stock/${stockSymbol}/volume-by-venue`);
  }
}

/*
 * Interface definitions of the response types
 */

interface StockSymbol {
  date: string;
  iexId: string;
  isEnabled: boolean;
  name: string;
  symbol: string;
  type: "cs" | "et" | "ps" | "bo" | "su" | "N/A" | string;
}

interface QuoteResponse {
  symbol: string;
  companyName: string;
  primaryExchange: string;
  sector: string;
  calculationPrice: "tops" | "sip" | "previousClose" | "close";
  open: number;
  openTime: number;
  close: number;
  closeTime: number;
  latestPrice: number;
  latestSource:
    | "IEX real time price"
    | "15 minute delayed price"
    | "Close"
    | "Previous close";
  latestTime: string;
  latestUpdate: number;
  latestVolume: number;
  iexRealtimePrice: number;
  iexRealtimeSize: number;
  iexLastUpdated: number;
  delayedPrice: number;
  delayedPriceTime: number;
  previousClose: number;
  change: number;
  changePercent: number;
  iexMarketPercent: number;
  iexVolume: number;
  avgTotalVolume: number;
  iexBidPrice: number;
  iexBidSize: number;
  iexAskPrice: number;
  iexAskSize: number;
  marketCap: number;
  peRatio: number | null;
  week52High: number;
  week52Low: number;
  ytdChange: number;
}

/*
 * Unfortunately, pattern based type definitions aren't supported in TypeScript.
 * There's no way to express 'date/<YYYYMMDD>' as a type outside of a generic
 * catch-all string.
 */
export type ChartRangeOption =
  | "5y"
  | "2y"
  | "1y"
  | "ytd"
  | "6m"
  | "3m"
  | "1m"
  | "1d"
  | "dynamic"
  | string;

interface ChartItem {
  high: number;
  low: number;
  volume: number;
  label: number;
  changeOverTime: number;
}

interface OneDayChartItem extends ChartItem {
  minute: string;
  average: number;
  notional: number;
  numberOfTrades: number;
}

interface MultiDayChartItem extends ChartItem {
  date: string;
  open: number;
  close: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

type ChartResponse = OneDayChartItem[] | MultiDayChartItem[];

interface OpenCloseResponse {
  open: {
    price: number;
    time: number;
  };
  close: {
    price: number;
    time: number;
  };
}

/*
 * Refers to the common issue type of the stock.
 *
 * ad – American Depository Receipt (ADR’s)
 * re – Real Estate Investment Trust (REIT’s)
 * ce – Closed end fund (Stock and Bond Fund)
 * si – Secondary Issue
 * lp – Limited Partnerships
 * cs – Common Stock
 * et – Exchange Traded Fund (ETF)
 * (blank) = Not Available, i.e., Warrant, Note, or (non-filing) Closed Ended Funds
 */
type IssueType = "ad" | "re" | "ce" | "si" | "lp" | "cs" | "et" | "";

interface CompanyResponse {
  symbol: string;
  companyName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  CEO: string;
  issueType: IssueType;
  sector: string;
  tags: string[];
}

interface RelevantResponse {
  peers: boolean;
  symbols: string[];
}

interface Financial {
  reportDate: string | null;
  grossProfit: number | null;
  costOfRevenue: number | null;
  operatingRevenue: number | null;
  totalRevenue: number | null;
  operatingIncome: number | null;
  netIncome: number | null;
  researchAndDevelopment: number | null;
  operatingExpense: number | null;
  currentAssets: number | null;
  totalAssets: number | null;
  totalLiabilities: number | null;
  currentCash: number | null;
  currentDebt: number | null;
  totalCash: number | null;
  totalDebt: number | null;
  shareholderEquity: number | null;
  cashChange: number | null;
  cashFlow: number | null;
  operatingGainsLosses: number | null;
}

interface FinancialsResponse {
  symbol: string;
  financials: Financial[];
}

interface News {
  datetime: string;
  headline: string;
  source: string;
  url: string;
  summary: string;
  related: string;
}

type NewsRange =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50;

type SplitRange = "5y" | "2y" | "1y" | "ytd" | "6m" | "3m" | "1m";

interface Split {
  exDate: string;
  declaredDate: string;
  recordDate: string;
  paymentDate: string;
  ratio: number;
  toFactor: number; // TODO: API docs say string, but this looks to actually be a number
  forFactor: number; // TODO: API docs say string, but this looks to actually be a number
}

interface LogoResponse {
  url: string;
}

interface KeyStatsResponse {
  companyName: string;
  marketCap: number;
  beta: number;
  week52high: number;
  week52low: number;
  week52change: number;
  shortInterest: number;
  shortDate: string;
  dividendRate: number;
  dividendYield: number;
  exDividendDate: string;
  latestEPS: number;
  latestEPSDate: string;
  sharesOutstanding: number;
  float: number;
  returnOnEquity: number;
  consensusEPS: number;
  numberOfEstimates: number;
  symbol: string;
  EBITDA: number;
  revenue: number;
  grossProfit: number;
  cash: number;
  debt: number;
  ttmEPS: number;
  revenuePerShare: number;
  revenuePerEmployee: number;
  peRatioHigh: number;
  peRatioLow: number;
  EPSSurpriseDollar: number;
  EPSSurprisePercent: number;
  returnOnAssets: number;
  returnOnCapital: number;
  profitMargin: number;
  priceToSales: number;
  priceToBook: number;
  day200MovingAvg: number;
  day50MovingAvg: number;
  institutionPercent: number;
  insiderPercent: number;
  shortRatio: number;
  year5ChangePercent: number;
  year2ChangePercent: number;
  year1ChangePercent: number;
  ytdChangePercent: number;
  month6ChangePercent: number;
  month3ChangePercent: number;
  month1ChangePercent: number;
  day5ChangePercent: number;
}

interface Previous {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

interface PreviousMarket {
  [symbol: string]: Previous;
}

type PreviousResponse = Previous | PreviousMarket;

interface Earning {
  actualEPS: number;
  consensusEPS: number;
  estimatedEPS: number;
  announceTime: string; // TODO: API docs don't mention this, but this can probably be an enum
  numberOfEstimates: number;
  EPSSurpriseDollar: number;
  EPSReportDate: string;
  fiscalPeriod: string;
  fiscalEndDate: string;
}

interface EarningsResponse {
  symbol: string;
  earnings: Earning[];
}

type DividendRange = "5y" | "2y" | "1y" | "ytd" | "6m" | "3m" | "1m";

interface Dividend {
  exDate: string;
  paymentDate: string;
  recordDate: string;
  declaredDate: string;
  amount: number;
  flag: string; // TODO: API docs don't mention this, but this can probably be an enum
  type:
    | "Dividend income"
    | "Interest income"
    | "Stock dividend"
    | "Short term capital gain"
    | "Medium term capital gain"
    | "Long term capital gain"
    | "Unspecified term capital gain";
  qualified: "P" | "Q" | "N" | "" | null; // TODO: API Docs say null here, but we need to confirm if that ever happens
  indicated: string; // TODO: API docs don't mention this, but this can probably be an enum
}

interface DelayedQuoteResponse {
  symbol: string;
  delayedPrice: number;
  high: number;
  low: number;
  delayedSize: number;
  delayedPriceTime: number;
  processedTime: number;
}

type MarketList =
  | "mostactive"
  | "gainers"
  | "losers"
  | "iexvolume"
  | "iexpercent";

interface EffectiveSpread {
  volume: number; // TODO: API docs say this is a string, but it looks like it's a number
  venue: string;
  venueName: string;
  effectiveSpread: number;
  effectiveQuoted: number;
  priceImprovement: number;
}

interface VolumeByVenue {
  volume: number;
  venue: string;
  venueName: string;
  date: string | null;
  marketPercent: number;
  avgMarketPercent: number;
}
