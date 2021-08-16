import "jest"
import { StreamChat } from "stream-chat"

import { buy } from "../../src/commands/mml/trades"

const testMessage = {
  message: {
    id: "peterferguson-ce32bdef-715a-47ec-933b-6828dcdd4bbe",
    text: "/buy  T",
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
    cid: "messaging:JPT",
    created_at: "0001-01-01T00:00:00Z",
    updated_at: "0001-01-01T00:00:00Z",
    shadowed: false,
    mentioned_users: [],
    silent: false,
    pinned: false,
    pinned_at: null,
    pinned_by: null,
    pin_expires: null,
    args: " T",
    command_info: { name: "buy" },
    user_id: "peterferguson",
  },
  user: {
    id: "peterferguson",
    role: "user",
    created_at: "2021-05-01T22:36:20.822192Z",
    updated_at: "2021-08-16T15:22:50.057861Z",
    last_active: "2021-08-16T15:38:46.000779758Z",
    banned: false,
    online: true,
    name: "Peter Ferguson",
  },
}

describe("commands/trades", () => {
  it("should update the message", async () => {
    const newMessage = await buy(
      new StreamChat(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET),
      testMessage
    )

    console.log(newMessage)
  })
})
