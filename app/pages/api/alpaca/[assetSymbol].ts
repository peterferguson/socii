import { AssetsApi, config } from "@lib/alpaca/"
import { NextApiRequest, NextApiResponse } from "next"
import { withCORS, withAuth } from "@utils/middleware"

const assetClient = new AssetsApi(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  const { assetSymbol, assetId } = req.query as { assetSymbol: string; assetId: string }

  if (assetSymbol)
    res.end(JSON.stringify(await assetClient.assetsSymbolGet(assetSymbol)))

  if (assetId) res.end(JSON.stringify(await assetClient.assetsAssetIdGet(assetId)))

  res.end(JSON.stringify(await assetClient.getAssets()))
}

export default withAuth(withCORS(handler))
