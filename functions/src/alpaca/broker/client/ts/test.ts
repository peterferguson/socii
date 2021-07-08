/* eslint-disable semi */
/* eslint-disable indent */

import { AssetsApi } from "./api"

const assetClient = new AssetsApi(
  "CK71HIRTN216RINOSIS1",
  "KwW4aMk5pbnRQXWs3O17OmvBsdxWJk48iG2W8eOF"
)

// assetClient.getAssets().then((r) => console.log(r))
assetClient.assetsSymbolGet("TSLA").then((r) => console.log(r))
assetClient.assetsSymbolGet("OPEN").then((r) => console.log(r))
