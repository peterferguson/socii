// ! Events in the [documentation](https://alpaca.markets/docs/broker/api-references/events/)
// ! do not match up to those in the openapi.yaml!
// // handler function for alpaca/apis/EventAPI.js
// import { config, EventsApi } from "@alpaca/index"
// import { withAuth, withCORS } from "@utils/middleware"
// import { NextApiRequest, NextApiResponse } from "next"

// const eventsClient = new EventsApi(config)

// export async function handleOrders(req: NextApiRequest, res: NextApiResponse) {
//   const { body, method } = req

//   switch (method) {
//     case "GET":
//       /* Get subscription to account status events */
//       const accountSub = eventsClient.eventsAccountsStatusGet()

//       break
//     default:
//       res.setHeader("Allow", ["PUT", "POST", "DELETE"])
//       res.status(405).end(`Method ${method} Not Allowed`)
//   }
// }

// export default withAuth(withCORS(handleOrders))
