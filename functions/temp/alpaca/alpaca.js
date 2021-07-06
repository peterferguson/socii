/* eslint-disable semi */
/* eslint-disable object-curly-spacing */

require("dotenv").config({ path: "./temp/.env" })
const bent = require("bent")

const authHeader = Buffer.from(
  `${process.env.ALPACA_KEY}:${process.env.ALPACA_SECRET}`
).toString("base64")

const getJSON = bent("json")

const baseURL = "https://broker-api.sandbox.alpaca.markets/"

const getAssets = async () => {
  try {
    return await getJSON(`${baseURL}/v1/assets`, { Authorization: `Basic ${authHeader}` })
  } catch (err) {
    console.log(err)
  }
}

// console.log(getAssets())

