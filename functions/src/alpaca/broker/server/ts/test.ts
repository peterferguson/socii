/* eslint-disable semi */
/* eslint-disable indent */

/**
 * Run from `socii/functions` directory
 * Using the command `npx ts-node src/alpaca/broker/client/ts/test.ts`
 */

import { AssetsApi, ClockApi } from "./api"

const assetClient = new AssetsApi(
  "CK71HIRTN216RINOSIS1",
  "KwW4aMk5pbnRQXWs3O17OmvBsdxWJk48iG2W8eOF"
)

const clockClient = new ClockApi(
  "CK71HIRTN216RINOSIS1",
  "KwW4aMk5pbnRQXWs3O17OmvBsdxWJk48iG2W8eOF"
)

// assetClient.getAssets().then((r) => console.log(r))
// assetClient.assetsSymbolGet("TSLA").then((r) => console.log(r))
// assetClient.assetsSymbolGet("OPEN").then((r) => console.log(r))

clockClient.clockGet().then(({response: r, body: b}) => {
  console.log(r)
  console.log(b)
})
