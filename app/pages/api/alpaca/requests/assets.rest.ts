//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/assets.rest.ts`
require("dotenv").config({ path: "./.env.local" })
import fetch from "isomorphic-unfetch"
import { mockUserToken } from "@tests/utils/mockUserToken"

const baseUrl = "http://localhost:3000/api/alpaca"

const getAssets = async ({ symbol, id }: { symbol?: string; id?: string }) => {
  const assetsUrl = `${baseUrl}/assets`
  const method = symbol || id ? "POST" : "GET"
  const body = symbol || id ? JSON.stringify({ symbol, id }) : null
  const idToken = await mockUserToken()

  return await fetch(assetsUrl, {
    method,
    body,
    headers: { authorization: `Bearer ${idToken}`, contentType: "application/json" },
  })
}

// - Get all Alpaca assets
// getAssets({})
//   .then((assets) => assets.json())
//   .then((r) => console.log(r))

// - Get the asset for Tesla by symbol
// - ticker symbol -> TSLA
// getAssets({ symbol: "TSLA" })
//   .then((assets) => assets.json())
//   .then((r) => console.log(r))

// - Get the asset for Allstate by id
// - alpaca id -> 9a5b42b3-46ae-40f7-9a79-253d476cced8
getAssets({ id: "9a5b42b3-46ae-40f7-9a79-253d476cced8" })
  .then((assets) => assets.json())
  .then((r) => console.log(r))
