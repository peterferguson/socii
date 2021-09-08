import { buy, sell } from "../utils/trades"
import Router from "../../router"

export async function handleCommands(request: Request): Promise<Response> {
  const requestHeaders = JSON.stringify([...request.headers])
  console.log("Request Headers", requestHeaders)
  const { method, body } = request
  const r = new Router()

  // * show a nice error if you send a GET request
  if (method !== "POST")
    return new Response(`Method ${method} Not Allowed`, { status: 405 })

  console.log(`Recieved ${method} request}`)
  console.log(`Body: ${JSON.stringify(body)}`)

  r.post("/buy", buy)
  r.post("/sell", sell)

  let response = await r.route(request)

  if (!response) {
    response = new Response("No corresponding worker found", { status: 404 })
  }

  return response
}
