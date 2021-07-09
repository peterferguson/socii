import { AssetsApi } from "@lib/alpaca/api"
import { NextApiRequest, NextApiResponse } from "next"
import { cors, withAuth } from "@utils/middleware"

const assetClient = new AssetsApi(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)

export default withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res)

  if (req.method !== "GET") return res.status(405).end()

  const { assetSymbol } = req.query as { assetSymbol: string }

  res.end(JSON.stringify((await assetClient.assetsSymbolGet(assetSymbol)).body))
})
