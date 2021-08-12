// GET http://localhost:3000/api/alpaca/calendar?start=2016-01-01&end=2021-07-16
//  ! Run with `npx ts-node -O '{"module":"commonjs"}' pages/api/alpaca/requests/calendar.rest.ts`
require("dotenv").config({ path: "./.env.local" })
// import fetch from "isomorphic-unfetch"
// import { mockUserToken } from "@tests/utils/mockUserToken"

// const baseUrl = "http://localhost:3000/api/alpaca"

// const getCalendar = async ({ start, end }: { start?: string; end?: string }) => {
//   const calendarUrl = `${baseUrl}/calendar`
//   const method = "GET"
//   const body = JSON.stringify({ start, end })
//   const idToken = await mockUserToken()

//   return await fetch(calendarUrl, {
//     method,
//     body,
//     headers: { authorization: `Bearer ${idToken}`, contentType: "application/json" },
//   })
// }

// - Get calendar
// getCalendar({ start: "2016-01-01", end: "2021-07-16" })
//   .then((res) => res.json())
//   .then((r) => console.log(r))

import { config, CalendarApi } from "../../../alpaca/index"
const cal = new CalendarApi(config(process.env.ALPACA_KEY, process.env.ALPACA_SECRET))

cal.calendarGet("2016-01-01", "2021-07-16").then((r) => console.log(r))

// ! Calendar endpoint is broken due to a bug in Alpaca API openapi.yaml
// - The response should be a CalendarResponse array not a single CalendarResponse
// - Also the CalendarResponse should have the properties "session_open" & "session_close"
