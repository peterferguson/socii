import { performance } from "perf_hooks"
import { handleJournal } from "@api/alpaca/journal"
import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"

const journalTest = nextApiHandlerTest(handleJournal, "/api/alpaca/journal")

describe("/api/alpaca/journal", () => {
  it.todo(
    ""
    // journalTest(async ({ fetch }) => {
    //   const startTime = performance.now()
    //   const startDate = new Date()

    //   const res = await fetch({
    //     method: "GET",
    //     headers: { "content-type": "application/json" },
    //   })
    //   const finishTime = performance.now()

    //   const response = await res.json()

    //   expect(res.status).toBe(200)
    //   expect(finishTime - startTime).toBeLessThanOrEqual(750)
    // })
  )
})
