import { createMachine, assign } from "xstate"

type ToggleEvent = { type: "TOGGLE" }

// - For now this machine just covers the transitions of the layout
export const toggleChannelListMachine = createMachine<ToggleEvent>({
  id: "chatToggle",
  initial: "idle",
  states: {
    idle: { on: { TOGGLE: "open" } },
    closed: { on: { TOGGLE: "open" } },
    open: { on: { TOGGLE: "closed" } },
  },
})

// - Mobile
// 1 - Initial State: show channel list
// 2 - On TOGGLE: transition sidebar out of view, revealing the channel chat


// - Desktop
// 1 - Initial State: show channel list as a sidebar
// 2 - On TOGGLE: transition the channel chat over sidebar (i.e. channel list transition out)