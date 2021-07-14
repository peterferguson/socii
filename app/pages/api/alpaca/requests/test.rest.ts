//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/test.rest.ts`
require("dotenv").config({ path: "./.env.local" })
import { auth as clientAuth } from "../../../../lib/firebase"
import { auth as serverAuth } from "../../../../lib/firebase-admin"
import fetch from "isomorphic-unfetch"

const sociiUid = "LkYfEBGDGTZqvZavPVZnoss2V4M2"

const baseUrl = "http://localhost:3000/api/alpaca"

const mockUserToken = async () => {
  try {
    const customToken = await serverAuth.createCustomToken(sociiUid, {
      isAdmin: true,
    })

    const { user } = await clientAuth.signInWithCustomToken(customToken)
    return await user.getIdToken()
  } catch (err) {
    console.log(err)
    return
  }
}

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
