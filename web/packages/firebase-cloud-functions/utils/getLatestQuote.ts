import fetch from "node-fetch"

enum AlpacaExchanges {
  "A" = "NYSE American (AMEX)",
  "B" = "NASDAQ OMX BX",
  "C" = "National Stock Exchange",
  "D" = "FINRA ADF",
  "E" = "Market Independent",
  "H" = "MIAX",
  "I" = "International Securities Exchange",
  "J" = "Cboe EDGA",
  "K" = "Cboe EDGX",
  "L" = "Long Term Stock Exchange",
  "M" = "Chicago Stock Exchange",
  "N" = "New York Stock Exchange",
  "P" = "NYSE Arca",
  "Q" = "NASDAQ OMX",
  "S" = "NASDAQ Small Cap",
  "T" = "NASDAQ Int",
  "U" = "Members Exchange",
  "V" = "IEX",
  "W" = "CBOE",
  "X" = "NASDAQ OMX PSX",
  "Y" = "Cboe BYX",
  "Z" = "Cboe BZX",
}

enum AlpacaQuoteConditions {
  "A" = "Slow Quote Offer Side",
  "B" = "Slow Quote Bid Side",
  "E" = "Slow Quote LRP Bid Side",
  "F" = "Slow Quote LRP Offer Side",
  "H" = "Slow Quote Bid And Offer Side",
  "O" = "Opening Quote",
  "R" = "Regular Market Maker Open",
  "W" = "Slow Quote Set Slow List",
  "C" = "Closing Quote",
  "L" = "Market Maker Quotes Closed",
  "U" = "Slow Quote LRP Bid And Offer",
  "N" = "Non Firm Quote",
  "FOUR" = "On Demand Intra Day Auction",
}

const alpacaQuoteConditionsMapping = {
  A: "A",
  B: "B",
  E: "E",
  F: "F",
  H: "H",
  O: "O",
  R: "R",
  W: "W",
  C: "C",
  L: "L",
  U: "U",
  N: "N",
  4: "FOUR",
}

interface AlpacaQuote {
  symbol: string
  quote: {
    t: string // - Timestamp in RFC-3339 format with nanosecond precision
    ax: keyof AlpacaExchanges // - Exchange where the ask was made
    ap: number // - Ask price
    as: number // - Ask size
    bx: keyof AlpacaExchanges // - Exchange where the bid was made
    bp: number // - Bid price
    bs: number // - Bid size
    c: (keyof AlpacaQuoteConditions)[] // - Trade conditions
    z: string // - Tape
  }
}

const comb = `${process.env.ALPACA_KEY}:${process.env.ALPACA_SECRET}`
const baseUrl = "https://data.sandbox.alpaca.markets/v2"

export const getLatestQuote = async (symbol: string): Promise<AlpacaQuote> => {
  try {
    const data = await fetch(`${baseUrl}/stocks/${symbol}/quotes/latest`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + Buffer.from(comb).toString("base64"),
      },
    })

    if (!data.ok) {
      const err = new Error(data.statusText)
      err["status"] = data.status
      throw err
    }

    const json = await data.json()
    json.quote.c = json.quote.c.map((c) => alpacaQuoteConditionsMapping[c])
    return json as AlpacaQuote
  } catch (err) {
    console.log(err)
  }
}
