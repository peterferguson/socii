import { MarketDay } from "@alpaca/models"
import { performance } from "perf_hooks"
import { handleCalendar } from "@api/alpaca/calendar"
import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const calendarTest = nextApiHandlerTest(handleCalendar, "/api/alpaca/calendar")

// ! Calendar endpoint is broken due to a bug in Alpaca API openapi.yaml
// ! I have submitted a PR to fix it, but it's not merged yet.

describe.skip("/api/alpaca/calendar", () => {
  it(
    "gets market calendar",
    calendarTest(async ({ fetch }) => {
      const startTime = performance.now()
      const todayString = new Date().toISOString().slice(0, 10)

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          start: "2021-04-06",
          end: todayString,
        }),
      })
      const finishTime = performance.now()

      const response = await res.json()

      expect(res.status).toBe(200)
      expect(Object.keys(response[0])).toEqual(
        MarketDay.getAttributeTypeMap().map(({ name }) => name)
      )
      expect(MarketDay.from(response[0]) instanceof MarketDay).toBe(true)

      //   expect(response).

      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - runs in one second
      console.log(finishTime - startTime)
    })
  )
})
