import { AssetsApi, config } from "@lib/alpaca/"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const assetClient = new AssetsApi(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  const { assetSymbol, assetId } = req.query as { assetSymbol: string; assetId: string }

  if (assetSymbol)
    res.end(JSON.stringify(await assetClient.assetsSymbolGet(assetSymbol)))

  if (assetId) res.end(JSON.stringify(await assetClient.assetsAssetIdGet(assetId)))

  res.end(JSON.stringify(await assetClient.getAssets()))
}
