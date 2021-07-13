import { AssetsApi, config } from "@alpaca/"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const assetClient = new AssetsApi(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end()

  // TODO: define better types using nominal types (as per the freetrade typescript article)
  const { assetSymbol, assetId } = req.query as { assetSymbol: string; assetId: string }

  if (assetSymbol) {
    console.log(await assetClient.assetsSymbolGet(assetSymbol))

    res.end(JSON.stringify(await assetClient.assetsSymbolGet(assetSymbol)))
  }
  if (assetId) res.end(JSON.stringify(await assetClient.assetsAssetIdGet(assetId)))

  res.end(JSON.stringify(await assetClient.getAssets()))
}
