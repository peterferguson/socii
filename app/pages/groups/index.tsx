import React from "react"
import { Leader, LeaderBoardCard } from "@components/LeaderBoardCard"

export default function GroupsHome({ leaders }) {
  return (
    <main className="w-full h-screen">
      <section>
        <div className="max-w-4xl mx-4 mt-20 lg:mx-auto space-y-4">
          <h1 className="mb-8 text-3xl font-bold tracking-wide uppercase font-primary">
            Leaderboard
          </h1>
          <span className="text-sm font-primary">
            The leaderboard is a list of the top performing groups on socii.
            <br />
            <br />
            <p>How does your group compare against other sociians?</p>
            <br />
            <br />
          </span>

          {leaders.map((leader, rank) => (
            <LeaderBoardCard key={`leader-row-${rank}`} rank={rank} leader={leader} />
          ))}
        <p className="mt-8 font-primary text-tiny">
          All gains shown reflect the month to date performane of each group. Only
          public groups are displayed
        </p>
        </div>
      </section>
    </main>
  )
}

export async function getStaticProps() {
  const getLeaderBoardProps = async () => {
    // * The leaderboard will be a lagging month to date list of the top 10 groups.
    // * Lagging by a single day.
    // * The leaderboard will be updated every day.
    // * The timescale will be since the  beginning of the month.
    // * On the first of the month, the leaderboard is reset.

    const firestore = require("@lib/firebase/server/firebase-admin").firestore
    const functionUrl =
      "https://europe-west2-sociiinvest.cloudfunctions.net/get_historical_prices"

    const query = firestore.collectionGroup("holdings")

    const snapshot = await query.get()

    const groupHoldings: {
      [groupName: string]: { holdings: [{ tickerSymbol: string; qty: number }] }
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

    const tickers: string[] = [
      ...new Set(
        Object.values(groupHoldings)
          .map(({ holdings }) => [...holdings.map((holding) => holding.tickerSymbol)])
          .flat(1)
      ),
    ]

    // - Get the number of market days since the beginning of the month.
    // - get the first day of this month
    const today = new Date()

    const todayString = today.toISOString().slice(0, 10)
    const firstDayString = todayString.slice(0, 8) + "01"

    const yahooData = await (
      await fetch(functionUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tickerSymbol: tickers.join(" "),
          start: firstDayString,
          end: todayString,
        }),
      })
    ).json()

    const priceData = yahooData.reduce((data, tick) => {
      const { symbol, close, timestamp } = tick
      if (symbol in data) data[symbol].push({ close, timestamp: new Date(timestamp) })
      else
        Object.assign(data, { [symbol]: [{ close, timestamp: new Date(timestamp) }] })
      return data
    }, {})

    // - monthly pct change lagging by one day
    // ! latest data is the close of the previous market day
    // ! so if the market is closed the currentPrice will not the last close price but the prev day close price
    const tickerPriceChanges: { [tickerSymbol: string]: number } = tickers.reduce(
      (data, ticker) => {
        const prices = priceData[ticker]

        const pctChange =
          (100 * (prices[prices.length - 1].close - prices[0].close)) / prices[0].close

        return Object.assign(data, { [ticker]: pctChange })
      },
      {}
    )
    // TODO: Get best performer from this data for each group!

    // - get the holding breakdown for each group
    const portfolioSplits: {
      [groupName: string]: {
        portfolioValue: number
        portfolioBreakdown: { [tickerSymbol: string]: number }[]
        "%pnl": number
      }
    } = Object.entries(groupHoldings).reduce((initial, [groupName, { holdings }]) => {
      const portfolioValue = holdings
        ?.map(
          ({ tickerSymbol, qty }) => priceData?.[tickerSymbol].slice().pop().close * qty
        )
        .reduce((a, b) => a + b, 0)

      const portfolioBreakdown = holdings.reduce(
        (initial, { tickerSymbol, qty }) =>
          Object.assign(initial, {
            [tickerSymbol]:
              (100 * (priceData?.[tickerSymbol].slice().pop().close * qty)) /
              portfolioValue,
          }),
        {}
      )
      return Object.assign(initial, {
        [groupName]: { portfolioValue, portfolioBreakdown },
      })
    }, {})

    // - Get %pnl for each group
    for (const [groupName, split] of Object.entries(portfolioSplits)) {
      portfolioSplits[groupName]["%pnl"] = Object.entries(tickerPriceChanges)
        .map(([ticker, pctChange]) =>
          ticker in split.portfolioBreakdown
            ? 0.01 * pctChange * split.portfolioBreakdown[ticker]
            : 0
        )
        .reduce((a, b) => a + b)
    }

    const leaders: Leader[] = Object.entries(portfolioSplits)
      .map(([groupName, split]) => ({ groupName, ...split }))
      .sort((a, b) => b[Object.keys(b)[0]]["%pnl"] - a[Object.keys(a)[0]]["%pnl"])

    return { props: { leaders } }
  }
  return await getLeaderBoardProps()
}
