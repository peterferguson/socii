import { config, AssetsApi } from "@alpaca/index"
import { withAuth, withCORS } from "@utils/middleware"
import { NextApiRequest, NextApiResponse } from "next"

const assetClient = new AssetsApi(config)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req

  switch (method) {
    case "POST": {
      const { symbol, id } = JSON.parse(body) as {
        symbol: string
        id: string
      }
      try {
        /* query assets either by id or symbol */
        console.log(symbol)
        console.log(id)

        if (symbol) {
          console.log("symbol")
          console.log(symbol)
          return res
            .status(200)
            .end(JSON.stringify(await assetClient.assetsSymbolGet(symbol)))
        }
        if (id) {
          console.log("id")
          console.log(id)
          return res
            .status(200)
            .end(JSON.stringify(await assetClient.assetsAssetIdGet(id)))
        }
        break
      } catch (error) {
        return res
          .status(400)
          .end(`Failed to retrieve asset ${symbol ?? id ?? ""}  with error: ${error}`)
      }
    }
    case "GET":
      try {
        /* Get all assets */
        return res.status(200).end(JSON.stringify(await assetClient.getAssets()))
      } catch (error) {
        return res.status(400).end(`Failed to create account with error: ${error}`)
      }
    default:
      return res.status(405).end()
  }
}

export default withAuth(withCORS(handler))
