import dynamic from "next/dynamic"

const modals = {
  ["active.shareInformation"]: {
    component: dynamic(() => import("./StockSharingModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.chooseGroup"]: {
    component: dynamic(() => import("./SelectGroupModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.investAction"]: {
    component: dynamic(() => import("./SelectInvestActionModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.orderType"]: {
    component: dynamic(() => import("./SelectOrderTypeModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  returnToLastScreen: {
    component: dynamic(() => import("./returnToLastScreenModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.limitOrder"]: {
    component: dynamic(() => import("./OrderModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.shareOrder"]: {
    component: dynamic(() => import("./OrderModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
  ["active.cashOrder"]: {
    component: dynamic(() => import("./OrderModal"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }),
  },
}

export const InvestButtonModal = ({ ticker, state, send }) => {
  const modalStateName = Object.keys(modals).filter(
    (modal) =>
      JSON.stringify(state.value)
        .replace(/[^a-zA-Z:]+/gi, "")
        .replace(":", ".") === modal
  )?.[0]

  const Modal = modalStateName ? modals[modalStateName]?.component : null
  return Modal ? <Modal ticker={ticker} state={state} send={send} /> : null
}
