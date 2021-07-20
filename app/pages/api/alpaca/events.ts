// ! Events in the [documentation](https://alpaca.markets/docs/broker/api-references/events/)
// ! do not match up to those in the openapi.yaml!
import { EventsApiRequestFactory } from "@alpaca/apis/EventsApi"
import { config } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import https, { IncomingMessage } from "http"
import { NextApiRequest, NextApiResponse } from "next"

const eventsRequestFactory = new EventsApiRequestFactory(config)

// ! The naive approach doesn't work since the sse is not encoded in the OAS3 spec
// const events = new EventsApi(config)
// events.eventsJournalsStatusGet(since).then((r) => console.log(r))

// ! This wil expose all the events from alpaca to the client!
// ! We need to filter out the events that don't apply to that user!
// ! Or implement some cheap server to store these events in firestore!

export default withCORS(handleEvents)

export async function handleEvents(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { type, since, until, sinceId, untilId },
    method,
  } = req

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  const queryParams = { since, until, sinceId, untilId }

  const query = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined)
    .map((key) => `${key}=${queryParams[key]}`)
    .toString()

  const baseServer: BaseServer = {
    url: "",
    variableConfiguration: undefined,
    ...config.baseServer,
  }

  const alpacaEventEndpoints = {
    accounts: "accounts/status",
    journals: "journels/status",
    trades: "trades",
    transfers: "transfers/status",
    "non-trading-activity": "nta",
  }
  console.log(`${baseServer.url}/${alpacaEventEndpoints[type]}?${query}`)

  if (type in alpacaEventEndpoints) {
    try {
      await sseGetRequest(
        `${baseServer.url}/${alpacaEventEndpoints[type]}?${query}`,
        httpResponseCallback(res, type)
      )
    } catch (e) {
      console.log(e)
    }
  } else {
    res.status(422).end(`Please provide one of the following types:
       - "accounts"
       - "journals"
       - "trades"
       - "transfers"
       - "non-trading-activity"
      as \`type\` in the request body.`)
  }
}

const sseGetRequest = async (
  url: string,
  responseCallback: (res: IncomingMessage) => void
) => {
  const headers = {
    Authorization: `Basic ${Buffer.from(
      process.env.ALPACA_KEY + ":" + process.env.ALPACA_SECRET
    ).toString("base64")}`,
    "content-type": "text/event-stream",
  }
  https.get(url, { headers }, responseCallback).on("error", (err) => {
    console.log("HTTP Request Error: ", err.message)
  })
}

interface BaseServer {
  url: string
  variableConfiguration: object
}

const httpResponseCallback = (res: NextApiResponse, endpoint: string) => (response) => {
  let data = []
  const headerDate =
    response.headers && response.headers.date
      ? response.headers.date
      : "no response date"
  console.log("Status Code:", response.statusCode)
  console.log("Date in Response header:", headerDate)

  response.on("data", (chunk) => {
    res.send(chunk)
    data.push(chunk)
  })

  response.on("end", () => {
    response.destroy()
    console.log(Buffer.concat(data).toString())
    res.end(
      `Response from ${endpoint} endpoint has ended: ${Buffer.concat(data).toString()}`
    )
  })
}
