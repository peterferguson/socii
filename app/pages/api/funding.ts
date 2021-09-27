import { NextApiRequest, NextApiResponse } from "next"

import fundingQueue from "./queues/funding"

/*
 * Funds alpaca accounts based on the date of creation of a group.
 *
 * If a user has any groups that where created modulo one month of the current date,
 * their alpaca account will be funded with the total of all the groups subscriptions.
 *
 * This api route is called once a day at 7am utc by a cron job from the github action in
 * `.github/workflows/alpaca-fund.yaml`
 *
 * This function is very temporary and will be removed once the real functionality is
 * implemented. For many reasons, some examples:
 *
 * - The cron job in github actions must run ins under 30 seconds
 * - The code doesn't handle batches higher than 500 transactions a day
 *
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "GET":
      try {
        const time = new Date().toISOString()
        await fundingQueue.enqueue(time, {
          id: `funding-${time}`,
          repeat: { every: "1d", times: 1 },
        })
        res.status(200).json({ success: true })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
      break
    default: {
      res.setHeader("Allow", "GET")
      res.status(405).json({ message: `Method ${method} Not Allowed` })
    }
  }
}
