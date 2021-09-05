//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/assets.rest.ts`
require("dotenv").config({ path: "./.env.local" })
import { config } from "@socii/shared/alpaca/index"
import { EventsApiRequestFactory } from "@socii/shared/alpaca/apis/EventsApi"
// import fetch from "isomorphic-unfetch"
import https from "https"

// const since = new Date("2021-04-01")

// // ! This doesn't work as the sse is not encoded in the OAS3 spec
// // const events = new EventsApi(  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
// )
// // events.eventsJournalsStatusGet(since).then((r) => console.log(r))

// const requestFactory = new EventsApiRequestFactory(  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
// )

// const handleEvents = async () => {
//   const requestContext = await requestFactory.eventsJournalsStatusGet(since)
//   https
//     .get(requestContext.getUrl(), { headers: requestContext.getHeaders() }, (res) => {
//       let data = []
//       const headerDate =
//         res.headers && res.headers.date ? res.headers.date : "no response date"
//       console.log("Status Code:", res.statusCode)
//       console.log("Date in Response header:", headerDate)

//       res.on("data", (chunk) => {
//         console.log(chunk)
//         // console.log(Buffer.concat(data).toString())
//         data.push(chunk)
//       })

//       res.on("end", () => {
//         console.log("Response ended: ")
//         console.log(Buffer.concat(data).toString())
//       })
//     })
//     .on("error", (err) => {
//       console.log("Error: ", err.message)
//     })
// }

// handleEvents()
