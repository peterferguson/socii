import { config, AssetsApi, AssetResource } from "@socii/shared/alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const assetClient = new AssetsApi(
  config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
)
interface AssetsQueryParams {
  symbol: string
  id: string
}

export async function handleAssets(
  req: NextApiRequest,
  res: NextApiResponse<AssetResource | AssetResource[]>
) {
  let { body, method, query } = req
  let { symbol, id } = {} as AssetsQueryParams

  try {
    body = body && typeof body === "string" ? JSON.parse(body) : body
    symbol = body?.symbol || query?.symbol
    id = body?.id || query?.id
  } catch (err) {
    console.log({ err })
  }

  switch (method) {
    case "POST": {
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
