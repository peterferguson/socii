import { createMachine, assign } from "xstate"

// - helper functions
const lastActiveState = (ctx) => {
  const filteredStack = dirtyActiveStates(ctx).filter(
    (state) => state !== ctx.currentStateName
  )
  return filteredStack[filteredStack.length - 1]
}

const dirtyActiveStates = (ctx) => {
  return ctx.historyStack.filter(
    (k) => !["inactive", "idle", "returnToLastScreen"].includes(k)
  )
}

const wasOnState = (ctx, stateName) => lastActiveState(ctx) === stateName

const initialContext = {
  hasHolding: false,
  wantsToShare: false,
  group: "",
  side: "",
  orderType: "",
  // - The following context is used to keep track of the state history
  currentStateName: "idle",
  historyStack: [],
}

// - updates to state context
const selectShare = assign({ wantsToShare: true })
const selectGroup = assign({ group: (_ctx, e) => e.groupName })
const resetChoices = assign({ group: "", side: "", orderType: "" })
const updateHolding = assign({ hasHolding: (_ctx, e) => !!e.holding })
const setOrderType = (order) => assign({ orderType: order })
const updateHistoryStack = (thisState) =>
  assign({
    currentStateName: thisState,
    historyStack: (ctx) => ctx.historyStack.concat(ctx.currentStateName),
  })
const reinstatePreviousState = assign({
  historyStack: (ctx) => ctx.historyStack.concat(ctx.currentStateName),
  currentStateName: (ctx) => lastActiveState(ctx),
})

// TODO: Remove the returnToLastPage Question if they only got one page in!

export const stockInvestButtonMachine = createMachine(
  {
    id: "investButton",
    initial: "idle",
    context: initialContext,
    on: {
      RESET: {
        target: ".idle",
        actions: assign((context) => initialContext),
      },
    },
    states: {
      idle: {
        on: {
          UPDATE_HOLDING: { actions: updateHolding },
          CLICK: [
            {
              target: "active.investAction",
              cond: "hasHolding",
              actions: updateHistoryStack("investAction"),
            },
            {
              target: "active.chooseGroup",
              actions: updateHistoryStack("chooseGroup"),
            },
          ],
        },
      },
      inactive: {
        id: "inactive",
        on: {
          CLICK: [
            {
              target: "#active.hist",
              actions: reinstatePreviousState,
              cond: "onlyEnteredFirstPage",
            },
            {
              target: "returnToLastScreen",
              actions: updateHistoryStack("returnToLastScreen"),
            },
          ],
        },
      },
      returnToLastScreen: {
        on: {
          CLOSE: { target: "#inactive", actions: updateHistoryStack("inactive") },
          AGREE: [
            {
              target: "#active.hist",
              actions: reinstatePreviousState,
            },
          ],
          DISAGREE: [
            {
              target: "active.investAction",
              cond: "hasHolding",
              actions: [updateHistoryStack("investAction"), resetChoices],
            },
            {
              target: "active.chooseGroup",
              actions: [updateHistoryStack("chooseGroup"), resetChoices],
            },
          ],
        },
      },
      active: {
        id: "active",
        on: {
          CLOSE: {
            target: "#inactive",
            actions: updateHistoryStack("inactive"),
          },
        },
        states: {
          hist: { type: "history" },
          chooseGroup: {
            on: {
              SELECT_GROUP: [
                {
                  target: "shareInformation",
                  cond: "wantsToShare",
                  actions: [updateHistoryStack("shareInformation"), selectGroup],
                },
                {
                  target: "orderType",
                  cond: "previouslyOnInvestAction",
                  actions: [updateHistoryStack("orderType"), selectGroup],
                },
                {
                  target: "investAction",
                  actions: [updateHistoryStack("investAction"), selectGroup],
                },
              ],
            },
          },
          investAction: {
            on: {
              CHOOSE_SHARE: [
                {
                  target: "chooseGroup",
                  cond: "previouslyIdleOrInactive",
                  actions: [updateHistoryStack("chooseGroup"), selectShare],
                },
                {
                  target: "shareInformation",
                  actions: [updateHistoryStack("shareInformation"), selectShare],
                },
              ],
              CHOOSE_BUY: [
                {
                  target: "orderType",
                  actions: [assign({ side: "buy" }), updateHistoryStack("orderType")],
                  cond: "previouslyChooseGroup",
                },
                {
                  target: "chooseGroup",
                  actions: [assign({ side: "buy" }), updateHistoryStack("chooseGroup")],
                },
              ],
              CHOOSE_SELL: [
                {
                  target: "orderType",
                  actions: [assign({ side: "sell" }), updateHistoryStack("orderType")],
                  cond: "previouslyChooseGroup",
                },
                {
                  target: "chooseGroup",
                  actions: [
                    assign({ side: "sell" }),
                    updateHistoryStack("chooseGroup"),
                  ],
                },
              ],
            },
          },
          orderType: {
            on: {
              SELECT_LIMIT_ORDER: {
                target: "limitOrder",
                actions: [updateHistoryStack("limitOrder"), setOrderType("limit")],
              },
              SELECT_CASH_ORDER: {
                target: "cashOrder",
                actions: [updateHistoryStack("cashOrder"), setOrderType("cash")],
              },
              SELECT_SHARE_ORDER: {
                target: "shareOrder",
                actions: [updateHistoryStack("shareOrder"), setOrderType("shares")],
              },
            },
          },
          limitOrder: {
            type: "final",
          },
          shareOrder: {
            type: "final",
          },
          cashOrder: {
            type: "final",
          },
          shareInformation: {
            type: "final",
          },
        },
      },
    },
  },
  {
    guards: {
      onlyEnteredFirstPage: (ctx) => new Set(dirtyActiveStates(ctx)).size === 1,
      previouslyChooseGroup: (ctx) => !!ctx.group,
      hasHolding: (ctx) => ctx.hasHolding,
      wantsToShare: (ctx) => wasOnState(ctx, "investAction") && ctx.wantsToShare,
      previouslyOnInvestAction: (ctx) => wasOnState(ctx, "investAction") && ctx.side,
      previouslyIdleOrInactive: (ctx) => {
        return ["idle", "inactive", "returnToLastScreen"].includes(
          ctx.historyStack[ctx.historyStack.length - 1]
        )
      },
    },
  }
)
