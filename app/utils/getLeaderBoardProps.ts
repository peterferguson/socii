import { Leader } from "@components/LeaderBoardCard"
import { getYahooTimeseries } from "./getYahooTimeseries"
import { toDateStr } from "./toDateStr"

// TODO: Separate into multiple sub functions
export const getLeaderBoardProps = async () => {
  // * The leaderboard will be a month to date list of the top groups.
  // * The timescale will be since the  beginning of the month.
  // * On the first of the month, the leaderboard is reset.
  const firestore = require("@lib/firebase/server/firebase-admin").firestore

  const query = firestore
    .collectionGroup("holdings")
    .where("privacyOption", "==", "public")

  const snapshot = await query.get()

  console.log(`${snapshot.size} holdings found`)

  const groupHoldings: {
    [groupName: string]: { holdings: [{ symbol: string; qty: number }] }
  } = snapshot.docs
    .map((doc) => ({
      groupName: doc.ref.path.split("/")[1],
      holdings: doc.data(),
    }))
    .reduce((initial, item) => {
      if (item.groupName in initial)
        initial[item.groupName].holdings.push(item.holdings)
      else initial[item.groupName] = { holdings: [item.holdings] }
      return initial
    }, {})

  console.log(`${Object.keys(groupHoldings)?.length} groups found`)

  const tickers: string[] = [
    ...new Set(
      Object.values(groupHoldings)
        .map(({ holdings }) => [...holdings.map((holding) => holding.symbol)])
        .flat(1)
    ),
  ]

  // - Get the number of market days since the beginning of the month.
  // - get the first day of this month
  const today = new Date()

  const todayString = toDateStr(today.toISOString().slice(0, 10))
  const firstDayOfMonthString = toDateStr(today.toISOString().slice(0, 8) + "01")

  const priceData = await getYahooTimeseries({
    tickers,
    startDateStr: firstDayOfMonthString,
    endDateStr: todayString,
  })

  console.log(`${Object.keys(priceData)?.length} prices found`)

  // - monthly pct change lagging by one day
  // ! latest data is the close of the previous market day
  // ! so if the market is closed the currentPrice will not the last close price but the prev day close price
  const tickerPriceChanges: { [symbol: string]: number } = tickers.reduce(
    (data, ticker) => {
      const prices = priceData?.[ticker]

      const pctChange =
        (100 * (prices[prices?.length - 1].close - prices[0].close)) / prices[0].close

      return Object.assign(data, { [ticker]: pctChange })
    },
    {}
  )

  console.log("stock price changes: ", tickerPriceChanges)

  // TODO: Get best performer from this data for each group!
  // - get the holding breakdown for each group
  const portfolioSplits: {
    [groupName: string]: {
      portfolioValue: number
      portfolioBreakdown: {
        [symbol: string]: { portfolioPct: number; mtdPct: number }
      }[]
      pnlPct: number
    }
  } = Object.entries(groupHoldings).reduce((initial, [groupName, { holdings }]) => {
    const portfolioValue = holdings
      ?.map(({ symbol, qty }) => priceData?.[symbol].slice().pop().close * qty)
      .reduce((a, b) => a + b, 0)

    const portfolioBreakdown = holdings.reduce(
      (initial, { symbol, qty }) =>
        Object.assign(initial, {
          [symbol]: {
            portfolioPct:
              (100 * (priceData?.[symbol].slice().pop().close * qty)) / portfolioValue,
            mtdPct: tickerPriceChanges?.[symbol],
          },
        }),
      {}
    )

    return Object.assign(initial, {
      [groupName]: { portfolioValue, portfolioBreakdown },
    })
  }, {})

  // - Get pnlPct for each group
  for (const [groupName, split] of Object.entries(portfolioSplits)) {
    portfolioSplits[groupName].pnlPct = Object.entries(tickerPriceChanges)
      .map(([ticker, pctChange]) =>
        ticker in split.portfolioBreakdown
          ? 0.01 * pctChange * split.portfolioBreakdown[ticker].portfolioPct
          : 0
      )
      .reduce((a, b) => a + b)
  }

  const leaders: Leader[] = Object.entries(portfolioSplits)
    .map(([groupName, split]) => ({ groupName, ...split }))
    .sort(({ pnlPct: pnlA }, { pnlPct: pnlB }) => pnlB - pnlA)

  return { props: { leaders } }
}
