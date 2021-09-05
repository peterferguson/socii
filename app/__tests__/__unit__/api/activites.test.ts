import { handleActivites } from "@pages/api/alpaca/activities"
import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import { performance } from "perf_hooks"

const activitiesTest = nextApiHandlerTest(handleActivites, "/api/alpaca/activities")
let accountId: string = process.env.ALPACA_FIRM_ACCOUNT

describe.skip("/api/alpaca/activities", () => {
  it(
    "Check if an account has been succesfully CREATED",
    activitiesTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId }),
      })

      console.log(res.json())

      const finishTime = performance.now()
      expect(res.status).toBe(201)

      expect(finishTime - startTime).toBeLessThanOrEqual(1000) // - runs in one second
      console.log(finishTime - startTime)
    })
  )
})
