require("dotenv").config({ path: "./.env.dev" })

global.STREAM_API_KEY = process.env.STREAM_API_KEY
global.STREAM_SECRET = process.env.STREAM_SECRET
