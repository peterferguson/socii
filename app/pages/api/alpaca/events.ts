// ! Events in the [documentation](https://alpaca.markets/docs/broker/api-references/events/)
// ! do not match up to those in the openapi.yaml!
import { EventsApiRequestFactory } from "@alpaca/apis/EventsApi"
import { config } from "@alpaca/index"
import { withCORS } from "@utils/middleware"
import { BaseServer, httpResponseCallback, sseGetRequest } from "@utils/sseGetRequest"
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
