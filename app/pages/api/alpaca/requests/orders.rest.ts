//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/orders.rest.ts`
require("dotenv").config({ path: "./.env.local" })
import { config, TradingApi, CreateOrder, PatchOrder } from "../../../../alpaca/index"
const client = new TradingApi(config)

const createThenDeleteOrder = async () => {
  const order = await client.postOrders(
    process.env.ALPACA_FIRM_ACCOUNT,
    CreateOrder.from({
      symbol: "TSLA",
      qty: "2.5",
      side: "buy",
      type: "market",
      time_in_force: "day",
      commission: "0",
    })
  )
  console.log(`created order with id ${order.id}`)

  await client.deleteOrder(process.env.ALPACA_FIRM_ACCOUNT, order.id)
  console.log(`deleted order with id ${order.id}`)
}

// createThenDeleteOrder()

const deleteOrder = async (id) =>
  await client.deleteOrder(process.env.ALPACA_FIRM_ACCOUNT, id)

// deleteOrder("a46443b2-85c7-4530-86bf-ff46f7c8e380")

const deleteAllOrders = async () => {
  const orders = await client.deleteOrders(process.env.ALPACA_FIRM_ACCOUNT)
  console.log(`deleted order with id ${orders.map((order) => order.id)}`)
}

deleteAllOrders()

const queryAllOrders = async () => {
  const orders = await client.getOrders(process.env.ALPACA_FIRM_ACCOUNT)
  console.log(orders)
}

// queryAllOrders()

const queryOrder = async (id) => {
  const order = await client.getOrder(process.env.ALPACA_FIRM_ACCOUNT, id)
  console.log(order)
}

// queryOrder("7355611c-27a3-4609-9017-c5eee4e32aec")

const createThenPatchOrder = async () => {
  const order = await client.postOrders(
    process.env.ALPACA_FIRM_ACCOUNT,
    CreateOrder.from({
      symbol: "TSLA",
      qty: "2.5",
      side: "buy",
      type: "market",
      time_in_force: "day",
      commission: "0",
    })
  )
  console.log(`created order with id ${order.id}`)

  await client.patchOrder(
    process.env.ALPACA_FIRM_ACCOUNT,
    order.id,
    PatchOrder.from({ qty: "3" })
  )
  console.log(`patched order with id ${order.id}`)
}

createThenPatchOrder()
