import { testApiHandler } from "next-test-api-route-handler"
import { handleOrders } from "@pages/api/alpaca/orders"
import { OrderObject } from "@alpaca/models"

/*
 - Aspects of each API endpoint to test 
  1. Status code
  2. Correct payload yields correct response
  3. Correct response headers
  4. Performance check (responsed in a reasonable time)
*/

const nextApiHandlerTest = (handler, url) => (test) => async () => {
  await testApiHandler({
    handler,
    url,
    test: async ({ fetch }) => await test({ fetch }),
  })
}

const ordersTest = nextApiHandlerTest(handleOrders, "/api/alpaca/orders")

describe("/api/alpaca/orders", () => {
  it.todo(
    "creates an order",
    // ordersTest(async ({ fetch }) => {
    //   const startTime = performance.now()
    //   const res = await fetch({
    //     method: "POST",
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify({
    //       account_id: "933ab506-9e30-3001-8230-50dc4e12861c",
    //       symbol: "AAPL",
    //       qty: "2.5",
    //       side: "buy",
    //       type: "market",
    //       time_in_force: "day",
    //       commission: "0",
    //     }),
    //   })
    //   const finishTime = performance.now()

    //   expect(res.status).toBe(200)
    //   expect(await res.json()).toMatchObject<OrderObject>({
    //     id: "8ccae427-5dd0-45b3-b5fe-7ba5e422c766",
    //     symbol: "TSLA",
    //   })
    //   expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
    // })
  )

  it.todo(
    "deletes an order",
    // ordersTest(async (fetch) => {
    //   const startTime = performance.now()
    //   const res = await fetch({
    //     method: "DELETE",
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify({
    //       account_id: "933ab506-9e30-3001-8230-50dc4e12861c",
    //       order_id: "",
    //     }),
    //   })
    //   const finishTime = performance.now()

    //   expect(res.status).toBe(204)
    //   // expect(await res.json()).toMatchObject<OrderObject>({
    //   //   id: "8ccae427-5dd0-45b3-b5fe-7ba5e422c766",
    //   //   symbol: "TSLA",
    //   // })
    //   expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
    //   expect(queryOrderId).toBe(false)
    // })
  )

  // it.todo(
  //   "Orders query returns single order (OrderObject) with order_id passed",
  //   orderTest(async (fetch) => {
  //     const startTime = performance.now()
  //     const res = await fetch({
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ symbol: "TSLA" }),
  //     })
  //     const finishTime = performance.now()

  //     expect(res.status).toBe(200)
  //     expect(await res.json()).toMatchObject<OrderObject>({
  //       id: "8ccae427-5dd0-45b3-b5fe-7ba5e422c766",
  //       symbol: "TSLA",
  //     })
  //     expect(finishTime - startTime).toBeLessThanOrEqual(500) // - units: ms
  //   })
  // )
  // it.todo(
  //   "Orders query returns orders (OrderObject[]) when no order_id passed",
  //   orderTest(async (fetch) => {
  //     const res = await fetch({
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //     })

  //     const responseBody = await res.json()

  //     expect(res.status).toBe(200)
  //     expect(responseBody).toBeInstanceOf(Array)
  //     expect(
  //       responseBody
  //         .map((order: object) => OrderObject.from(order))
  //         .every((order) => order instanceof OrderObject)
  //     ).toBe(true)
  //   })
  // )
})
