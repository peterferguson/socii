import { createMachine, assign } from "xstate"

const selectGroup = assign({
  group: (_context, event) => event.value,
})

const updateHistoryStack = (thisState) =>
  assign({
    currentStateName: thisState,
    historyStack: (ctx) => ctx.historyStack.concat(ctx.currentStateName),
  })

const reinstatePreviousState = assign({
  historyStack: (ctx) => ctx.historyStack.concat(ctx.currentStateName),
  currentStateName: (ctx) => ctx.historyStack[ctx.historyStack.length - 2],
})

export const investButtonMachine = createMachine(
  {
    id: "investButton",
    initial: "idle",
    context: {
      holding: [1],
      group: "",
      side: "",
      currentStateName: "idle",
      orderType: "",
      historyStack: [],
    },
    states: {
      idle: {
        on: {
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
          agree: [
            {
              target: "#active.hist",
              actions: reinstatePreviousState,
            },
          ],
          disagree: [
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
              CHOOSE_BUY: {
                actions: [assign({ side: "buy" }), updateHistoryStack("chooseGroup")],
                target: "chooseGroup",
              },
              CHOOSE_SELL: {
                actions: [assign({ side: "sell" }), updateHistoryStack("chooseGroup")],
                target: "chooseGroup",
              },
            },
          },
          orderType: {
            on: {
              SELECT_LIMIT_ORDER: {
                target: "limitOrder",
                actions: updateHistoryStack("limitOrder"),
              },
              SELECT_CASH_ORDER: {
                target: "cashOrder",
                actions: updateHistoryStack("cashOrder"),
              },
              SELECT_SHARE_ORDER: {
                target: "shareOrder",
                actions: updateHistoryStack("shareOrder"),
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
      hasHolding: (ctx) => ctx.holding.length > 0,
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
