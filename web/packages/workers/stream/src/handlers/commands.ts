import { trade } from "../utils/trades"
import Router from "../../router"

export async function handleCommands(request: Request): Promise<Response> {
  const requestHeaders = JSON.stringify([...request.headers])
  console.log("Request Headers", requestHeaders)
  const { method } = request
  // * show a nice error if you send a GET request
  if (method !== "POST")
    return new Response(`Method ${method} Not Allowed`, { status: 405 })

  console.log(`Recieved ${method} request}`)

  const r = new Router()

  console.log(`Request: ${JSON.stringify(request)}`)

  const url = new URL(request.url)
  const type = url.searchParams.get("type")

  console.log("Command:", type)

  type === "buy"
    ? r.post("/commands", trade("buy"))
    : r.post("/commands", trade("sell"))

  let response = await r.route(request)

  if (!response) {
    response = new Response("No corresponding worker found", { status: 404 })
  }

  console.log(`Response: ${JSON.stringify(response)}`)

  return response
}
