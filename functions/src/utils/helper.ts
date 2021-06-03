const StreamChat = require("stream-chat").StreamChat

export const iexStockPrice = async (tickerSymbol) => {
  const base_url = `https://cloud.iexapis.com/${process.env.IEX_API_VERSION}/stock/${tickerSymbol}/quote/latestPrice`
  return await (await fetch(base_url)).json()
}

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

export const StreamChatClient = () =>
  new StreamChat(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET)
