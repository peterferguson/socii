const StreamChat = require("stream-chat").StreamChat
const { Client } = require("iexjs")

export function singleLineTemplateString(strings, ...values) {
  let output = ""
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i]
  }
  output += strings[values.length]

  // Split on newlines.
  let lines = output.split(/(?:\r\n|\n|\r)/)

  // Rip out the leading whitespace.
  return lines
    .map((line) => {
      return line.replace(/^\s+/gm, "")
    })
    .join(" ")
    .trim()
}

export const streamClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
)

export const iexClient = new Client({ version: process.env.IEX_API_VERSION })

export const currencySymbols = {
  AUD: "$",
  CAD: "$",
  CHF: "CHF",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  USD: "$",
}
