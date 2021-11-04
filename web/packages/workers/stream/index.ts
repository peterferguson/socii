import { handleCommands } from "./src/handlers/commands"

addEventListener("fetch", (event) => {
  event.respondWith(handleCommands(event.request))
})
