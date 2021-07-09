import { AccountCreationObject, AccountsApi } from "@lib/alpaca/api"
import { NextApiRequest, NextApiResponse } from "next"
import { cors } from "@utils/middleware"

const accountClient = new AccountsApi(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  const { body, method } = req
  if (method !== "GET") return res.status(405).end()

  const account = AccountCreationObject.from(body)
  res.end(JSON.stringify((await accountClient.accountsPost(account)).body))
}
