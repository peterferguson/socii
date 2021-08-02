import { IncomingMessage } from "http"
import https from "https"

export const sseGetRequest = async (
  url: string,
  responseCallback: (res: IncomingMessage) => void
) =>
  https
    .get(
      url,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.ALPACA_KEY + ":" + process.env.ALPACA_SECRET
          ).toString("base64")}`,
          "content-type": "text/event-stream",
        },
      },
      responseCallback
    )
    .on("error", (err) => {
      console.log("HTTP Request Error: ", err.message)
    })

export interface BaseServer {
  url: string
  variableConfiguration: object
}
