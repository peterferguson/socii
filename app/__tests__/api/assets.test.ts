import { testApiHandler } from "next-test-api-route-handler"
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

describe("/api/alpaca/assets", () => {
  test("symbol query returns an AssetResource, specifically for TSLA", async () => {
    const startTime = performance.now()
    await testApiHandler({
      handler: handleAssets,
      url: "/api/alpaca/assets",
      test: async ({ fetch }) => {
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
      },
    })
  })

  test("id query returns an AssetResource, specifically for Allstate", async () => {
    await testApiHandler({
      handler: handleAssets,
      url: "/api/alpaca/assets",
      test: async ({ fetch }) => {
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
      },
    })
  })

  test("returns a list of AssetResources", async () => {
    await testApiHandler({
      handler: handleAssets,
      url: "/api/alpaca/assets",
      test: async ({ fetch }) => {
        const startTime = performance.now()
        const res = await fetch({
          method: "GET",
          headers: { "content-type": "application/json" },
        })
        const finishTime = performance.now()

        expect(res.status).toBe(200)
        console.log(finishTime - startTime)
        const responseBody = await res.json()
        // expect(responseBody).toMatchSnapshot() // ! Changes too often
        expect(responseBody).toBeInstanceOf(Array)
        expect(
          responseBody
            .map((asset) => AssetResource.from(asset))
            .every((asset) => asset instanceof AssetResource)
        ).toBe(true)
        expect(finishTime - startTime).toBeLessThanOrEqual(1500) // - runs in three seconds
      },
    })
  })
})
