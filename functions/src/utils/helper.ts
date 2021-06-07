const StreamChat = require("stream-chat").StreamChat
const bent = require("bent")
const logger = require("firebase-functions").logger

export const iexStockPrice = async (tickerSymbol) => {
  const getJSON = bent("json")
  const baseUrl = `https://cloud.iexapis.com/${process.env.IEX_API_VERSION}/stock/${tickerSymbol}/quote/latestPrice?token=${process.env.IEX_API_KEY}`
  logger.log(baseUrl)
  return await getJSON(baseUrl)
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
