import React from "react"
import { LeaderBoardCard } from "@components/LeaderBoardCard"

export default function GroupsHome({ leaders }) {
  return (
    <main className="w-full h-screen">
      <section>
        <div className="max-w-4xl mx-4 mt-20 lg:mx-auto space-y-4">
          <h1 className="mb-8 font-bold tracking-wide uppercase">Leaderboard</h1>
          {[1, 2, 3].map((rank) => (
            <LeaderBoardCard key={`leader-row-${rank}`} rank={rank} />
          ))}
        </div>
      </section>
    </main>
  )
}

// const rp = require('request-promise');

// let getData = function(stockTicker) {
// return(rp('https://www.styvio.com/api/' + stockTicker))
// .then(body =>
// console.log((JSON.parse(body))["ticker"] + " - " + (Object.keys(JSON.parse(body))))
// )
// };

// getData("AAPL")

export async function getStaticProps() {
  const getLeaderBoardProps = async () => {
    // * The leaderboard will be a lagging month to date list of the top 10 groups.
    // * Lagging by a single day.
    // * The leaderboard will be updated every day.
    // * The timescale will be since the  beginning of the month.
    // * On the first of the month, the leaderboard is reset.

    const CalendarApi = require("@alpaca/index").CalendarApi
    const alpacaConfig = require("@alpaca/index").config
    const firestore = require("@lib/firebase/server/firebase-admin").firestore
    const functionUrl =
      "https://europe-west2-sociiinvest.cloudfunctions.net/get_historical_prices"

    const query = firestore.collectionGroup("holdings")

    const snapshot = await query.get()

    const groupHoldings: { groupName: string; holdings: { tickerSymbol: string } }[] =
      snapshot.docs.map((doc) => ({
        groupName: doc.ref.path.split("/")[1],
        holdings: doc.data(),
      }))

    const tickers: string[] = [
      ...new Set(groupHoldings.map((group) => group.holdings.tickerSymbol)),
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
      console.log(data)

      return data
    }, {})

    // - monthly pct change lagging by one day
    // ! latest data is the close of the previous market day
    // ! so if the market is closed the currentPrice will not the last close price but the prev day close price
    // const tickerPriceChanges = tickers.reduce((data, ticker) => {
    //   const prices = priceData[ticker]

    //   const pctChange =
    //     (100 * (prices[prices.length - 1].close - prices[0].close)) / prices[0].close

    //   return Object.assign(data, { [ticker]: pctChange })
    // }, {})
    // // TODO: Get best performer from this data for each group!

    // const portfolioSplit =

    console.log(
      groupHoldings.map(({ holdings }) => {
        console.log(priceData)

        return priceData[holdings.tickerSymbol]
      })
    )

    return {
      props: {
        leaders: null,
      },
    }
  }
  return await getLeaderBoardProps()
}
