const functions = require("firebase-functions")
import { logger } from "firebase-functions"
import { config } from "../shared/alpaca/index.js"
import { getLatestEventId, storeEvents } from "../firestore"
import { IncomingMessage } from "http"
import { BaseServer, sseGetRequest } from "../utils/sseGetRequest"
import { Request, Response } from "express"

const alpacaEventEndpoints = {
  accounts: "accounts/status",
  journals: "journals/status",
  trades: "trades",
  transfers: "transfers/status",
  nonTradingActivity: "nta",
}

export async function handleEvents(req: Request, res: Response) {
  const {
    headers: { authorization },
    body,
    method,
  } = req
  let { type, since, until, since_id, until_id } = body

  logger.debug(`Received ${method} request for ${type}`)
  logger.log(`Authorization: ${authorization}`)
  logger.log(`Body: ${JSON.stringify(body)}`)

  logger.log(`Config: ${JSON.stringify(functions.config())}`)

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  if (authorization !== `Bearer ${functions.config().alpaca.key}`) {
    res.status(401).end("The request is not authorized")
    return
  }

  if (!(since || until || since_id || until_id)) {
    since_id = await getLatestEventId(type)
  }

  const queryParams = { since, until, since_id, until_id }

  const query = Object.keys(queryParams)
    .filter(key => queryParams[key] !== undefined)
    .map(key => `${key}=${queryParams[key]}`)
    .toString()

  const baseServer: BaseServer = {
    url: "",
    variableConfiguration: undefined,
    ...config(functions.config().alpaca.key, functions.config().alpaca.secret)
      .baseServer,
  }

  if (type in alpacaEventEndpoints) {
    try {
      console.log(`${baseServer.url}/events/${alpacaEventEndpoints[type]}?${query}`)

      await sseGetRequest(
        `${baseServer.url}/events/${alpacaEventEndpoints[type]}?${query}`,
        responseCallback(res, type, since_id)
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

export const responseCallback =
  (res: Response, type: string, since_id: number) => (response: IncomingMessage) => {
    let data = []
    const headerDate =
      response.headers && response.headers.date
        ? response.headers.date
        : "no response date"

    console.log("Headers:", response.headers)
    console.log("Status Code:", response.statusCode)
    console.log("Date in Response header:", headerDate)

    response.on("data", chunk => {
      if (chunk.toString().indexOf("index,nofollow") == -1) {
        console.log(Buffer.from(chunk).toString())
        data.push(chunk)
      }
    })

    response.on("end", async () => {
      response.destroy()
      await storeEvents(type, Buffer.concat(data).toString(), since_id)
      res
        .status(200)
        .end(
          `Response from ${type} endpoint has ended: ${Buffer.concat(data).toString()}`
        )
    })

    setTimeout(() => {
      response.emit("end")
      console.log("timing out")
    }, 5000)
  }
