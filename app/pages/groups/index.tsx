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
    // const response = await fetch("https://www.styvio.com/api/leaderboard")
    // const data = await response.json()

    const db = require("@lib/firebase/server/firebase-admin").firestore

    const query = db.collectionGroup("holdings")

    const snapshot = await query.get()

    const groupHoldings = snapshot.docs.map((doc) => ({
      groupName: doc.ref.path.split("/")[1],
      holdings: doc.data(),
    }))

    const tickers = [
      ...new Set(groupHoldings.map((group) => group.holdings.tickerSymbol)),
    ]

    const data = Promise.all(
      tickers.map(
        async (ticker) =>
          await (await fetch(`https://www.styvio.com/api/${ticker}`)).json()
      )
    )

    const pctChange = (await data).map(({ ticker, oneMonthPrices }) => ({
      ticker,
      pctChange:
        (100 * (oneMonthPrices[oneMonthPrices.length - 1] - oneMonthPrices[0])) /
        oneMonthPrices[oneMonthPrices.length - 1],
    }))

    console.log(pctChange)

    return {
      props: {
        leaders: null,
      },
    }
  }
  return await getLeaderBoardProps()
}
