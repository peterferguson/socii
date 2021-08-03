import { config, AssetsApi, AssetResource } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const assetClient = new AssetsApi(config)

export async function handleAssets(
  req: NextApiRequest,
  res: NextApiResponse<AssetResource | AssetResource[]>
) {
  let { body, method } = req
  body = typeof body === "string" ? JSON.parse(body) : body

  switch (method) {
    case "POST": {
      const { symbol, id } = (typeof body === "string" ? JSON.parse(body) : body) as {
        symbol: string
        id: string
      }

      try {
        /* query assets either by id or symbol */
        const assetResult = symbol
          ? await assetClient.assetsSymbolGet(symbol)
          : id
          ? await assetClient.assetsAssetIdGet(id)
          : null

        if (assetResult !== null) res.status(200).json(assetResult)
        else res.status(422).end("If using 'POST' please provide `symbol` or `id`")
      } catch (error) {
        res
          .status(400)
          .end(`Failed to retrieve asset ${symbol ?? id ?? ""}  with error: ${error}`)
      }
      break
    }
    case "GET":
      try {
        /* Get all assets */
        const assets = await assetClient.getAssets()
        res.status(200).json(assets)
      } catch (error) {
        res.status(400).end(`Failed to create account with error: ${error}`)
      }
      break
    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withAuth(withCORS(handleAssets))
