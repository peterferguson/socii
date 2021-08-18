// ! To run use: `npx ts-node -O '{"module":"commonjs"}' stream/setup/commands.ts`
import * as Stream from "stream-chat"
import * as dotenv from "dotenv"

dotenv.config({ path: "./.env.local" })
// dotenv.config({ path: "./.env.prod" })

const client = new Stream.StreamChat(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)

const createGroupChannelType = async () => {
  console.log("Creating group channel type...")
  await client.createChannelType({
    name: "group",
    mutes: false,
  })
  console.log("Done!")
}

const createTradeCommands = async () => {
  const tradeCommands = [
    {
      name: "sell",
      description: "Create sell execution order",
      args: "[tickerSymbol]",
      set: "invest_commands_set",
    },
    {
      name: "buy",
      description: "Create buy execution order",
      args: "[tickerSymbol]",
      set: "invest_commands_set",
    },
  ]

  console.log("Creating trade commands...")

  for (const command of tradeCommands) {
    await client.createCommand(command)
    console.log(`Created command ${command.name}`)
    console.log("Getting 'group' channel type commands")
    const groupCommands = (await client.getChannelType("group")).commands.map(
      (d) => d.name
    )
    await client.updateChannelType("group", {
      commands: [...groupCommands, command.name],
    })
    console.log(`Added command ${command.name} to 'group' channel type`)
  }
  console.log("Done!")
}

// createGroupChannelType()
// createTradeCommands()
// client.getChannelType("group").then((r) => console.log(r))

// - delete old messaging group chats -> group channel type

// const JPT = client.getChannelById("messaging", "JPT", {})
// JPT.delete().then(() => console.log("Deleted JPT"))
// const DV = client.getChannelById("messaging", "Darragh-Ventures-LLC", {})
// DV.delete().then(() => console.log("Deleted Darragh-Ventures-LLC"))

// client
//   .channel("group", "Founders", {
//     members: ["peterferguson", "jamesmcc"],
//     created_by: { id: "peterferguson" },
//   })
//   .create()
//   .then((r) => console.log(r))

// const sociians = client.getChannelById("team", "sociians", {})
// sociians
//   .updatePartial({
//     set: { image: "/favicons/favicon-196x196.png" },
//     // unset: ["data"],
//   })
//   .then((r) => console.log(r))
