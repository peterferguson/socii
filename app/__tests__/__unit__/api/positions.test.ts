import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import { handlePositions } from "@api/alpaca/positions"
import { performance } from "perf_hooks"
import { Position } from "@alpaca/index"

const positionsTest = nextApiHandlerTest(handlePositions, "/api/alpaca/positions")

describe.skip("/api/alpaca/positions", () => {
  it(
    "gets all open positions for an account",
    positionsTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId: process.env.ALPACA_FIRM_ACCOUNT }),
      })
      const finishTime = performance.now()

      const positionsResponse = await res.json()

      expect(res.status).toBe(200)
      expect(positionsResponse).toBeInstanceOf(Array)
      if (positionsResponse.length === 0) {
        expect(1).toBe(1)
      } else {
        expect(
          positionsResponse.every((position) =>
            ["symbol", "qty", "exchange"].every((key) => key in position)
          )
        ).toBe(true)
      }
      expect(finishTime - startTime).toBeLessThan(1000)
    })
  )
})
