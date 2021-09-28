import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"

const comb = `${process.env.ALPACA_KEY}:${process.env.ALPACA_SECRET}`
const baseUrl = "https://data.sandbox.alpaca.markets/v2"

export async function handleData(req: NextApiRequest, res: NextApiResponse) {
  let { body, method } = req
  body = typeof body === "string" ? JSON.parse(body) : body
  const { type, symbol } = body

  switch (method) {
    case "POST":
      // - Get account by accountId if it is sent
      if (type && symbol) {
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

          res.status(200).json(json)
        } catch (error) {
          res
            .status(error.status || 400)
            .end(`Failed to get account with error: ${error}`)
        }
      }
      break

    default: {
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
export default withAuth(withCORS(handleData))
