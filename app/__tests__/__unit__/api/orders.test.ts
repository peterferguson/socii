import { ClockApi, config } from "@socii/shared/alpaca/index"
import { OrderObject } from "@socii/shared/alpaca/models"
import { handleOrders } from "@api/alpaca/orders"
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
let orderId: string = ""
let orderPatched: boolean = false
let accountId: string = process.env.ALPACA_FIRM_ACCOUNT
let order = {
  symbol: "TSLA",
  qty: "2.5",
  side: "buy",
  type: "market",
  time_in_force: "day",
  commission: "0",
}

// TODO: Test different order types
// -  Check if market is open and if so convert order to limit order
beforeAll(async () => {
  const isMarketOpen = (
    await new ClockApi(
      config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET)
    ).clockGet()
  ).isOpen
  if (isMarketOpen) {
    order.type = "limit"
    order.qty = "1" // Limit order cannot be fractional
    order["limitPrice"] = "100000" // - should stop order exection when market is open
  }
})

describe.skip("/api/alpaca/orders", () => {
  it(
    "creates an order",
    ordersTest(async ({ fetch }) => {
      const startTime = performance.now()
      const res = await fetch({
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, ...order }),
      })
      const finishTime = performance.now()

      const orderResponse: OrderObject = OrderObject.from(await res.json())
      orderId = orderResponse.id

      expect(res.status).toBe(200)
      expect(orderResponse).toMatchObject({
        symbol: order.symbol,
        qty: order.qty,
        type: order.type,
      })
      expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
    })
  )

  it(
    "verifies the order exists, querying it by `orderId`",
    ordersTest(async ({ fetch }) => {
      if (!orderId) throw new Error("orderId not found")

      const startTime = performance.now()

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, orderId }),
      })
      const finishTime = performance.now()
      const responseBody: OrderObject = OrderObject.from(await res.json())

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Object)
      expect(responseBody).toMatchObject({
        symbol: order.symbol,
        qty: order.qty,
        type: order.type,
      })
      expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
    })
  )

  // ! This test fails since the order is not yet sent to the exchange
  // it(
  //   "patches the existing order",
  //   ordersTest(async ({ fetch }) => {
  //     if (!orderId) throw new Error("orderId not found")

  //     const startTime = performance.now()
  //     const res = await fetch({
  //       method: "PATCH",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ accountId, orderId, qty: "1" }),
  //     })
  //     const finishTime = performance.now()

  //     if (res.status === 422) {
  //       expect(1).toBe(1)
  //     } else {
  //       const responseBody: OrderObject = OrderObject.from(await res.json())
  //       orderPatched = true
  //       expect(res.status).toBe(200)
  //       expect(responseBody).toBeInstanceOf(Object)
  //       expect(responseBody).toMatchObject({
  //         symbol: order.symbol,
  //         qty: order.qty,
  //         type: order.type,
  //       })
  //     }
  //     expect(finishTime - startTime).toBeLessThanOrEqual(750) // - units: ms
  //   })
  // )

  // ! Relys on the order being sent to the exchange
  // it(
  //   "verifies the order was patched by querying all orders",
  //   ordersTest(async ({ fetch }) => {
  //     if (!orderId) throw new Error("orderId not found")
  //     //TODO: Add isMarketOpen condition
  //     const startTime = performance.now()

  //     const res = await fetch({
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ accountId }),
  //     })
  //     const finishTime = performance.now()
  //     const responseBody = await res.json()

  //     expect(res.status).toBe(200)
  //     expect(responseBody).toBeInstanceOf(Array)
  //     const filteredArray: Object[] = responseBody.filter((o) => o.id === orderId)
  //     expect(filteredArray).toHaveLength(1)
  //     if (orderPatched) {
  //       expect(OrderObject.from(filteredArray.pop())).toMatchObject<OrderObject>({
  //         symbol: "TSLA",
  //         qty: "1",
  //         side: "buy",
  //         type: "market",
  //         commission: "0",
  //       })
  //     }
  //     expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
  //   })
  // )

  it(
    "deletes the order",
    ordersTest(async ({ fetch }) => {
      if (!orderId) throw new Error("orderId not found")

      const startTime = performance.now()
      const res = await fetch({
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId, orderId }),
      })
      const finishTime = performance.now()

      expect(res.status).toBe(204)
      expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
    })
  )

  it(
    "verifies the order was deleted by querying all orders on the account",
    ordersTest(async ({ fetch }) => {
      if (!orderId) throw new Error("orderId not found")

      const res = await fetch({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ accountId }),
      })

      const responseBody: Object[] = await res.json()

      expect(res.status).toBe(200)
      expect(responseBody).toBeInstanceOf(Array)
      const orderArray = responseBody.map((order: object) => OrderObject.from(order))
      expect(orderArray.every((order) => order instanceof OrderObject)).toBe(true)
      expect(orderArray.filter(({ id }) => id === orderId).length).toBe(0)
    })
  )
})
