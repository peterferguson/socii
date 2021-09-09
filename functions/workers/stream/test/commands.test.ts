import { handleCommands } from "../src/handlers/commands"
import makeServiceWorkerEnv from "service-worker-mock"

declare var global: any

const mockBuyMessage = {
  message: {
    id: "peter-8d98afcc-e924-4141-bf2d-28daa1c78a33",
    text: "/buy   O",
    command: "buy",
    html: "",
    type: "regular",
    user: null,
    attachments: [],
    latest_reactions: [],
    own_reactions: [],
    reaction_counts: null,
    reaction_scores: null,
    reply_count: 0,
    cid: "group:Founders",
    created_at: "0001-01-01T00:00:00Z",
    updated_at: "0001-01-01T00:00:00Z",
    shadowed: false,
    mentioned_users: [],
    silent: false,
    pinned: false,
    pinned_at: null,
    pinned_by: null,
    pin_expires: null,
    command_info: { name: "buy" },
    args: "  O",
    user_id: "peter",
  },
  user: {
    id: "peter",
    role: "user",
    created_at: "2021-08-22T14:11:18.989331Z",
    updated_at: "2021-09-07T22:08:52.362782Z",
    last_active: "2021-09-08T13:37:47.872672877Z",
    banned: false,
    online: true,
    name: "Peter Ferguson",
  },
}

describe("handle", () => {
  beforeEach(() => {  
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test("handle GET", async () => {
    const result = await handleCommands(new Request("/buy", { method: "GET" }))
    expect(result.status).toEqual(405)
    const text = await result.text()
    expect(text).toEqual("Method GET Not Allowed")
  })
  test("handle POST /buy", async () => {
    const result = await handleCommands(
      new Request("/commands?type=buy", { method: "POST", body: JSON.stringify(mockBuyMessage) }),
    )
    expect(result.status).toEqual(200)
    const text = await result.text()
    expect(text).toEqual("request method: POST")
  })
})
