import { createMachine, assign } from "xstate"

const selectGroup = assign({ group: (_ctx, e) => e.groupName })
const updateHolding = assign({ hasHolding: (_ctx, e) => !!e.holding })
const setOrderType = (order) => assign({ orderType: order })

const updateHistoryStack = (thisState) =>
  assign({
    currentStateName: thisState,
    historyStack: (ctx) => ctx.historyStack.concat(ctx.currentStateName),
  })

const reinstatePreviousState = assign({
  historyStack: (ctx) => ctx.historyStack.concat(ctx.currentStateName),
  currentStateName: (ctx) => ctx.historyStack[ctx.historyStack.length - 2],
})

// TODO: Remove the returnToLastPage Question if they only got one page in!

export const stockInvestButtonMachine = createMachine(
  {
    id: "investButton",
    initial: "idle",
    context: {
      hasHolding: false,
      group: "",
      side: "",
      orderType: "",
      // - The following context is used to keep track of the state history
      currentStateName: "idle",
      historyStack: [],
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
          CLICK: {
            target: "returnToLastScreen",
            actions: updateHistoryStack("returnToLastScreen"),
          },
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
              actions: updateHistoryStack("investAction"),
            },
            {
              target: "active.chooseGroup",
              actions: updateHistoryStack("chooseGroup"),
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
            exit: selectGroup,
            on: {
              SELECT_GROUP: [
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
                  actions: updateHistoryStack("chooseGroup"),
                },
                {
                  target: "shareInformation",
                  actions: updateHistoryStack("shareInformation"),
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
      previouslyChooseGroup: (ctx) => !!ctx.group,
      hasHolding: (ctx) => ctx.hasHolding,
      previouslyOnInvestAction: (ctx) => {
        const filteredStack = ctx.historyStack
          .filter((state) => state !== ctx.currentStateName)
          .filter((state) => state !== "inactive")
          .filter((state) => state !== "returnToLastScreen")
        return filteredStack[filteredStack.length - 1] === "investAction"
      },
      previouslyIdleOrInactive: (ctx) => {
        return ["idle", "inactive", "returnToLastScreen"].includes(
          ctx.historyStack[ctx.historyStack.length - 1]
        )
      },
    },
  }
)
