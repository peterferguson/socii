import { config, AssetsApi } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const assetClient = new AssetsApi(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  // TODO: define better types using nominal types (as per the freetrade typescript article)
  // FIXME: This code is 💩
  const { assetSymbol, assetId } = req.query as { assetSymbol: string; assetId: string }

  if (assetSymbol)
    return res.end(JSON.stringify(await assetClient.assetsSymbolGet(assetSymbol)))

  if (assetId)
    return res.end(JSON.stringify(await assetClient.assetsAssetIdGet(assetId)))

  return res.end(JSON.stringify(await assetClient.getAssets()))
}
