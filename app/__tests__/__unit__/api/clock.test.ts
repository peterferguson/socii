import { ClockResponse } from "@alpaca/models"
import { performance } from "perf_hooks"
import { handleClock } from "@api/alpaca/clock"
import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const clockTest = nextApiHandlerTest(handleClock, "/api/alpaca/clock")

describe.skip("/api/alpaca/clock", () => {
  it(
    "gets the market time",
    clockTest(async ({ fetch }) => {
      const startTime = performance.now()
      const startDate = new Date()

      const res = await fetch({
        method: "GET",
        headers: { "content-type": "application/json" },
      })
      const finishTime = performance.now()

      const response = await res.json()

      expect(res.status).toBe(200)
      expect(Object.keys(response)).toEqual(
        ClockResponse.getAttributeTypeMap().map(({ name }) => name)
      )
      expect(ClockResponse.from(response) instanceof ClockResponse).toBe(true)
      expect(new Date(response.timestamp).getTime()).toBeLessThanOrEqual(
        startDate.getTime() + 750
      )
      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - runs in one second
      console.log(finishTime - startTime)
    })
  )
})
