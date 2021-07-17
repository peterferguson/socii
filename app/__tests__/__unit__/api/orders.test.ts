import { OrderObject } from "@alpaca/models"
import { handleOrders } from "@pages/api/alpaca/orders"
import { nextApiHandlerTest } from "@tests/utils/nextApiHandlerTest"
import { performance } from "perf_hooks"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const ordersTest = nextApiHandlerTest(handleOrders, "/api/alpaca/orders")
let orderId = null

describe("/api/alpaca/orders", () => {
  it.todo(
    "creates an order"
    //   ordersTest(async ({ fetch }) => {
    //     const startTime = performance.now()
    //     const res = await fetch({
    //       method: "POST",
    //       headers: { "content-type": "application/json" },
    //       body: JSON.stringify({
    //         // TODO: Test different order types
    //         accountId: process.env.ALPACA_TEST_ACCOUNT,
    //         symbol: "TSLA",
    //         qty: "2.5",
    //         side: "buy",
    //         type: "market",
    //         time_in_force: "day",
    //         commission: "0",
    //       }),
    //     })
    //     const finishTime = performance.now()

    //     const orderResponse = await res.json()
    //     orderId = orderResponse.id

    //     expect(res.status).toBe(200)
    //     expect(orderResponse).toMatchObject<OrderObject>({
    //       assetId: "8ccae427-5dd0-45b3-b5fe-7ba5e422c766",
    //       symbol: "TSLA",
    //     })
    //     expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
    //   })
  )
  it.todo(
    "verifies the order exists, querying it by `orderId`"
    //   ordersTest(async ({ fetch }) => {
    //     const startTime = performance.now()
    //     const res = await fetch({
    //       method: "POST",
    //       headers: { "content-type": "application/json" },
    //       body: JSON.stringify({ accountId: process.env.ALPACA_TEST_ACCOUNT, orderId }),
    //     })
    //     const finishTime = performance.now()

    //     const responseBody: OrderObject[] = await res.json()

    //     expect(res.status).toBe(200)
    //     expect(responseBody).toBeInstanceOf(Array)
    //     expect(
    //       responseBody
    //         .map((order: object) => OrderObject.from(order))
    //         .every((order) => order instanceof OrderObject)
    //     ).toBe(true)
    //     expect(responseBody.filter(({ id }) => id === orderId)).toBe(0)

    //     expect(
    //       responseBody.filter(({ id }) => id === orderId)[0]
    //     ).toMatchObject<OrderObject>({
    //       assetId: "8ccae427-5dd0-45b3-b5fe-7ba5e422c766",
    //       symbol: "TSLA",
    //     })
    //     expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
    //   })
  )
  // TODO: Add tests to update the order and check that it was updated
  it.todo(
    "deletes the order"
    //   ordersTest(async ({ fetch }) => {
    //     const startTime = performance.now()
    //     const res = await fetch({
    //       method: "DELETE",
    //       headers: { "content-type": "application/json" },
    //       body: JSON.stringify({
    //         accountId: process.env.ALPACA_TEST_ACCOUNT,
    //         orderId,
    //       }),
    //     })
    //     const finishTime = performance.now()

    //     expect(res.status).toBe(204)
    //     expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
    //   })
  )
  it.todo(
    "verifies the order was deleted by querying all orders on the account"
    //   ordersTest(async ({ fetch }) => {
    //     const res = await fetch({
    //       method: "POST",
    //       headers: { "content-type": "application/json" },
    //     })

    //     const responseBody: OrderObject[] = await res.json()

    //     expect(res.status).toBe(200)
    //     expect(responseBody).toBeInstanceOf(Array)
    //     expect(
    //       responseBody
    //         .map((order: object) => OrderObject.from(order))
    //         .every((order) => order instanceof OrderObject)
    //     ).toBe(true)
    //     expect(responseBody.filter(({ id }) => id === orderId)).toBe(0)
    //   })
  )
})
