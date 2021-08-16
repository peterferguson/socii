import "jest"
import { StreamChat } from "stream-chat"

import { buy } from "../../src/commands/mml/trades"

const testMessage = {
  message: {
    id: "peterferguson-6af3df47-7e41-4f80-82b9-9ca9112f7a71",
    text: "How much you would like to buy?",
    html: "<p>How much you would like to buy?</p>\n",
    type: "regular",
    attachments: [
      {
        type: "buy",
        actions: [
          {
            name: "action",
            text: "Buy",
            type: "button",
            value: "buy",
          },
          {
            name: "action",
            text: "Cancel",
            type: "button",
            value: "cancel",
          },
        ],
        mml: '<mml type="card"><buy></buy></mml>',
        tickerSymbol: "T",
      },
    ],
    latest_reactions: [],
    own_reactions: [],
    reaction_scores: {},
    reply_count: 0,
    cid: "messaging:Darragh-Ventures-LLC",
    shadowed: false,
    mentioned_users: [],
    silent: false,
    pinned: false,
    pinned_at: null,
    pinned_by: null,
    pin_expires: null,
    args: "  T",
    command_info: {
      name: "buy",
    },
  },
  user: {
    id: "peterferguson",
    role: "user",
    created_at: "2021-05-01T22:36:20.822192Z",
    updated_at: "2021-08-16T13:49:18.96149Z",
    last_active: "2021-08-16T13:44:26.084182Z",
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
