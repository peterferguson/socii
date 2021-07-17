import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import { handleAssets } from "@pages/api/alpaca/assets"
import { AssetResource } from "@alpaca/models"
import { performance } from "perf_hooks"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const assetsTest = nextApiHandlerTest(handleAssets, "/api/alpaca/assets")

describe("/api/alpaca/assets", () => {
  it(
    "queries an asset by symbol, specifically TSLA",
    assetsTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ symbol: "TSLA" }),
      })
      const finishTime = performance.now()

      expect(res.status).toBe(200)
      expect(await res.json()).toMatchObject<AssetResource>({
        id: "8ccae427-5dd0-45b3-b5fe-7ba5e422c766",
        symbol: "TSLA",
        name: expect.stringContaining("Tesla"),
      })
      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - runs in one second
      console.log(finishTime - startTime)
    })
  )

  it(
    "queries an asset by id, specifically Allstate",
    assetsTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: "9a5b42b3-46ae-40f7-9a79-253d476cced8" }),
      })
      const finishTime = performance.now()

      expect(res.status).toBe(200)
      expect(await res.json()).toMatchObject<AssetResource>({
        id: "9a5b42b3-46ae-40f7-9a79-253d476cced8",
        symbol: expect.stringContaining("ALL"),
        name: expect.stringContaining("Allstate"),
      })
      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - runs in one second
      console.log(finishTime - startTime)
    })
  )

  it(
    "returns a list of AssetResources",
    assetsTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "GET",
        headers: { "content-type": "application/json" },
      })
      const finishTime = performance.now()

      console.log(finishTime - startTime)
      expect(res.status).toBe(200)
      const response = await res.json()
      // expect(response).toMatchSnapshot() // ! Changes too often
      expect(response).toBeInstanceOf(Array)
      expect(Object.keys(response[0])).toEqual(
        AssetResource.getAttributeTypeMap().map(({ name }) => name)
      )
      expect(AssetResource.from(response[0]) instanceof AssetResource).toBe(true)
      // expect(
      //   response
      //     .map((asset) => AssetResource.from(asset))
      //     .every((asset) => asset instanceof AssetResource)
      // ).toBe(true)
      expect(finishTime - startTime).toBeLessThanOrEqual(1500) // - runs in 1.5 seconds
    })
  )
})
